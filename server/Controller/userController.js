const User = require('./../Model/userModel');
const axios = require('axios');
const SECRET_KEY = process.env.SCRRETKEY;
const AppError = require('./../Utils/appError');

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

        // if (!checkUser.enabled) {
        //     return res.status(401).json({
        //       status: 'fail',
        //       message: 'Account is disabled. Please contact the administrator.',
        //     });
        // }
        
        res.status(200).json({
            status: 'success'
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