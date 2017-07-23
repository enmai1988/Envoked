const convertToSlug = (str) => {
  let hyphenated = str.split(/[^A-Za-z0-9]/g).filter(el => el !== '').map(el => el.toLowerCase()).join('-');

  return hyphenated;
};

module.exports = { convertToSlug };
