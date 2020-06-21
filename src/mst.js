const addEdges = (edges, graph, node) => {
  const neighbors = graph[node] || [];

  neighbors.forEach((nodeWeight) => {
    edges.push([node, ...nodeWeight]);
  });
};

const findMinEdge = (edges, remainingNodes) => {
  let minEdge = [null, null, Infinity];

  for (const edge of edges) {
    if (remainingNodes.has(edge[1]) && edge[2] < minEdge[2]) {
      minEdge = edge;
    }
  }

  return minEdge;
};

const primMST = (graph) => {
  const mst = {};

  const nodes = Object.keys(graph);
  const remainingNodes = new Set(nodes.slice(1));

  let node = nodes[0];
  const edges = [];

  while (remainingNodes.size > 0) {
    addEdges(edges, graph, node);

    const minWeightEdge = findMinEdge(edges, remainingNodes);
    const [node1, node2, weight] = minWeightEdge;

    mst[node1] = mst[node1] || [];
    mst[node1].push([node2, weight]);

    mst[node2] = mst[node2] || [];
    mst[node2].push([node1, weight]);

    node = node2;
    remainingNodes.delete(node);
  }

  return mst;
};

const find = (set, node) => {
  if (node === set[node].parent) {
    return node;
  }

  return find(set, set[node].parent);
};

const union = (set, node1Root, node2Root) => {
  if (set[node1Root].rank < set[node2Root].rank) {
    set[node2Root].parent = node1Root;
  } else if (set[node2Root].rank < set[node1Root].rank) {
    set[node1Root].parent = node2Root;
  } else {
    set[node2Root].parent = node1Root;
    set[node1Root].rank += 1;
  }
};

const makeSet = (edges) => {
  return edges.reduce((set, edge) => {
    const [node1, node2] = edge;

    set[node1] = { parent: node1, rank: 0 };
    set[node2] = { parent: node2, rank: 0 };

    return set;
  }, {});
};

const kruskalMST = (pairs) => {
  const set = makeSet(pairs);
  const edges = pairs.sort((edge1, edge2) => edge1[2] - edge2[2]);
  const mstEdges = [];

  const noOfNodes = Object.keys(set).length;

  while (mstEdges.length !== noOfNodes - 1) {
    const edge = edges.shift();
    const [node1, node2] = edge;

    const node1Root = find(set, node1);
    const node2Root = find(set, node2);

    if (node1Root !== node2Root) {
      mstEdges.push(edge);
      union(set, node1Root, node2Root);
    }
  }

  return mstEdges;
};

module.exports = { primMST, kruskalMST };
