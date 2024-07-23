// LinkedListContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { TreeNode } from "../types/types";

interface TreeNodeContextProps {
  nodes: TreeNode[];
  addNode: (node: TreeNode) => void;
  removeNode: (id: string) => void;
  getNode: (id: string) => TreeNode | undefined;
  getNodeChildren: (id: string) => TreeNode[];
}

const LinkedListContext = createContext<TreeNodeContextProps | undefined>(
  undefined
);

const LinkedListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);

  const addNode = (node: TreeNode) => {
    setNodes((prevNodes) => [...prevNodes, node]);
  };

  const removeNode = (id: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.nodeId !== id));
  };

  const getNode = (id: string) => {
    return nodes.find((node) => node.nodeId === id);
  };

  const getNodeChildren = (id: string) => {
    return nodes.filter((node) => node.childIds.includes(id));
  };

  return (
    <LinkedListContext.Provider
      value={{ nodes, addNode, removeNode, getNode, getNodeChildren }}
    >
      {children}
    </LinkedListContext.Provider>
  );
};

export { LinkedListContext, LinkedListProvider };
