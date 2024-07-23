import { DebuggerUI } from "./DebuggerUI";
import { TreeNodeProvider } from "./contexts/TreeNodeContext";
import "./global.css";

const DebuggerApp = () => {
  return (
    <TreeNodeProvider>
      <DebuggerUI />
    </TreeNodeProvider>
  );
};

export default DebuggerApp;
