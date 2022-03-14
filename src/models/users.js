const { DataTypes } = require('sequelize');

const db = require('./database.js');

const User = db.define('Users', {
	// Model attributes are defined here
	id: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true
	},
	email: {
		type: DataTypes.STRING(255),
		allowNull: false
	},
	fullname: {
		type: DataTypes.STRING(255)
	},
	phone: {
		type: DataTypes.STRING(255)
	},
	age: {
		type: DataTypes.INTEGER
	},
	gender: {
		type: DataTypes.BOOLEAN
	},
	password: {
		type: DataTypes.STRING(255)
	}
});

db.sync(); // Lenh khoi tao database

module.exports = User;
