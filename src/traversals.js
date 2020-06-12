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

module.exports = { bft };
