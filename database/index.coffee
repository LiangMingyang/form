Sequelize = require('sequelize')
path = require('path')
models = require('./models')

module.exports = (database, username, password, config)->
  sequelize = new Sequelize(database, username, password, config)

  #models

  form = sequelize.import path.join(__dirname, 'models/form')

  #associations


  return sequelize