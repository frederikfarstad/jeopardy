import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import SetupTeams from "./pages/SetupTeams.tsx";
import "./index.css";
import SetupGame from "./pages/SetupGame.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/teams" element={<SetupTeams />} />
        <Route path="/questions" element={<SetupGame />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
