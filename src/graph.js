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

  const toVisit = adjacencyList[source] || [];
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
  const neighbors = graph[source] || [];

  for (const node of neighbors) {
    if (node === target) {
      return [source, target];
    }

    if (!visited.has(node)) {
      const path = _findPath(graph, node, target, visited);
      if (path.length > 0) return [source, ...path];
    }
  }

  return [];
};

const findPath = (pairs, source, target) => {
  const graph = createAdjacencyList(pairs);
  const visited = new Set();

  return _findPath(graph, source, target, visited);
};

const _findShortestPathDFS = (graph, source, target, visited) => {
  visited.add(source);

  const neighbors = graph[source] || [];
  const paths = [];

  for (const node of neighbors) {
    if (node === target) {
      return [source, target];
    }

    if (!visited.has(node)) {
      const path = _findShortestPathDFS(graph, node, target, new Set(visited));
      if (path.length > 0) paths.push([source, ...path]);
    }
  }

  if (paths.length > 0) {
    return paths.reduce((path1, path2) =>
      path1.length <= path2.length ? path1 : path2
    );
  }

  return [];
};

const findShortestPathDFS = (pairs, source, target) => {
  const graph = createAdjacencyList(pairs);
  const visited = new Set();

  return _findShortestPathDFS(graph, source, target, visited);
};

const updateDistances = (distances, graph, node) => {
  const neighbors = graph[node] || [];

  neighbors.forEach((nodeDist) => {
    const [nNode, dist] = nodeDist;
    const nDist = distances[node].dist + dist;

    if (nDist < distances[nNode].dist) {
      distances[nNode].dist = nDist;
      distances[nNode].parent = node;
    }
  });
};

const findMinNode = (distances, remainingNodes) => {
  let minDist = Infinity;
  let minDistNode = null;

  for (node in distances) {
    if (remainingNodes.has(node) && distances[node].dist < minDist) {
      minDistNode = node;
      minDist = node.dist;
    }
  }

  return minDistNode;
};

const initDistanceFor = (nodes, source) => {
  const distances = nodes.reduce((distances, node) => {
    distances[node] = { dist: Infinity, parent: null };
    return distances;
  }, {});

  distances[source].dist = 0;
  return distances;
};

const dijkstra = (graph, source) => {
  const nodes = Object.keys(graph);
  const distances = initDistanceFor(nodes, source);
  const remainingNodes = new Set(nodes);

  while (remainingNodes.size > 0) {
    const node = findMinNode(distances, remainingNodes);
    updateDistances(distances, graph, node);
    remainingNodes.delete(node);
  }

  return distances;
};

const findShortestPathDijkstra = (graph, source, dest) => {
  const distances = dijkstra(graph, source);

  const path = [];
  let currentNode = dest;

  while (currentNode) {
    path.unshift(currentNode);
    currentNode = distances[currentNode].parent;
  }

  return { path, dist: distances[dest].dist };
};

module.exports = {
  createAdjacencyList,
  bfs,
  findPath,
  findShortestPathDFS,
  dijkstra,
  findShortestPathDijkstra,
};
