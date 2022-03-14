const { DataTypes } = require('sequelize');

const db = require('./database.js');

const User = db.define('Users', {
	// Model attributes are defined here
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	fullname: {
		type: DataTypes.STRING
	},
	phone: {
		type: DataTypes.STRING
	},
	age: {
		type: DataTypes.INTEGER
	},
	gender: {
		type: DataTypes.BOOLEAN
	},
	password: {
		type: DataTypes.STRING
	}
});

db.sync(); // Lenh khoi tao database

module.exports = User;
