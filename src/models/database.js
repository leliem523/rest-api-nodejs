import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config';

const db = new Sequelize(
	dbConfig.DATABASE_NAME,
	dbConfig.USER_NAME,
	dbConfig.PASSWORD,
	{
		host: dbConfig.HOST,
		dialect: dbConfig.DIALECT
	}
);

db.authenticate().then(() => console.log('co so du lieu da duoc ket noi !!!'));

export default db;
