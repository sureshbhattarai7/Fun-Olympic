const { register, login, getUsers, getUser, updateUser, deleteUser } = require('./../Controller/userController');
const { forgotPassword } = require('./../Controller/authController');
const { contact } = require('./../Controller/contactController');
const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/contact-us', contact);
router.post('/forgotpassword', forgotPassword);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
