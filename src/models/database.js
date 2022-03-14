import { Sequelize } from 'sequelize';

const db = new Sequelize('dbmanager', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
});

db.authenticate().then(() => console.log('co so du lieu da duoc ket noi !!!'));

export default db;
