// linked list node of a tree
export type TreeNode = {
  nodeId: string;
  elementType: string;
  type: string;
  isDom: boolean;
  isText: boolean;
  domNode: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any; // raw js object
  debugSource:
    | {
        fileName: string;
        lineNumber: number;
        columnNumber: number;
      }
    | undefined;
  isNodeModule: boolean;
  childIds: string[];
};
