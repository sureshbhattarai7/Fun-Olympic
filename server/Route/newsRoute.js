const express = require('express');
const router = express.Router();
const newsController = require('../Controller/newsController');

router.route('/').post(newsController.createNews).get(newsController.getNews);
router.route('/:id').get(newsController.singleNews);

module.exports = router;

