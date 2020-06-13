const { bft, dftRec } = require('./src/traversals');

const main = () => {
  const pairs = [
    ['A', 'B'],
    ['A', 'C'],
    ['A', 'E'],
    ['B', 'D'],
    ['B', 'F'],
    ['C', 'G'],
    ['F', 'E'],
  ];

  console.log('bft');
  bft(pairs, 'A');

  console.log('dftRec');
  dftRec(pairs, 'A');
};

main();
