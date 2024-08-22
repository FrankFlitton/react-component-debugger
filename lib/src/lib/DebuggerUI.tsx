import React, { useContext, useLayoutEffect } from "react";
import Panel from "./components/Panel";
import { getReactRoot } from "./utils/getReactRoot";
import { getReactContainer } from "./utils/getReactContainer";
import { getFibreTree } from "./utils/getFibreTree";
import { TreeNodeContext } from "./contexts/TreeNodeContext";
import { TreeView } from "./components/TreeView";
import { TreeNode } from "./types/types";
import TopBar from "./components/TopBar";
import DarkModeToggle from "./components/DarkModeToggle";
import "./index.css";

export const DebuggerUI: React.FC = () => {
  const { treeNodes, addNode } = useContext(TreeNodeContext);
  const [rootNode, setRootNode] = React.useState<TreeNode | undefined>(
    undefined
  );

  const doInit = () => {
    const root = getReactRoot();
    const rContainer = getReactContainer(root) || "";
    console.log("rContainer", rContainer);
    if (!rContainer) {
      return;
    }
    const [list] = getFibreTree(rContainer);

    for (const node of list) {
      addNode(node);
    }

    if (list.length > 0) {
      // const constFirstNonCreateRoot = list.find(
      //   (f) =>
      //     f.elementType !== "createRoot()" &&
      //     f.elementType !== "Symbol(react.strict_mode)"
      // );
      const constFirstNonCreateRoot = list[0];
      setRootNode(constFirstNonCreateRoot);
    }
  };

  useLayoutEffect(() => {
    doInit();
  }, []);

  console.log("rootNode", rootNode);
  console.log("treeNodes", treeNodes);

  return (
    <Panel>
      <TopBar>
        <button onClick={() => doInit()}>Refresh</button>
        <DarkModeToggle />
      </TopBar>
      {rootNode && <TreeView nodeId={rootNode.nodeId} />}
      <br />
      <ul>
        {treeNodes &&
          treeNodes
            // .filter((c) => c.isDom)
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
      </ul>
    </Panel>
  );
};
