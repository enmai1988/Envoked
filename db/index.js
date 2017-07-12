// const knex = require('knex')(require('../knexfile'));
// const db = require('bookshelf')(knex);
//
// db.plugin('registry');

const Sequelize = require('sequelize');

let db = null;
if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL);
} else {
  db = new Sequelize('postgres:///techstarter');
}

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: { type: Sequelize.TEXT, unique: true },
  firstName: Sequelize.TEXT,
  lastName: Sequelize.TEXT,
  phone: Sequelize.TEXT
});

const Project = db.define('project', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.TEXT,
  description: Sequelize.TEXT,
  byline: Sequelize.TEXT,
  location: Sequelize.TEXT,
  targetUsers: Sequelize.TEXT,
  technologies: Sequelize.TEXT,
  coFounders: Sequelize.TEXT,
  stripeAmount: Sequelize.DECIMAL(10, 2)
});

const Interest = db.define('interest', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.TEXT
});

const Funding = db.define('funding', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  amount: Sequelize.DECIMAL(10, 2)
});

User.hasMany(Project, { foreignKey: 'userId'});

Project.belongsTo(User);

Project.hasMany(Funding, { foreignKey: 'projectId' });

Funding.belongsTo(User);

Funding.belongsTo(Project);

Interest.belongsToMany(User, { through: 'UserInterest' });

Interest.belongsToMany(Project, { through: 'ProjectInterest' });

// User.hasMany(Interest);

// User.hasMany(Funding);

// Project.hasMany(Interest, { foreignKey: 'projectId' });

db.sync({ force: true });

module.exports = db;
