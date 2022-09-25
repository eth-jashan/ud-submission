import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import * as dayjs from "dayjs";
import * as relativeTimePlugin from "dayjs/plugin/relativeTime";
import ConnectScreen from "./pages/ConnectScreen";
import Graph from "./pages/Graph/Graph";
import TokenSetup from "./pages/TokenSetup";
import DashboardScreen from "./pages/Dashboard";
import axios from "axios";
import { setRedirectUri } from "./utils/connector";
import Loader from "./components/Loader";

function App() {
  dayjs.extend(relativeTimePlugin);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setIsLoading(true);
    const res = await axios.get(
      "https://is3otkef0k.execute-api.us-east-1.amazonaws.com/Prod/auxiliary?id=test"
    );
    console.log("res.data.data", process.env.NODE_ENV, res.data);

    // if (process.env.NODE_ENV !== "development") {
    setRedirectUri(res?.data?.uri);
    // }
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<ConnectScreen />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/setup" element={<TokenSetup />} />
            <Route path="/dashboard" element={<DashboardScreen />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
