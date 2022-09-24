import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import * as dayjs from "dayjs";
import * as relativeTimePlugin from "dayjs/plugin/relativeTime";
import { useDispatch } from "react-redux";
import ConnectScreen from "./pages/ConnectScreen";
import Graph from "./pages/Graph/Graph";
import TokenSetup from "./pages/TokenSetup";
import DashboardScreen from "./pages/Dashboard";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
// import { Web3Provider } from "@ethersproject/providers";

function App() {
  dayjs.extend(relativeTimePlugin);
  const dispatch = useDispatch();

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
