const ADJECTIVES = [
    'happy','mad','sad','good','lucky','frizzy','flappy','super','jumbo','dead',
    'red','orange','yellow','green','blue','purple','slow','fast','flying',
    'dancing','striped','fat','skinny','dumb','smart','king','common','tired',
    'energetic','paisty','sweaty'
  ],

  NOUNS = [
    'cow','dog','cat','fish','turtle','bird','snake','snail','spider','mouse',
    'rat','bat','ferret','zebra','hippo','hyena','beetle','lion','antelope',
    'parrot','worm','man','monkey','ant','slug','boy','girl','woman'
  ],

  LEN_A = ADJECTIVES.length,
  LEN_N = NOUNS.length
;

export default function randomCombination() {
  let adjective = ADJECTIVES[Math.floor(LEN_A * Math.random())],
    noun = NOUNS[Math.floor(LEN_N * Math.random())]
  ;

  return `${adjective}-${noun}`;
}
