const { bft } = require('./src/traversals');

const main = () => {
  const pairs = [
    ['1', '2'],
    ['1', '3'],
    ['2', '4'],
    ['2', '5'],
    ['3', '5'],
    ['4', '5'],
    ['4', '6'],
    ['5', '6'],
  ];

  bft(pairs, '1');
};

main();