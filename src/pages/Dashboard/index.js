import React, { useEffect, useState } from "react";
// import { assets } from "../constant/assets";
// import damboBadge from "../assets/dambo-membership.svg";
// import { supabase } from "../utils/supabase";
// import Leaderboard from "../components/Leaderboard";
import "./style.scss";
// import Governance from "../components/Governance";
// import { getIssuesForRepo, tweetLookup } from "../utils/githiubChecks";
// import TaskCard from "../components/TaskCard";
// import { Modal } from "antd";
// import ProfileScreen from "./ProfileScreen";
// import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "../../components/DashboardHeader";
// import { IoClose } from "react-icons/io5";
// import { IoMdCheckmark } from "react-icons/io";
// import { task } from "../utils/task";
// import { setClaimed } from "../store/actions/auth-action";
// import ClaimedNFT from "./ClaimedNFT";
// import axios from "axios";
import HomeScreen from "../../components/HomeScreen";
import CommunityList from "../../components/CommunityList";
import ProfileScreen from "../../components/ProfileScreen";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router";
import MyGraphs from "../../components/MyGraphsScreen";

import { Client } from "@xmtp/xmtp-js";
const DashboardScreen = () => {
  const [route, setRoute] = useState("home");
  const COVALENT_KEY = "ckey_5517541ba1564651939c1cf161d";
  const navigate = useNavigate();

  const context = useWeb3React();
  const {
    // connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  console.log("sadsdza", active, account);
  const [client, setClient] = useState();

  useEffect(async () => {
    if (!active || !library?.getSigner()) {
      console.log("in not active");
      navigate("/");
    } else {
      const xmtp = await Client.create(library.getSigner());
      setClient(xmtp);
    }
  }, []);

  const renderSnackBar = () => (
    <div
      style={{
        display: "flex",
        padding: "1rem 0rem 1rem 0rem",
        borderBottom: "1px solid #E1E1E0",
        alignItems: "center",
      }}
    >
      <div
        onClick={() => setRoute("home")}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: route === "home" ? "bolder" : "books",
          fontSize: "1rem",
        }}
      >
        home
      </div>
      <div
        onClick={() => setRoute("list")}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: route === "list" ? "bolder" : "books",
          fontSize: "1rem",
          marginLeft: "2rem",
        }}
      >
        list
      </div>
      <div
        onClick={() => setRoute("profile")}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: route === "profile" ? "bolder" : "books",
          fontSize: "1rem",
          marginLeft: "2rem",
        }}
      >
        profile
      </div>
      <div
        onClick={() => setRoute("graphs")}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: route === "graphs" ? "bolder" : "books",
          fontSize: "1rem",
          marginLeft: "2rem",
        }}
      >
        my graphs
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "white",
        display: "flex",
        flexDirection: "column",
      }}
      className="dashboard-container"
    >
      <div className="dashboard-main">
        <DashboardHeader />
        {renderSnackBar()}
        <div className="scrollDiv">
          {route === "home" ? (
            <HomeScreen client={client} />
          ) : route === "list" ? (
            <CommunityList />
          ) : route === "profile" ? (
            <ProfileScreen />
          ) : (
            <MyGraphs client={client} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
