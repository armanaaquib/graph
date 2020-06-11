//Example
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to
// Should return true.

const createAdjacencyList = (pairs) => {
  return pairs.reduce((adjacencyList, pair) => {
    const [from, to] = pair;

    if (!(from in adjacencyList)) {
      adjacencyList[from] = [];
    }

    adjacencyList[from].push(to);
    return adjacencyList;
  }, {});
};

const bfs = (pairs, source, target) => {
  const adjacencyList = createAdjacencyList(pairs);

  let toVisit = adjacencyList[source] ? adjacencyList[source] : [];
  const visited = new Set();

  while (toVisit.length != 0) {
    const node = toVisit.shift();

    if (node === target) {
      return true;
    }

    visited.add(node);

    const neighbors = adjacencyList[node];
    const unvisitedNeighbors = neighbors
      ? neighbors.filter((node) => !(node in toVisit || visited.has(node)))
      : [];

    toVisit = toVisit.concat(unvisitedNeighbors);
  }

  return false;
};

module.exports = { bfs };
