import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import DebuggerApp from "./debugger/DebuggerApp.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <DebuggerApp />
  </React.StrictMode>
);

// setTimeout(() => {
//   ReactDOM.createRoot(document.getElementById("debugger")!).render(
//     <React.StrictMode>
//       <DebuggerUI />
//     </React.StrictMode>
//   );
// }, 1000);
