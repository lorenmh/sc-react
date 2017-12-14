import { EPSILON } from './const';

// checks if two values are equal (below a small threshold, epsilon)
export const epsilonEquals = (a,b) => Math.abs(a-b) < EPSILON;

// checks if value a is less than value b (precision to 4 decimal places)
export const cludgeLt = (a,b) => (
  parseFloat(a.toFixed(4)) < parseFloat(b.toFixed(4))
);

const ADJECTIVES = [
    'happy','mad','sad','good','lucky','frizzy','flappy','super','jumbo','dead',
    'red','orange','yellow','green','blue','purple','slow','fast','flying',
    'dancing','striped','fat','skinny','dumb','smart','king','common','tired',
    'energetic','paisty','sweaty'
  ],

  NOUNS = [
    'cow','dog','cat','fish','turtle','bird','snake','snail','spider','mouse',
    'rat','bat','ferret','zebra','hippo','hyena','beetle','lion','antelope',
    'parrot','worm','man','monkey','ant','slug','boy',
  ],

  LEN_A = ADJECTIVES.length,
  LEN_N = NOUNS.length
;

export const mnemonic = () => {
  let adjective = ADJECTIVES[Math.floor(LEN_A * Math.random())],
    noun = NOUNS[Math.floor(LEN_N * Math.random())]
  ;

  return `${adjective}-${noun}`;
};
