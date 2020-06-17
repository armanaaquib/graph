const { bft, dftRec, dft, bftGen, dftGen } = require('./src/traversals');

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

  console.log('bftGen');
  for (node of bftGen(pairs, 'A')) {
    console.log(node);
  }

  console.log('dftRec');
  dftRec(pairs, 'A');

  console.log('dft');
  dft(pairs, 'A');

  console.log('dftGen');
  for (node of dftGen(pairs, 'A')) {
    console.log(node);
  }
};

main();
