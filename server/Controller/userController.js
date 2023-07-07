const User = require('./../Model/userModel');
const axios = require('axios');
const SECRET_KEY = process.env.SCRRETKEY;
const randomString = require('randomstring');
const nodemailer = require('nodemailer');


exports.register = (req, res) => {
    const {firstName, lastName, username, email, password, passwordConfirm, captcha } = req.body;

    try {
        axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${captcha}`)
            .then(async ({ data }) => {
                if (data.success === true) {
                    const register = await User.create({firstName, lastName, username, email, password, passwordConfirm});
                    res.status(200).json({
                        status: 'success',
                        data: {
                            register
                        }
                    });
                }
                else {
                    res.status(400).json({ message: 'Captcha verification Failed' });
                }
        })

        
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please enter valid creadentials!'
            });
        };
        const checkUser = await User.findOne({ email });
        
        if (!checkUser || !(await checkUser.correctPass(password, checkUser.password))) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid credentials!'
            })
        };

        res.status(200).json({
            status: 'success',
            data: checkUser
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
};

exports.getUsers = async (req, res) => {
    const users = await User.find();
    try {
        res.status(200).json({
            status: 'success',
            data: {
                users
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    try {
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
};

exports.updateUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true 
    })
    try {
        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id, { active: false });
    try {
        res.status(200).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    const checkUser = await User.findOne({ email });

    if (!checkUser) res.status(400).json({ status: 'failed', message: "User Email is incorrect" });
    else {

        if (checkUser.approved === 0) res.status(400).json({ status: "failed", message: "This email is not verified yet. Please verified it first by mail." })

        else {
            const randomText = randomString.generate();
            const passToken = await User.updateOne({ email: email }, { $set: { token: randomText } });
            sendResetPassmail(checkUser.finalPasswordname, checkUser.email, randomText);
            res.status(200).json({
                status: 'success',
                message: 'Please check your mail'
            })
        }

    }
}

const sendResetPassmail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS
            }
        });

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Reset Password',
            html: '<p>Hi, ' + name + '. Please click to <a href="http://127.0.0.1:5173/changepass/' + token + '">Reset </a> your password</p>'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent', info.response);
            }
        })
    } catch (error) {
        console.log(error);
    }

}

exports.verifyPass = async (req, res, next) => {
    try {
        const token = req.query.token;
        console.log('The token is', token);
        const tokenData = await User.findOne({ token });
        req.userID = tokenData._id;


        if (!tokenData) res.status(400).json({ status: 'failed', message: "Invalid pass token" });

        console.log(req.userID);
        console.log('This is', req.userID);



    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error
        })
    }
    next();
}

exports.changePassword = async (req, res) => {
    try {
        console.log(req.params.id);
        const { password } = req.body;
        const encryptedPass = await bcrypt.hash(password, 12);

        const finalPassword = await User.findOne({ token: req.params.id });
        console.log(finalPassword.email, finalPassword._id);

        const lastPass = await User.findByIdAndUpdate(finalPassword._id, { password: encryptedPass, token: "" }, { new: true, runValidators: true })

        res.status(200).json({ status: 'success', data: lastPass });

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.approvedUser = async (req, res, next) => {
    console.log(req.params.id);
    const userId = req.params.id;
    const findUser = await User.findById(userId);
    let changevalue;
    if (findUser.approved === 1) changevalue = 0;
    else changevalue = 1;

    const handleapprove = await User.findByIdAndUpdate(userId, { approved: changevalue }, { new: true, runValidators: true });
    next();

    res.status(200).json({
        status: "success",
    })
}
