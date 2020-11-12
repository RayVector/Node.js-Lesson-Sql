const Sequelize = require('sequelize')
const DB_NAME = 'node-todo'
const USER_NAME = 'root'
const USER_PASS = '130100325079A'

const sequelize = new Sequelize(DB_NAME, USER_NAME, USER_PASS, {
  host: 'localhost',
  dialect: 'mysql',
})


module.exports = sequelize