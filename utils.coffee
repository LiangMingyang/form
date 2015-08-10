strftime = require('strftime')
exports.save = (req, res)->
  form = global.db.models.form
  global.db.Promise.resolve()
  .then ->
    #console.log req.body
    req.body.jzdate = null if req.body.jzdate.length == 0
    req.body.sydate = null if req.body.sydate.length == 0
    req.body.bgdate = null if req.body.bgdate.length == 0
    data = {
      number: req.body.id
      company: req.body.company
      jzDate: req.body.jzdate
      syDate: req.body.sydate
      bgDate: req.body.bgdate
      data: JSON.stringify(req.body)
    }
    form.create(data);
  .then ->
    res.render('index',message:'保存成功')
  .catch (err)->
    res.render('index',message:err.message)

exports.show = (req, res)->
  global.db.Promise.resolve()
  .then ->
    form = global.db.models.form
    form.findAll()
  .then (rows)->
    for ele in rows
      ele.sydate = strftime("%F", new Date(ele.syDate)) if ele.syDate
      ele.bgdate = strftime("%F", new Date(ele.bgDate)) if ele.bgDate
      ele.jzdate = strftime("%F", new Date(ele.jzDate)) if ele.jzDate
    res.render('showAll',report:rows)
  .catch (err)->
    console.log err
    res.render('index',message:err.message)

exports.view = (req, res)->
  global.db.models.form.find(
    where:
      number: req.query.number
  )
  .then (data)->
    #console.log data
    throw new Error('没找着这个表') if not data
    res.render('view', {
      content : JSON.parse(data.data)
      number : data.number
      company : data.company
      sydate : strftime("%F", new Date(data.sydate))
      bgdate : strftime("%F", new Date(data.bgdate))
      jzdate : strftime("%F", new Date(data.jzdate))
    })
  .catch (err)->
    res.render('index',message:err.message);

exports.edit = (req, res)->
  console.log req.body.id
  global.db.models.form.find(
    where:
      number: req.body.id
  )
  .then (ori)->
    throw new Error('没找着这个表') if not ori

    req.body.jzdate = null if req.body.jzdate.length == 0
    req.body.sydate = null if req.body.sydate.length == 0
    req.body.bgdate = null if req.body.bgdate.length == 0
    data = {
      number: req.body.id
      company: req.body.company
      jzDate: req.body.jzdate
      syDate: req.body.sydate
      bgDate: req.body.bgdate
      data: JSON.stringify(req.body)
    }
    for key of data
      ori[key] = data[key]
    ori.save()
  .then ->
    res.render('index',message:'编辑成功')
  .catch (err)->
    res.render('index',message:err.message)