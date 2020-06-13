const { createAdjacencyList } = require('./graph');

const bft = (pairs, source) => {
  const adjacencyList = createAdjacencyList(pairs);

  const toVisit = [source];
  const visited = new Set();

  while (toVisit.length != 0) {
    const node = toVisit.shift();

    console.log(node);
    visited.add(node);

    const neighbors = adjacencyList[node] ? adjacencyList[node] : [];
    neighbors.forEach((node) => {
      if (!(toVisit.includes(node) || visited.has(node))) {
        toVisit.push(node);
      }
    });
  }
};

const _dft = (graph, node, visited) => {
  console.log(node);
  visited.add(node);

  const neighbors = graph[node] ? graph[node] : [];
  neighbors.forEach((node) => {
    if (!visited.has(node)) {
      _dft(graph, node, visited);
    }
  });
};

const dftRec = (pairs, source) => {
  const adjacencyList = createAdjacencyList(pairs);

  _dft(adjacencyList, source, new Set());
};

module.exports = { bft, dftRec };
