const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const generateOTP = require('otp-generator');

const AppError = require('./../Utils/appError');
const User = require('./../Model/userModel');
const catchAsync = require('./../Utils/catchAsync');
const sendEmail = require('./../Utils/sendEmail');
const sendOTPEmail = require('./../Utils/sendEmail');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createAndSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwtCookie', token, cookieOptions);

    //REMOVE PASSWORD FROM OUTPUT
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //CHECK IF EMAIL AND PASSWORD EXISTS
    if (!email || !password) {
        return next(new AppError("Please enter valid email and password!", 400));
    }

    //CHECK IF EMAIL EXISTS AND PASSWORD IS CORRECT
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Please enter correct email or password", 401));
    }

    //IF EVERYTHING IS OK, SEND TOKEN TO THE CLIENT
    createAndSendToken(user, 200, res);
});

exports.protect = async (req, res, next) => {
    //GETTING TOKEN AND CECKING IF IT IS AVAILABLE
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new AppError("You are not logged in! Please get logged in to get access!", 401));
    }

    //VERIFICATION TOKEN
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //CHECK IF USER STILL EXISTS
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError("The user belonging to this token no longer exists!", 401));
    }

    //CHECK IF USER CHANGED THE PASSWORD AFTER THE TOKEN WAS ISSUED
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError("Password is changed recently! Please log in again!", 401));
    }

    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.roles)) {
            return next(new AppError("You do not have permission to perform this action!", 403));
        }
        next();
    };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    //CHECK IF THE USERS EXISTS IN THE DATABASE
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError("User does not exists with this email!", 404));
    }

    //IF EMAIL EXISTS, GENERATE AND SEND THE OTP
    const { email } = req.body;
    const generateOTP = () => {
        return otpgenerator.generate(5, { digits: false, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    }
    const otp = generateOTP();

    sendOTPEmail(email, otp);

    res.json({ message: 'OTP sent successfully!' });
});

