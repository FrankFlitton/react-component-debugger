import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import DebuggerApp from "./lib/DebuggerApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <DebuggerApp debug />
  </StrictMode>
);

// setTimeout(() => {
//   ReactDOM.createRoot(document.getElementById("debugger")!).render(
//     <React.StrictMode>
//       <DebuggerUI />
//     </React.StrictMode>
//   );
// }, 1000);
