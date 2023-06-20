const { register, login } = require('./../Controller/userController');
const { contact } = require('./../Controller/contactController');
const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/contact-us', contact);
module.exports = router;