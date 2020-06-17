const { createAdjacencyList } = require('./graph');

const bft = (pairs, source) => {
  const adjacencyList = createAdjacencyList(pairs);

  const toVisit = [source];
  const visited = new Set();

  while (toVisit.length != 0) {
    const node = toVisit.shift();

    console.log(node);
    visited.add(node);

    const neighbors = adjacencyList[node] || [];
    neighbors.forEach((node) => {
      if (!(toVisit.includes(node) || visited.has(node))) {
        toVisit.push(node);
      }
    });
  }
};

const _dftRec = (graph, node, visited) => {
  console.log(node);
  visited.add(node);

  const neighbors = graph[node] || [];
  neighbors.forEach((node) => {
    if (!visited.has(node)) {
      _dftRec(graph, node, visited);
    }
  });
};

const dftRec = (pairs, source) => {
  const adjacencyList = createAdjacencyList(pairs);

  _dftRec(adjacencyList, source, new Set());
};

const dft = (pairs, source) => {
  const adjacencyList = createAdjacencyList(pairs);

  let toVisit = [source];
  const visited = new Set();

  while (toVisit.length != 0) {
    const node = toVisit.shift();

    console.log(node);
    visited.add(node);

    const neighbors = adjacencyList[node] || [];
    const unvisitedNeighbors = neighbors.filter(
      (node) => !(toVisit.includes(node) || visited.has(node))
    );

    toVisit = unvisitedNeighbors.concat(toVisit);
  }
};

module.exports = { bft, dftRec, dft };
