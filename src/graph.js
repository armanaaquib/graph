//Example
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to
// Should return true.

const createAdjacencyList = (pairs) => {
  const adjacencyList = {};

  for (let idx = 0; idx < pairs.length; idx++) {
    const [from, to] = pairs[idx];

    if (from in adjacencyList) {
      adjacencyList[from].push(to);
    } else {
      adjacencyList[from] = [to];
    }
  }

  return adjacencyList;
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
