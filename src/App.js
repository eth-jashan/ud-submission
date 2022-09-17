import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import * as dayjs from "dayjs";
import * as relativeTimePlugin from "dayjs/plugin/relativeTime";
import { useDispatch } from "react-redux";
import AppContext from "./appContext";
import ConnectScreen from "./pages/ConnectScreen";
import Graph from "./pages/Graph/Graph";
import CommunityList from "./pages/CommunityList";

function App() {
  dayjs.extend(relativeTimePlugin);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div className="App-header">
        <Routes>
          <Route path="/" element={<ConnectScreen />} />
          <Route path="/list" element={<CommunityList />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
