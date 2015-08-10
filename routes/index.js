var express = require('express');
var router = express.Router();
var utils = require('../utils');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/', utils.save);

router.get('/search', function(req,res) {
    res.render('search');
});

router.get('/showAll', utils.show);

router.get('/view', utils.view);

router.post('/edit', utils.edit);

module.exports = router;
