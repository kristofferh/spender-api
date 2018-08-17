export const COLORS = ["#F2CB6C", "#F27B6C", "#6CD5F2", "#4A90E2"];

export const randomValue = values => {
  return values[Math.floor(Math.random() * values.length)];
};

export const randomColor = () => {
  return randomValue(COLORS);
};
