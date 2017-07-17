const _ = require('underscore');

const getLinks = (array, str) => {
  let regex = /href="\/\w+/;

  let filter = array.filter(el => {
    return regex.test(el);
  });

  let reject = _.reject(filter, el => {
    return el.includes(str) || el.includes('.css');
  });
  return reject;
  // return _.shuffle(res);
};

module.exports = { getLinks };
