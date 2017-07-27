/***********************************************
NOTE: 1. run 'createdb techstarter to create database'
      2. run 'initdb techstarter' to get log command
      3. copy paste command returned from above to start server
      4. run 'node db/index.js' with all bulkCreates commented and sync uncommented first,
      5. then run same command with bulkcreate uncommented and sync commented, this will populate database.
      6. run database with: psql techstarter.
************************************************/
const { db, User, Project, Interest } = require('../');
const { convertToSlug } = require('../../helpers/util');
const users = require('../users.json');
const projects = require('../projects.json');
const interests = require('../interests.json');

const compileProjects = (array) => {
  let res = [];
  array.forEach(el => {
    let obj = {};
    obj.userId = Math.floor(Math.random() * 999) + 1;
    obj.appName = el.name;
    obj.slug = el.slug;
    obj.blurb = el.blurb;
    obj.imageURL = el.photo['1024x576'];
    obj.goal = el.goal;
    obj.currentFunding = Number(el['usd_pledged']);
    obj.location = el.location.displayable_name;
    obj.url = `http://www.${el.slug}.com`;
    obj.description =
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique purus nec lacus egestas blandit. Quisque et auctor ante. Maecenas vehicula, magna nec imperdiet pulvinar, dolor arcu sodales enim, a pulvinar orci lacus eu nulla. Pellentesque placerat ipsum non eros feugiat maximus. Praesent pretium orci interdum urna pretium, vel faucibus dolor dapibus. Ut eu elit eget nisl mattis molestie. Suspendisse est nibh, sagittis in nisl ut, venenatis sodales nibh. Ut non lectus commodo, elementum metus id, tempor dolor. Suspendisse ut neque quis ligula rhoncus rutrum eget et nulla. Cras ut ipsum eu nisi tincidunt gravida. Quisque eu erat euismod, viverra enim ut, mattis tellus. Phasellus vulputate erat eu tortor efficitur efficitur. Sed laoreet ut odio et hendrerit. Morbi ut ligula eget tortor tempus rhoncus at quis metus. Mauris volutpat lacus sit amet lectus scelerisque, sit amet consequat purus blandit. Vivamus maximus dolor non justo gravida maximus.

    Fusce ultricies, lacus non porta semper, urna orci tempor odio, at aliquet sapien dui a turpis. Nam vel semper tellus. Nunc velit dui, feugiat quis lectus ac, auctor imperdiet ex. Phasellus aliquet velit vitae risus ultricies, at euismod odio porta. Fusce ac vulputate nisl, posuere euismod erat. Proin gravida nibh eu dui facilisis fringilla. Cras accumsan tempus suscipit. Integer ante eros, fermentum eget nisi eu, mattis faucibus arcu. Curabitur sodales vehicula velit nec tempor. Proin feugiat, lorem vel imperdiet finibus, diam mauris iaculis ligula, at condimentum velit dolor ornare erat. Etiam fermentum purus pellentesque nulla molestie fermentum. Aenean urna libero, mattis non ornare et, cursus a diam. Nam dictum sapien eu mi pretium condimentum. Etiam dictum, lorem sed mattis consectetur, sapien nisi sagittis erat, a maximus massa nulla a mi.

    Vivamus augue lectus, viverra vitae aliquam at, sollicitudin ac purus. Integer ultricies, turpis quis consectetur ultrices, augue sapien ornare eros, non aliquet odio ligula ac elit. Nam ut est orci. Suspendisse fermentum enim id ligula finibus, ut egestas mauris molestie. Nulla maximus luctus rhoncus. Curabitur interdum enim auctor augue posuere, ut pretium massa scelerisque. Suspendisse sit amet posuere lectus, eu blandit nibh. Aliquam ut est eget quam elementum interdum. Vestibulum et sapien at mauris laoreet ultricies eu eget arcu. Sed ex elit, pharetra et vulputate et, dignissim in lectus. In volutpat suscipit pretium. Suspendisse convallis feugiat semper. Fusce fringilla congue sem id aliquet. Vestibulum ultrices eget arcu at lacinia. Pellentesque in suscipit risus. Donec pharetra sapien interdum quam molestie auctor at vel tortor.

    Nullam quis ligula pharetra, interdum risus id, hendrerit velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum massa mi, ullamcorper vel hendrerit et, posuere sed augue. Vestibulum sagittis massa eu auctor ultrices. Aenean dapibus nisl neque, in sagittis nulla ornare pretium. Ut luctus ornare pharetra. Vestibulum quis posuere risus. Vestibulum posuere id metus nec tempus.

    Vestibulum molestie a dui sed ultrices. Aliquam vestibulum, risus nec suscipit sollicitudin, leo erat suscipit metus, vel sodales orci eros vitae elit. Pellentesque ac quam posuere, pharetra odio sed, tincidunt orci. Duis nisl elit, tincidunt placerat ultricies in, ullamcorper quis felis. Aenean velit dui, convallis iaculis porttitor at, venenatis id tellus. Phasellus ac enim non purus dignissim luctus. Nunc porta, tellus a eleifend gravida, arcu velit pharetra nisi, id facilisis dui sem in nulla. Nullam porta imperdiet elit, id molestie purus dignissim nec. Suspendisse ultricies aliquam turpis a consequat.`;
    res.push(obj);
  });

  return res;
};

const createFakeContacts = n => {
  let res = [];
  for (let i = 0; i < n; i++) {
    let obj = {};
    obj.userId = 1001;
    obj.contactId = Math.floor(Math.random() * 999) + 1;
    res.push(obj);
  }

  return res;
};

const addSlugToUsers = array => {
  return array.map(el => {
    el.slug = convertToSlug(`${el.firstName} ${el.lastName}`);
    return el;
  });
};

db.sync({force: true})
  .then(() => {
    return User.bulkCreate(addSlugToUsers(users));
  })
  .then(() => {
    return Project.bulkCreate(compileProjects(projects.projects));
  })
  .then(() => {
    return Interest.bulkCreate(interests);
  })
  // .then(() => {
  //   return Contact.bulkCreate(createFakeContacts(10));
  // })
  .then(() => db.close());
