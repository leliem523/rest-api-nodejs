const { Sequelize } = require('sequelize');

const db = new Sequelize('dbmanager', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
});

db.authenticate().then(() => console.log('co so du lieu da duoc ket noi !!!'));

module.exports = db;
