// LinkedListContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { TreeNode } from "../types/types";

interface TreeNodeContextProps {
  treeNodes: TreeNode[];
  addNode: (node: TreeNode) => void;
  removeNode: (id: string) => void;
  getNode: (id: string) => TreeNode | undefined;
  getParentNode: (id: string) => TreeNode[];
}

const TreeNodeContext = createContext<TreeNodeContextProps>({
  treeNodes: [],
  addNode: () => {},
  removeNode: () => {},
  getNode: () => undefined,
  getParentNode: () => [],
});

const TreeNodeProvider: React.FC<{ debug:boolean, children: ReactNode }> = ({ debug, children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_debug] = useState<boolean>(debug);
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);

  const addNode = (node: TreeNode) => {
    const inx = treeNodes.findIndex((n) => n.nodeId === node.nodeId);
    setTreeNodes((prevNodes) => {
      const data = [...prevNodes];
      if (inx > -1) {
        data[inx] = node;
        return data;
      }
      return [...prevNodes, node];
    });
  };

  const removeNode = (id: string) => {
    setTreeNodes((prevNodes) => prevNodes.filter((node) => node.nodeId !== id));
  };

  const getNode = (id: string) => {
    return treeNodes.find((node) => node.nodeId === id);
  };

  const getParentNode = (id: string) => {
    return treeNodes.filter((node) => node.childIds.includes(id));
  };

  return (
    <TreeNodeContext.Provider
      value={{ treeNodes, addNode, removeNode, getNode, getParentNode }}
    >
      {children}
    </TreeNodeContext.Provider>
  );
};

export { TreeNodeContext, TreeNodeProvider };
