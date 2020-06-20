const assert = require('assert');
const { primMST, kruskalMST } = require('../src/mst');

const graph1 = {
  A: [
    ['B', 5],
    ['C', 8],
  ],
  B: [
    ['A', 5],
    ['C', 3],
    ['D', 1],
    ['E', 2],
  ],
  C: [
    ['A', 8],
    ['B', 3],
    ['D', 1],
  ],
  D: [
    ['C', 1],
    ['F', 4],
    ['B', 1],
  ],
  E: [
    ['B', 2],
    ['F', 2],
  ],
  F: [
    ['E', 2],
    ['D', 4],
  ],
};

const graph2 = {
  a: [
    ['b', 4],
    ['h', 8],
  ],
  b: [
    ['a', 4],
    ['c', 8],
    ['h', 11],
  ],
  c: [
    ['b', 8],
    ['d', 7],
    ['f', 4],
    ['i', 2],
  ],
  d: [
    ['c', 7],
    ['e', 9],
    ['f', 14],
  ],
  e: [
    ['d', 9],
    ['f', 10],
  ],
  f: [
    ['e', 10],
    ['g', 2],
    ['d', 14],
    ['c', 4],
  ],
  g: [
    ['f', 2],
    ['h', 1],
    ['i', 6],
  ],
  h: [
    ['g', 1],
    ['i', 7],
    ['b', 11],
    ['a', 8],
  ],
  i: [
    ['g', 6],
    ['h', 7],
    ['c', 2],
  ],
};

describe('primMST', function () {
  it('should return minimum spanning tree', function () {
    const mst = {
      A: [['B', 5]],
      B: [
        ['A', 5],
        ['D', 1],
        ['E', 2],
      ],
      C: [['D', 1]],
      D: [
        ['B', 1],
        ['C', 1],
      ],
      E: [
        ['B', 2],
        ['F', 2],
      ],
      F: [['E', 2]],
    };
    assert.deepStrictEqual(primMST(graph1), mst);
  });

  it('should return minimum spanning tree 2', function () {
    const mst = {
      a: [
        ['b', 4],
        ['h', 8],
      ],
      b: [['a', 4]],
      h: [
        ['a', 8],
        ['g', 1],
      ],
      g: [
        ['h', 1],
        ['f', 2],
      ],
      f: [
        ['g', 2],
        ['c', 4],
      ],
      c: [
        ['f', 4],
        ['i', 2],
        ['d', 7],
      ],
      i: [['c', 2]],
      d: [
        ['c', 7],
        ['e', 9],
      ],
      e: [['d', 9]],
    };
    assert.deepStrictEqual(primMST(graph2), mst);
  });
});

describe('kruskalMST', function () {
  it('should return minimum spanning tree', function () {
    const edges = [
      ['A', 'B', 5],
      ['A', 'C', 8],
      ['B', 'C', 3],
      ['B', 'D', 1],
      ['B', 'E', 2],
      ['C', 'D', 1],
      ['D', 'F', 4],
      ['E', 'F', 2],
    ];

    const mstEdges = [
      ['B', 'D', 1],
      ['C', 'D', 1],
      ['B', 'E', 2],
      ['E', 'F', 2],
      ['A', 'B', 5],
    ];
    assert.deepStrictEqual(kruskalMST(edges), mstEdges);
  });

  it('should return minimum spanning tree 2', function () {
    const edges = [
      ['a', 'b', 4],
      ['a', 'h', 8],
      ['b', 'c', 8],
      ['b', 'h', 11],
      ['c', 'd', 7],
      ['c', 'f', 4],
      ['c', 'i', 2],
      ['d', 'e', 9],
      ['d', 'f', 14],
      ['e', 'f', 10],
      ['f', 'g', 2],
      ['g', 'h', 1],
      ['g', 'i', 6],
      ['h', 'i', 7],
    ];

    const mstEdges = [
      ['g', 'h', 1],
      ['c', 'i', 2],
      ['f', 'g', 2],
      ['a', 'b', 4],
      ['c', 'f', 4],
      ['c', 'd', 7],
      ['a', 'h', 8],
      ['d', 'e', 9],
    ];

    assert.deepStrictEqual(kruskalMST(edges), mstEdges);
  });
});
