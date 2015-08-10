module.exports = (sequelize, dataTypes)->
  sequelize.define 'form', {
    number:
      type: dataTypes.INTEGER
      allowNull: false
      unique: true
    company:
      type: dataTypes.TEXT
      allowNull: false
      validate:
        notEmpty: true
    jzDate:
      type: dataTypes.DATE
    syDate:
      type: dataTypes.DATE
    bgDate:
      type: dataTypes.DATE
    data:
      type: dataTypes.TEXT('long')
  }