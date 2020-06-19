const assert = require('assert');
const fs = require('fs');
const {
  bfs,
  findPath,
  findShortestPathDFS,
  dijkstra,
  findShortestPathDijkstra,
  primMST,
} = require('../src/graph');

const alphabetsPairs = JSON.parse(
  fs.readFileSync('./test/data/alphabetsPairs.json', 'utf8')
);

describe('bfs()', function () {
  it('should return false if source and target are not connected', function () {
    assert.strictEqual(bfs(alphabetsPairs, 'bb', 'jj'), false);
    assert.strictEqual(bfs(alphabetsPairs, 'mm', 'jj'), false);
  });

  it('should return true if source and target are connected', function () {
    assert.ok(bfs(alphabetsPairs, 'jj', 'aa'));
    assert.ok(bfs(alphabetsPairs, 'aa', 'hh'));
    assert.ok(bfs(alphabetsPairs, 'hh', 'ii'));
    assert.ok(bfs(alphabetsPairs, 'ii', 'ee'));
    assert.ok(bfs(alphabetsPairs, 'ee', 'mm'));
  });

  it('should return true if it is connected to itself', function () {
    assert.ok(bfs(alphabetsPairs, 'aa', 'aa'));
  });

  it('should return false if it is not connected to itself', function () {
    assert.strictEqual(bfs(alphabetsPairs, 'zz', 'zz'), false);
  });

  it('should return false if edge is not present', function () {
    assert.strictEqual(bfs(alphabetsPairs, 'xx', 'xx'), false);
  });
});

describe('findPath()', function () {
  it('should return path if node is connected to itself', function () {
    assert.deepStrictEqual(findPath(alphabetsPairs, 'aa', 'aa'), ['aa', 'aa']);
  });

  it('should return [] if node is not connected to itself', function () {
    assert.deepStrictEqual(findPath(alphabetsPairs, 'zz', 'zz'), []);
  });

  it('should return path if node is not directly connected', function () {
    let exp_path = ['aa', 'll', 'ff'];
    assert.deepStrictEqual(findPath(alphabetsPairs, 'aa', 'ff'), exp_path);

    exp_path = ['jj', 'mm', 'cc', 'ff', 'ii', 'bb', 'aa'];
    assert.deepStrictEqual(findPath(alphabetsPairs, 'jj', 'aa'), exp_path);
  });

  it('should return path if node is directly connected', function () {
    const exp_path = ['aa', 'll'];
    assert.deepStrictEqual(findPath(alphabetsPairs, 'aa', 'll'), exp_path);
  });

  it('should return [] if node is not connected', function () {
    assert.deepStrictEqual(findPath(alphabetsPairs, 'bb', 'jj'), []);
    assert.deepStrictEqual(findPath(alphabetsPairs, 'mm', 'jj'), []);
  });

  it('should return [] if edge is not present', function () {
    assert.deepStrictEqual(findPath(alphabetsPairs, 'xx', 'xx'), []);
  });
});

describe('findShortestPathDFS()', function () {
  it('should return shortest path if node is connected to itself', function () {
    assert.deepStrictEqual(findShortestPathDFS(alphabetsPairs, 'aa', 'aa'), [
      'aa',
      'aa',
    ]);
  });

  it('should return [] if node is not connected to itself', function () {
    assert.deepStrictEqual(findShortestPathDFS(alphabetsPairs, 'zz', 'zz'), []);
  });

  it('should return path if node is not directly connected', function () {
    let exp_path = ['aa', 'll', 'ff'];
    assert.deepStrictEqual(
      findShortestPathDFS(alphabetsPairs, 'aa', 'ff'),
      exp_path
    );

    exp_path = ['jj', 'dd', 'aa'];
    assert.deepStrictEqual(
      findShortestPathDFS(alphabetsPairs, 'jj', 'aa'),
      exp_path
    );
  });

  it('should return shortest path if node is directly connected', function () {
    const exp_path = ['aa', 'll'];
    assert.deepStrictEqual(
      findShortestPathDFS(alphabetsPairs, 'aa', 'll'),
      exp_path
    );
  });

  it('should return [] if node is not connected', function () {
    assert.deepStrictEqual(findShortestPathDFS(alphabetsPairs, 'bb', 'jj'), []);
    assert.deepStrictEqual(findShortestPathDFS(alphabetsPairs, 'mm', 'jj'), []);
  });

  it('should return [] if edge is not present', function () {
    assert.deepStrictEqual(findShortestPathDFS(alphabetsPairs, 'xx', 'xx'), []);
  });
});

const graph = {
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

describe('dijkstra', function () {
  it('should return all shortest path', function () {
    const exp_graph = {
      A: { dist: 0, parent: null },
      B: { dist: 5, parent: 'A' },
      C: { dist: 7, parent: 'D' },
      D: { dist: 6, parent: 'B' },
      E: { dist: 7, parent: 'B' },
      F: { dist: 9, parent: 'E' },
    };
    assert.deepStrictEqual(dijkstra(graph, 'A'), exp_graph);
  });

  it('should return all shortest path', function () {
    const exp_graph = {
      A: { dist: 5, parent: 'B' },
      B: { dist: 0, parent: null },
      C: { dist: 2, parent: 'D' },
      D: { dist: 1, parent: 'B' },
      E: { dist: 2, parent: 'B' },
      F: { dist: 4, parent: 'E' },
    };
    assert.deepStrictEqual(dijkstra(graph, 'B'), exp_graph);
  });
});

describe('findShortestPathDijkstra', function () {
  it('should return shortest path', function () {
    const exp = {
      path: ['A', 'B', 'E', 'F'],
      dist: 9,
    };
    assert.deepStrictEqual(findShortestPathDijkstra(graph, 'A', 'F'), exp);
  });

  it('should return shortest path with dest', function () {
    const exp = {
      path: ['D', 'B', 'E'],
      dist: 3,
    };
    assert.deepStrictEqual(findShortestPathDijkstra(graph, 'D', 'E'), exp);
  });
});

describe('dijkstra', function () {
  it('should return all shortest path', function () {
    const exp_graph = {
      A: { dist: 0, parent: null },
      B: { dist: 5, parent: 'A' },
      C: { dist: 7, parent: 'D' },
      D: { dist: 6, parent: 'B' },
      E: { dist: 7, parent: 'B' },
      F: { dist: 9, parent: 'E' },
    };
    assert.deepStrictEqual(dijkstra(graph, 'A'), exp_graph);
  });

  it('should return all shortest path', function () {
    const exp_graph = {
      A: { dist: 5, parent: 'B' },
      B: { dist: 0, parent: null },
      C: { dist: 2, parent: 'D' },
      D: { dist: 1, parent: 'B' },
      E: { dist: 2, parent: 'B' },
      F: { dist: 4, parent: 'E' },
    };
    assert.deepStrictEqual(dijkstra(graph, 'B'), exp_graph);
  });
});

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
    assert.deepStrictEqual(primMST(graph), mst);
  });

  it('should return minimum spanning tree', function () {
    const graph = {
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
    assert.deepStrictEqual(primMST(graph), mst);
  });
});
