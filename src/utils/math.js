export const median = values => {
  values.sort(function(a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) {
    return values[half];
  }

  return (values[half - 1] + values[half]) / 2.0;
};

export const sum = values => {
  return values.reduce((aggregate, current) => {
    return aggregate + current;
  }, 0);
};

export const avg = values => {
  return sum(values) / values.length;
};

export const toDecimal = number => {
  return Number(number.toFixed(2));
};
