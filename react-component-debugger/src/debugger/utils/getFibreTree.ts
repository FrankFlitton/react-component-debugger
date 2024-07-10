// BFS against react tree
export const getFibreTree = (root: any) => {
  const queue = [root];
  const tree = [];
  while (queue.length) {
    const node = queue.shift();

    let type = "";
    if (typeof node.type === "function") {
      type =
        node.name ||
        node.type.name ||
        node.type.displayName ||
        node.type.toString() ||
        node?.constructor?.name;
    } else {
      node.type?.toString?.();
    }

    let elementType = "";
    if (typeof node.elementType !== "string") {
      elementType =
        node.elementType?.name ||
        node.elementType?.constructor?.name ||
        node.elementType?.toString?.();
    } else {
      elementType = node.elementType?.toString?.();
    }

    const debugType = node?.stateNode?._debugRootType;
    const isText = node?.stateNode?.nodeName === "#text";

    const nodeData = {
      elementType: !isText ? elementType || debugType || "null" : "string",
      type: type || "null",
      isDom: !type,
      isText,
      node,
      // key: node.key,
      // debugSource: node._debugSource,
    };

    if (
      nodeData.type !== "DebuggerUI" &&
      nodeData.elementType !== "DebuggerUI"
    ) {
      if (node.child) {
        queue.push(node.child);
      }
      if (node.sibling) {
        queue.push(node.sibling);
      }
      tree.push(nodeData);
    }
  }
  return tree;
};
