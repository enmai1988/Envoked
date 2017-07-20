const Sequelize = require('sequelize');
const users = require('./users.json');
const projects = require('./projects.json');
const interests = require('./interests.json');

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
  logo: Sequelize.TEXT,
  imageURL: Sequelize.TEXT,
  location: Sequelize.TEXT,
  description: Sequelize.TEXT,
  coFounders: Sequelize.TEXT,
  url: Sequelize.TEXT,
  fundedAmount: Sequelize.DECIMAL(10, 2),
  neededFunding: Sequelize.DECIMAL(10, 2),
  status: Sequelize.ENUM('ready', 'creating', 'failed'),
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


/***********************************************
NOTE: 1. run 'createdb techstarter to create database'
      2. run 'initdb techstarter' to get log command
      3. copy paste command returned from above to start server
      4. run 'node db/index.js' with all bulkCreates commented and sync uncommented first, 
      5. then run same command with bulkcreate uncommented and sync commented, this will populate database.
      6. run database with: psql techstarter.
************************************************/

User.bulkCreate(users);
Project.bulkCreate(projects);
Interest.bulkCreate(interests);  
// db.sync({force: true});

module.exports = { db, User, Project, Interest, Funding };

//https://media.alvinology.com/uploads/2017/04/Fitbit-Alta-HR_Family-1280x640.jpg, http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_640/images/live/p0/2x/b4/p02xb4tc.jpg, http://inphantry.com/wp-content/uploads/2017/06/scorpio-hero.jpg, https://icgtechnology.com/wp-content/uploads/2017/04/TSR-Page-Cloud-Evaluation.jpg, https://monstergeek.uk/wp-content/uploads/2016/10/CyberSecurity-1280x640.jpg, http://68.media.tumblr.com/6d351c2efb19c7d9f2b1d74ca6db1762/tumblr_np9wbjGa1M1tf70vho1_1280.png, http://realtrends.com/blog/wp-content/uploads/2017/02/AdobeStock_113286249-1280x640.jpeg, http://realtrends.com/blog/wp-content/uploads/2017/01/AdobeStock_94353427-1280x640.jpeg, http://realtrends.com/blog/wp-content/uploads/2017/03/AdobeStock_78180349-1-1280x640.jpeg, https://financialtribune.com/sites/default/files/field/image/october/11_nissan_520.jpg, https://i1.wp.com/www.juku.it/wp-content/uploads/2016/10/efficiency.jpeg?resize=1280%2C640, https://cdn-images-1.medium.com/max/1600/1*hoowIZWyQhh5GMOJ7uXfRw.jpeg