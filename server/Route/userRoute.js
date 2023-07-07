const { register, login, getUsers, getUser, updateUser, deleteUser, forgotPassword, verifyPass, changePassword } = require('./../Controller/userController');
const { createContact, getContacts } = require('./../Controller/contactController');
const { createBroadcast, getBroadcasts, updateBroadcast, deleteBroadcast, getBroadcast } = require('./../Controller/broadcastController');
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

router.route('/profile/:id').get(getUser);

router.route('/changepassword/:id').get(verifyPass);
router.route('/changepassword/:id').patch(changePassword);

router.route('/admin/broadcast')
    .post(createBroadcast)
    .get(getBroadcasts)
    .patch(updateBroadcast)
    .delete(deleteBroadcast);

router.route('/admin/broadcast/:id').get(getBroadcast);


module.exports = router;
