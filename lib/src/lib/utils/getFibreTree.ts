import { TreeNode } from "../types/types";
import { elemToSelector } from "./elementToSelector";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNodeId = (stateNode: any, node: any) => {
  return stateNode
    ? elemToSelector(stateNode)
    : `${node?.elementType?.$$typeof?.toString()}_${
        node?._debugSource?.lineNumber +
        node?._debugSource?.columnNumber +
        node?._debugSource?.fileName
      }+${node?.subtreeFlags}+${node?.flags}+${node?.memoizedProps ? JSON.stringify(Object.keys(node.memoizedProps)) : ""}`;
};

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
    if (elementType === "Symbol") {
      elementType = reactFibreNode.elementType.toString();
    }
  } else {
    elementType = reactFibreNode.elementType?.toString?.();
  }
  if (elementType === "Object") {
    elementType = reactFibreNode.elementType.render.displayName || reactFibreNode.elementType.render.name.toString();
  }

  const debugFirstTimeStamp = `${new Date().getTime()}_${Math.random()}`;
  const debugType = reactFibreNode?.stateNode?._debugRootType;
  const isText = reactFibreNode?.stateNode?.nodeName === "#text";
  const domNode = reactFibreNode?.stateNode?.nodeName;

  const fileName = reactFibreNode?._debugSource?.fileName || "";
  const isNodeModule = fileName.includes("node_modules");

  const nodeId = getNodeId(reactFibreNode.stateNode, reactFibreNode);

  const nodeData: TreeNode = {
    nodeId,
    debugFirstTimeStamp,
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
  console.log("getFibreTree");
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
    nodeData.nodeId = nodeData.nodeId || `index-${index}`;

    if (seen.has(nodeData.nodeId)) {
      continue;
    } else {
      seen.add(nodeData.nodeId);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nodeData.childIds = [];

    if (
      nodeData.type !== "DebuggerApp" &&
      nodeData.elementType !== "DebuggerApp"
    ) {
      // scan children, makeIds
      if (node.child) {
        let child = node.child;
        // start at a child then grab all the siblings of that child to scan next
        while (child) {
          // console.log(nodeData.nodeId, elemToSelector(child), child);
          if (child) {
            const id = getNodeId(child.stateNode, child);
            nodeData.childIds.push(id);

            if (!seen.has(child.nodeId)) {
              queue.push(child);
            }
          }
          child = child.sibling;
        }
      }

      list.push(nodeData);
      index += 1;
    }
    if (node.sibling) {
      queue.push(node.sibling);
    }
    index += 1;
  }
  return [list];
};
