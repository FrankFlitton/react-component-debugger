import React, { useContext, useLayoutEffect } from "react";
import Panel from "./components/Panel";
import { getReactRoot } from "./utils/getReactRoot";
import { getReactContainer } from "./utils/getReactContainer";
import { getFibreTree } from "./utils/getFibreTree";
import { TreeNodeContext } from "./contexts/TreeNodeContext";
import { TreeView } from "./components/TreeView";
import { TreeNode } from "./types/types";

export const DebuggerUI: React.FC = () => {
  const { treeNodes, addNode } = useContext(TreeNodeContext);
  const [rootNode, setRootNode] = React.useState<TreeNode | undefined>(
    undefined
  );

  const doInit = () => {
    const root = getReactRoot();
    const rContainer = getReactContainer(root) || "";
    console.log(rContainer);
    if (!rContainer) {
      return;
    }
    const [list] = getFibreTree(rContainer);

    if (list.length > 0) {
      const constFirstNonCreateRoot = list.find(
        (f) =>
          f.elementType !== "createRoot()" &&
          f.elementType !== "Symbol(react.strict_mode)"
      );
      setRootNode(constFirstNonCreateRoot);
    }

    for (const node of list) {
      addNode(node);
    }
  };

  useLayoutEffect(() => {
    doInit();
  }, []);

  console.log("rootNode", rootNode);
  console.log(treeNodes);

  return (
    <Panel>
      <button onClick={() => doInit()}>Refresh</button>
      <hr />
      {rootNode && <TreeView nodeId={rootNode.nodeId} />}
      {/* <ul>
        {treeNodes &&
          treeNodes
            .filter((c) => c.isDom)
            .map((c) => {
              return (
                <li>
                  c.type:{"\t"}
                  {c.type} —{c.nodeId}
                  <pre>elementType</pre>
                  {"\t"}
                  <pre>{c.elementType}</pre>
                </li>
              );
            })}
      </ul> */}
    </Panel>
  );
};
