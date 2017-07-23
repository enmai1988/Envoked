const calculatePercentage = (valueA, valueB) => {
  valueA = Number(valueA) || 0;
  let res = Math.round(valueA / valueB * 100);
  if (res < 0) { res = 0; }

  return res <= 100 ? res : 100;
};

const convertToSlug = (str) => {
  let hyphenated = str.split(/[^A-Za-z0-9]/g).filter(el => el !== '').map(el => el.toLowerCase()).join('-');

  return hyphenated;
};

module.exports = { calculatePercentage, convertToSlug };
