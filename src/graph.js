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

  let toVisit = [source];
  const visited = new Set();

  while (toVisit.length != 0) {
    const edge = toVisit.shift();

    if (edge === target) {
      return true;
    }

    visited.add(edge);

    const neighbors = adjacencyList[edge];
    const unvisitedNeighbors = neighbors
      ? neighbors.filter((edge) => !(edge in toVisit || visited.has(edge)))
      : [];

    toVisit = toVisit.concat(unvisitedNeighbors);
  }

  return false;
};

module.exports = { bfs };
