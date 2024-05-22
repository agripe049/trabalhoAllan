import Sequelize from 'sequelize';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './auth.sqlite',
});

export default db;


//exporto uma funcao assincrona responsavel por abrir o banco de dados