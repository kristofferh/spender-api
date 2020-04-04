export const COLORS = [
  "#F2CB6C",
  "#F27B6C",
  "#6CD5F2",
  "#4A90E2",
  "#f26ca1",
  "#383971",
  "#6f9cab",
  "#3a0d2f",
  "#b2cc7e",
];

export const randomValue = (values) => {
  return values[Math.floor(Math.random() * values.length)];
};

export const randomColor = () => {
  return randomValue(COLORS);
};
