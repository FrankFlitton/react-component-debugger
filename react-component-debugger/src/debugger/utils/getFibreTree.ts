import { TreeNode } from "../types/types";
import { elemToSelector } from "./elementToSelector";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getReactFibreNodeInfo = (reactFibreNode: any) => {
  let type = "";
  if (typeof reactFibreNode.type === "function") {
    type =
      reactFibreNode.name ||
      reactFibreNode.type.name ||
      reactFibreNode.type.displayName ||
      reactFibreNode.type.toString() ||
      reactFibreNode?.constructor?.name;
  } else {
    reactFibreNode.type?.toString?.();
  }

  let elementType = "";
  if (typeof reactFibreNode.elementType !== "string") {
    elementType =
      reactFibreNode.elementType?.name ||
      reactFibreNode.elementType?.constructor?.name ||
      reactFibreNode.elementType?.toString?.();
  } else {
    elementType = reactFibreNode.elementType?.toString?.();
  }

  const debugType = reactFibreNode?.stateNode?._debugRootType;
  const isText = reactFibreNode?.stateNode?.nodeName === "#text";
  const domNode = reactFibreNode?.stateNode?.nodeName;

  const fileName = reactFibreNode?._debugSource?.fileName || "";
  const isNodeModule = fileName.includes("node_modules");

  const nodeId = elemToSelector(reactFibreNode.stateNode);

  const nodeData: TreeNode = {
    nodeId,
    elementType: !isText ? elementType || debugType || "null" : "string",
    type: type || "null",
    isDom: !type,
    isText,
    domNode,
    node: reactFibreNode,
    // key: node.key,
    debugSource: reactFibreNode?._debugSource,
    isNodeModule,
    childIds: [] as string[],
  };

  return nodeData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFibreTree = (root: any) => {
  const queue = [root];
  const list = [];
  const seen = new Set();

  let index = 0;
  while (queue.length) {
    const node = queue.shift();

    if (!node) {
      continue;
    }

    const nodeData = getReactFibreNodeInfo(node);
    nodeData.nodeId = nodeData.nodeId || `index-${index}`

    if (seen.has(nodeData.nodeId)) {
      continue;
    } else {
      seen.add(nodeData.nodeId);
    }

    const children = [];

    if (
      nodeData.type !== "DebuggerUI" &&
      nodeData.elementType !== "DebuggerUI"
    ) {
      if (node.sibling) {
        queue.push(node.sibling);
      }

      // scan children, makeIds
      if (node.child) {
        let child = node.child;
        while (child) {
          queue.push(child);
          children.push(child);
          child = child.sibling;
        }

        children.push(node.child);
      }

      const childrenIds = children.map((c) => elemToSelector(c.stateNode));
      nodeData.childIds = childrenIds;

      list.push(nodeData);
    }
    index += 1;
  }
  return [list];
};
