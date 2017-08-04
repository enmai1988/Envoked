const Sequelize = require('sequelize');
const config = require('config')['sequelize'];
const users = require('./users.json');
const projects = require('./projects.json');
const interests = require('./interests.json');
const { compileProjects } = require('./seeds/seed');

let db;
if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL);
} else {
  db = new Sequelize(config.connection.database, config.connection.user, config.connection.password, {
    host: config.connection.host,
    dialect: 'postgres',
    pool: config.pool
  });
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
  slug: { type: Sequelize.TEXT },
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

const Notification = db.define('notification', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  type: Sequelize.TEXT,
  status: {
    type: Sequelize.TEXT,
    defaultValue: 'unread'
  },
  viewedAt: Sequelize.DATE
});

const Contact = db.define('contact', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  status: {
    type: Sequelize.TEXT,
    defaultValue: 'pending'
  }
});

User.hasMany(Project, { foreignKey: 'userId'});

User.hasMany(Contact);

Contact.belongsTo(User, { as: 'contacts'} );

Project.belongsTo(User);

Project.hasMany(Funding, { foreignKey: 'projectId' });

Funding.belongsTo(User);

Funding.belongsTo(Project);

Interest.belongsToMany(User, { through: 'UserInterest' });

Interest.belongsToMany(Project, { through: 'ProjectInterest' });

Notification.belongsTo(User, { as: 'originator' });

Notification.belongsTo(User, { as: 'recipient' });

db.sync({force: true})
  .then(() => {
    User.bulkCreate(users)
      .then(() => {
        Project.bulkCreate(compileProjects(projects.projects))
          .then(() => {
            Interest.bulkCreate(interests);
          });
      });
  });

module.exports = { db, User, Project, Interest, Funding, Notification, Contact };
