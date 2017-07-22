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
  phone: Sequelize.TEXT,
  avatar: Sequelize.TEXT,
});

const Project = db.define('project', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  companyName: Sequelize.TEXT,
  appName: Sequelize.TEXT,
  blurb: Sequelize.TEXT,
  logo: Sequelize.TEXT,
  imageURL: Sequelize.TEXT,
  location: Sequelize.TEXT,
  description: Sequelize.TEXT,
  url: Sequelize.TEXT,
  currentFunding: Sequelize.INTEGER,
  goal: Sequelize.INTEGER,
  category: Sequelize.TEXT
});

const Interest = db.define('interest', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {type: Sequelize.TEXT, unique: true },
  image: Sequelize.TEXT
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

//Project.hasMany(Image, { foreignKey: 'projectId' });

Funding.belongsTo(User);

Funding.belongsTo(Project);

Interest.belongsToMany(User, { through: 'UserInterest' });

Interest.belongsToMany(Project, { through: 'ProjectInterest' });

// User.hasMany(Interest);

// User.hasMany(Funding);

// Project.hasMany(Interest, { foreignKey: 'projectId' });

module.exports = { db, User, Project, Interest, Funding };
