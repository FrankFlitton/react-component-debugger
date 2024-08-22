import { DebuggerUI } from "./DebuggerUI";
import { TreeNodeProvider } from "./contexts/TreeNodeContext";
import "./global.css";

export interface DebuggerAppProps {
  // TODO
  debug?: boolean;
}

const DebuggerApp = ({ debug }: DebuggerAppProps) => {
  return (
    <TreeNodeProvider debug={!!debug}>
      <DebuggerUI />
    </TreeNodeProvider>
  );
};

export default DebuggerApp;
