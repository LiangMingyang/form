var express = require('express');
var router = express.Router();
var dbhelper = require('../dbhelper/dbhelper.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', dbhelper.saveReport);

router.get('/search', function(req,res) {
    res.render('search');
});

router.get('/showAll', function(req,res) {
    res.render('showAll');
});
module.exports = router;
