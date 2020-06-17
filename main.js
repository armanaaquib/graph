const { bft, dftRec, dft } = require('./src/traversals');

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

  console.log('dft');
  dftRec(pairs, 'A');
};

main();
