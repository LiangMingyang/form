/**
 * Created by 明阳 on 2015/3/8.
 */

//var strftime = require("strftime");
var connect = global.connect;
var trim = require('trim');



var select = function (table, condition, callback, columns) { // SELECT语句的封装，便于重用
    condition = jsonToAnd(condition);
    if (trim(condition) != '') { // 如果condition的属性为空，则转换成的字符串应该是'  '
        condition = ' WHERE ' + condition;
    }
    if (columns) {
        connect.query('SELECT ?? FROM ?? ' + condition, [columns, table], callback);
    }
    else {
        connect.query('SELECT * FROM ?? ' + condition, [table], callback);
    }
};

var find = function (table, condition, res, columns) { // 用于绝大多数find函数，便于重用
    select(table, condition, function (err, rows) {
        if (err) {
            res.json({
                msg: 1,
                info: err.message
            });
            return;
        }
        res.json({
            msg: 0,
            content: rows
        });
    }, columns);
};

var find_range = function (table, condition, start, size, res, columns) { // 用于绝大多数带limit的find函数，便于重用
    condition = jsonToAnd(condition);
    if (trim(condition) != '') { // 如果condition的属性为空，则转换成的字符串应该是'  '
        condition = ' WHERE ' + condition;
    }
    connect.query('SELECT COUNT(1) AS count FROM ?? ' + condition, [table], function (err, rows) {
        if (err) {
            res.json({
                msg: 1,
                info: err.message
            });
            return;
        }
        var count = rows[0].count;
        if (columns) {
            connect.query('SELECT ?? FROM ?? ' + condition + ' LIMIT ?,?',
                [columns, table, parseInt(start), parseInt(size)], function (err, rows) {
                    if (err) {
                        res.json({
                            msg: 1,
                            info: err.message
                        });
                        return;
                    }
                    res.json({
                        msg: 0,
                        content: rows,
                        total: count
                    });
                });
        }
        else {
            connect.query('SELECT * FROM ?? ' + condition + ' LIMIT ?,?', [table, parseInt(start), parseInt(size)],
                function (err, rows) {
                    if (err) {
                        res.json({
                            msg: 1,
                            info: err.message
                        });
                        return;
                    }
                    res.json({
                        msg: 0,
                        content: rows,
                        total: count
                    });
                });
        }
    });
};


exports.saveReport = function (req, res) {
    var table = 'report';
    var data = {};
    data.company = req.body.company;
    delete req.body.company;
    data.id = req.body.id;
    delete req.body.id;
    data.jzdate = req.body.jzdate;
    delete req.body.jzdate;
    data.sydate = req.body.sydate;
    delete req.body.sydate;
    data.bgdate = req.body.bgdate;
    delete req.body.bgdate;
    data.data = JSON.stringify(req.body);
    connect.query('INSERT INTO ?? SET ?', [table, data], function (err) {
        if (err) {
            res.json({
                msg: 1,
                info: err.message
            });
            return;
        }
        res.render('index',{title:"保存成功"});
    });
};