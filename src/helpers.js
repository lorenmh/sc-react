import { EPSILON } from './const';

// checks if two values are equal (below a small threshold, epsilon)
export const epsilonEquals = (a,b) => Math.abs(a-b) < EPSILON;

// checks if value a is less than value b (precision to 4 decimal places)
export const cludgeLt = (a,b) => (
  parseFloat(a.toFixed(4)) < parseFloat(b.toFixed(4))
);
