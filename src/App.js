import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import * as dayjs from "dayjs";
import * as relativeTimePlugin from "dayjs/plugin/relativeTime";
import ConnectScreen from "./pages/ConnectScreen";
import Graph from "./pages/Graph/Graph";
import TokenSetup from "./pages/TokenSetup";
import DashboardScreen from "./pages/Dashboard";

function App() {
  dayjs.extend(relativeTimePlugin);

  return (
    <div className="App">
      <div className="App-header">
        <Routes>
          <Route path="/" element={<ConnectScreen />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/setup" element={<TokenSetup />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
