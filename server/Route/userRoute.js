const { register, login, getUsers, getUser, updateUser, deleteUser } = require('./../Controller/userController');
const { forgotPassword } = require('./../Controller/authController');
const { createContact, getContacts } = require('./../Controller/contactController');
const { createBroadcast, getBroadcast } = require('./../Controller/broadcastController');
const router = require('express').Router();

router.route('/register')
    .post(register);

router.route('/login')
    .post(login);

router.route('/contact-us')
    .post(createContact)
    .get(getContacts);

router.route('/forgotPassword')
    .post(forgotPassword);

router.route('/')
    .get(getUsers);

router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

router.route('/admin/broadcast')
    .post(createBroadcast)
    .get(getBroadcast);

module.exports = router;
