const Pageres = require('pageres');
const { Project } = require('../../db/');

const pageres = new Pageres();

const getScreenshot = (url, projectId, xs, xl) => {
  console.log('capturing screenshot for: ', url);

  pageres.src(url, ['1366x768'], { filename: xs, crop: true })
    .dest(__dirname + '/../../public/assets/pageres/').run()
    .then(() => {
      return pageres.src(url, ['1366x768'], { filename: xl })
        .dest(__dirname + '/../../public/assets/pageres/').run();
    })
    .then(() => {
      console.log('screenshot captured for: ', url);
      Project.update({ status: 'ready'}, { where: { id: projectId } });
    })
    .catch(err => {
      console.log('screenshot failed: ', err);
      Project.update({ status: 'failed'}, { where: { id: projectId } });
    });
};

module.exports = getScreenshot;
