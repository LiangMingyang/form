var express = require('express');
var router = express.Router();
var dbhelper = require('../dbhelper/dbhelper.js');
var url = require('url');
var strftime = require('strftime');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', dbhelper.saveReport);

router.get('/search', function(req,res) {
    res.render('search');
});

router.get('/showAll', dbhelper.showAll);

//router.get('/showAll', function(req,res) {
//    res.render('showAll');
//});

router.get('/view', function(req,res) {
    var query = url.parse(req.url,true).query;
    console.log(query);
    dbhelper.select('report',query, function (err, rows) {
        if(err) {
            res.render('error', {message:err.message});
            return ;
        }
        if(rows.length == 0) {
            res.render('error', {message:"编号错误"});
            return ;
        }
        if(rows.length > 1) {
            res.render('error', {message:"数据库中的订单编号有重复"});
            return;
        }
        rows[0].jzdate = strftime("%F", new Date(rows[0].jzdate));
        rows[0].sydate = strftime("%F", new Date(rows[0].sydate));
        rows[0].bgdate = strftime("%F", new Date(rows[0].bgdate));
        res.render('view', rows[0]);
    });
});

router.post('/edit', dbhelper.edit);

module.exports = router;
