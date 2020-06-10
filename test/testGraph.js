const assert = require('assert');
const fs = require('fs');
const { bfs } = require('../src/graph');

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
    // assert.ok(bfs(alphabetsPairs, 'aa', 'hh'));
    // assert.ok(bfs(alphabetsPairs, 'hh', 'ii'));
    // assert.ok(bfs(alphabetsPairs, 'ii', 'ee'));
    // assert.ok(bfs(alphabetsPairs, 'ee', 'mm'));
  });
});
