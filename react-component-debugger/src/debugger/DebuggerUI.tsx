import React, { useLayoutEffect } from "react";
import Panel from "./components/Panel";
import { getReactRoot } from "./utils/getReactRoot";
import { getReactContainer } from "./utils/getReactContainer";
import { getFibreTree } from "./utils/getFibreTree";

export const DebuggerUI: React.FC = () => {
  const [containers, setContainers] = React.useState<Record<string, any>[]>([]);

  useLayoutEffect(() => {
    setTimeout(() => {
      const root = getReactRoot();
      const rContainer = getReactContainer(root) || "";
      console.log(rContainer);
      const tree = getFibreTree(rContainer);
      console.log(tree);
      setContainers(tree);
    }, 1000);
  }, []);
  // if (rContainer) {
  // setContainer(JSON.stringify(rContainer || "", null, "\t"));
  // }
  // }, []);

  return (
    <Panel>
      <ul>
        {containers &&
          containers
            // .filter((c) => c.isDom)
            .map((c) => {
              return (
                <li>
                  <pre>c.type</pre>
                  {"\t"}
                  <pre>{c.type}</pre>
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
