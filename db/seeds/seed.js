/***********************************************
NOTE: 1. run 'createdb techstarter to create database'
      2. run 'initdb techstarter' to get log command
      3. copy paste command returned from above to start server
      4. run 'node db/index.js' with all bulkCreates commented and sync uncommented first,
      5. then run same command with bulkcreate uncommented and sync commented, this will populate database.
      6. run database with: psql techstarter.
************************************************/
const { db, User, Project, Interest } = require('../');
const users = require('../users.json');
const projects = require('../projects.json');
const interests = require('../interests.json');

db.sync({force: true})
  // .then(() => {
  //   return User.bulkCreate(users);
  // })
  .then(() => {
    return Project.bulkCreate(projects);
  })
  .then(() => {
    return Interest.bulkCreate(interests);
  })
  .then(() => db.close());
