const assert = require('assert');
const fs = require('fs');
const { bfs, findPath, findShortestPathDFS } = require('../src/graph');

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

  it('should return undefined if node is not connected to itself', function () {
    assert.deepStrictEqual(findPath(alphabetsPairs, 'zz', 'zz'), undefined);
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

  it('should return undefined if node is not connected', function () {
    assert.deepStrictEqual(findPath(alphabetsPairs, 'bb', 'jj'), undefined);
    assert.deepStrictEqual(findPath(alphabetsPairs, 'mm', 'jj'), undefined);
  });

  it('should return undefined if edge is not present', function () {
    assert.strictEqual(findPath(alphabetsPairs, 'xx', 'xx'), undefined);
  });
});

describe('findShortestPathDFS()', function () {
  it('should return shortest path if node is connected to itself', function () {
    assert.deepStrictEqual(findShortestPathDFS(alphabetsPairs, 'aa', 'aa'), [
      'aa',
      'aa',
    ]);
  });

  it('should return undefined if node is not connected to itself', function () {
    assert.deepStrictEqual(
      findShortestPathDFS(alphabetsPairs, 'zz', 'zz'),
      undefined
    );
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

  it('should return undefined if node is not connected', function () {
    assert.deepStrictEqual(
      findShortestPathDFS(alphabetsPairs, 'bb', 'jj'),
      undefined
    );
    assert.deepStrictEqual(
      findShortestPathDFS(alphabetsPairs, 'mm', 'jj'),
      undefined
    );
  });

  it('should return undefined if edge is not present', function () {
    assert.strictEqual(
      findShortestPathDFS(alphabetsPairs, 'xx', 'xx'),
      undefined
    );
  });
});
