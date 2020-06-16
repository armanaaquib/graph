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

module.exports = { createAdjacencyList, bfs, findPath, findShortestPathDFS };
