import { DebuggerUI } from "./DebuggerUI";
import { TreeNodeProvider } from "./contexts/TreeNodeContext";

const DebuggerApp = () => {
  return (
    <TreeNodeProvider>
      <DebuggerUI />
    </TreeNodeProvider>
  );
};

export default DebuggerApp;
