import React, { useLayoutEffect } from "react";
import Panel from "./components/Panel";
import { getReactRoot } from "./utils/getReactRoot";
import { getReactContainer } from "./utils/getReactContainer";
import { getFibreTree } from "./utils/getFibreTree";

export const DebuggerUI: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [containers, setContainers] = React.useState<Record<string, any>[]>([]);

  const doInit = () => {
    const root = getReactRoot();
    const rContainer = getReactContainer(root) || "";
    console.log(rContainer);
    if (!rContainer) {
      setContainers([]);
      return;
    }
    const [list] = getFibreTree(rContainer);
    console.log(list);
    setContainers(list);
  };

  useLayoutEffect(() => {
    doInit();
  }, []);

  return (
    <Panel>
      <button onClick={() => doInit()}>
        Refresh
      </button>
      <ul>
        {containers &&
          containers
            .filter((c) => c.isDom)
            .map((c) => {
              return (
                <li>
                  c.type:{"\t"}
                  {c.type} —
                  {c.nodeId}
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
