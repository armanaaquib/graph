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

const addEdges = (graph, edges, node, visited) => {
  const neighbors = graph[node] || [];

  for (nodeWithWeight of neighbors) {
    if (!visited.has(nodeWithWeight[0])) {
      edges.push([node, ...nodeWithWeight]);
    }
  }

  return edges;
};

const primMST = (graph) => {
  const mst = {};
  const nodes = Object.keys(graph);
  const visited = new Set();

  let edges = [];
  let node = nodes[0];

  while (nodes.length != 0) {
    visited.add(node);
    nodes.splice(nodes.indexOf(node), 1);

    if (nodes.length > 0) {
      edges = addEdges(graph, edges, node, visited);

      const minWeightEdge = edges.reduce((edge1, edge2) =>
        edge1[2] <= edge2[2] ? edge1 : edge2
      );

      const [node1, node2, weight] = minWeightEdge;
      mst[node1] = mst[node1]
        ? mst[node1].concat([[node2, weight]])
        : [[node2, weight]];

      mst[node2] = mst[node2]
        ? mst[node2].concat([[node1, weight]])
        : [[node1, weight]];

      edges.splice(edges.indexOf(minWeightEdge), 1);

      node = node2;
    }
  }

  return mst;
};

const findUnvisitedMin = (sp, remainingNodes) => {
  let minDist = Infinity;
  let minDistNode = null;

  for (node in sp) {
    if (remainingNodes.has(node) && sp[node].dist < minDist) {
      minDistNode = node;
      minDist = node.dist;
    }
  }

  return minDistNode;
};

const initSp = (graph) => {
  return Object.keys(graph).reduce((sp, node) => {
    sp[node] = { dist: Infinity, parent: null };
    return sp;
  }, {});
};

const dijkstra = (graph, source) => {
  const sp = initSp(graph);
  sp[source].dist = 0;

  const remainingNodes = new Set(Object.keys(graph));

  while (remainingNodes.size !== 0) {
    const node = findUnvisitedMin(sp, remainingNodes);
    const neighbors = graph[node] || [];

    neighbors.forEach((nodeWithDist) => {
      const [newNode, dist] = nodeWithDist;
      const newDist = sp[node].dist + dist;

      if (newDist < sp[newNode].dist) {
        sp[newNode].dist = newDist;
        sp[newNode].parent = node;
      }
    });

    remainingNodes.delete(node);
  }

  return sp;
};

const findShortestPathDijkstra = (graph, source, dest) => {
  const sp = dijkstra(graph, source);

  const path = [];

  let currentNode = dest;
  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = sp[currentNode].parent;
  }

  return { path, dist: sp[dest].dist };
};

module.exports = {
  createAdjacencyList,
  bfs,
  findPath,
  findShortestPathDFS,
  dijkstra,
  findShortestPathDijkstra,
  primMST,
};
