config = require('./config')

db = require('./database')(
  config.database.name,
  config.database.username,
  config.database.password,
  config.database.config
)
.sync {force: true}
.then (db)->
  console.log 'Sync successfully!'
.catch (err)->
  console.log err.message
