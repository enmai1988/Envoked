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
  byline: Sequelize.TEXT,
  companyName: Sequelize.TEXT,
  location: Sequelize.TEXT,
  description: Sequelize.TEXT,
  coFounders: Sequelize.TEXT,
  url: Sequelize.TEXT,
  imageURL: Sequelize.TEXT,
  currency: Sequelize.TEXT,
  fundedAmount: Sequelize.DECIMAL(10, 2),
  fundingGoal: Sequelize.DECIMAL(10, 2),
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

<<<<<<< HEAD
const Image = db.define('image', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
<<<<<<< HEAD
  small: Sequelize.TEXT,
  full: Sequelize.TEXT
=======
  url: { type: Sequelize.TEXT, unique: true }
>>>>>>> create user with social network login
});
=======
// const Image = db.define('image', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   small: Sequelize.TEXT,
//   full: Sequelize.TEXT
// });
>>>>>>> ae7560050d7246ca480925a0ab3533d2481860d0


User.hasMany(Project, { foreignKey: 'userId'});

Project.belongsTo(User);

Project.hasMany(Funding, { foreignKey: 'projectId' });

// Project.hasMany(Image, { foreignKey: 'projectId' });

Funding.belongsTo(User);

Funding.belongsTo(Project);

Interest.belongsToMany(User, { through: 'UserInterest' });

Interest.belongsToMany(Project, { through: 'ProjectInterest' });

// Image.belongsTo(Project);

// User.hasMany(Interest);

// User.hasMany(Funding);

// Project.hasMany(Interest, { foreignKey: 'projectId' });

<<<<<<< HEAD
<<<<<<< HEAD
=======
// db.sync({ force: true });

>>>>>>> create user with social network login
module.exports = { db, User, Project, Interest, Funding, Image };
=======
module.exports = { db, User, Project, Interest, Funding };
>>>>>>> ae7560050d7246ca480925a0ab3533d2481860d0
