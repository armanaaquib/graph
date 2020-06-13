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

  const toVisit = adjacencyList[source] ? adjacencyList[source] : [];
  const visited = new Set();

  while (toVisit.length !== 0) {
    const node = toVisit.shift();

    if (node === target) {
      return true;
    }

    visited.add(node);

    const neighbors = adjacencyList[node] ? adjacencyList[node] : [];

    neighbors.forEach((node) => {
      if (!(toVisit.includes(node) || visited.has(node))) {
        toVisit.push(node);
      }
    });
  }

  return false;
};

const _findPath = (graph, source, target, visited) => {
  visited.add(source);
  const neighbors = graph[source];

  if (neighbors === undefined) {
    return undefined;
  }

  for (let idx = 0; idx < neighbors.length; idx++) {
    const node = neighbors[idx];

    if (node === target) {
      return [source, target];
    }

    if (!visited.has(node)) {
      const path = _findPath(graph, node, target, visited);
      if (path) return [source, ...path];
    }
  }

  return undefined;
};

const findPath = (pairs, source, target) => {
  const graph = createAdjacencyList(pairs);
  const visited = new Set();

  return _findPath(graph, source, target, visited);
};

module.exports = { createAdjacencyList, bfs, findPath };
