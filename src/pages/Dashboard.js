import React, { useEffect, useState } from "react";
import { assets } from "../constant/assets";
import damboBadge from "../assets/dambo-membership.svg";
// import styles from "./dashboard.module.css";
import { supabase } from "../utils/supabase";
import Leaderboard from "../components/Leaderboard";
import "./style.scss";
import Governance from "../components/Governance";
import { getIssuesForRepo } from "../utils/githiubChecks";
import TaskCard from "../components/TaskCard";
import DashboardHeader from "../components/DashboardHeader";

const DashboardScreen = () => {
  const [route, setRoute] = useState("home");
  async function signInWithGithub() {
    await supabase.auth.signIn(
      {
        provider: "github",
      },
      {
        redirectTo: "http://localhost:3000/twitter/fallback?",
      }
    );
  }

  const [devTask, setDevTask] = useState([]);
  const [marketingTask, setMarketingTask] = useState(["1", "2", "3", "4"]);

  useEffect(async () => {
    const issues = await getIssuesForRepo("eth-jashan", "socio-app-frontend");
    console.log(issues);
    setDevTask(issues.data);
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
        onClick={() => setRoute("leaderboard")}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: route === "leaderboard" ? "bolder" : "books",
          fontSize: "1rem",
          marginLeft: "2rem",
        }}
      >
        leaderboard
      </div>
      <div
        onClick={() => setRoute("governance")}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: route === "governance" ? "bolder" : "books",
          marginLeft: "2rem",
          fontSize: "1rem",
        }}
      >
        governance
      </div>
    </div>
  );

  const mintMembershipBadge = () => (
    <div
      style={{
        width: "100%",
        background: "#734BFF",
        padding: "2rem 1.25rem 2rem",
        borderRadius: 20,
        marginTop: 24,
        flexDirection: "row",
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            color: "white",
            fontFamily: "bolder",
            fontSize: 20,
          }}
        >
          Join damboDAO
        </div>
        <div
          style={{
            color: "white",
            fontFamily: "bolder",
            fontSize: 32,
            marginTop: 24,
          }}
        >
          Spread the news about
          <br />
          dambo to claim membership
          <br /> badge
        </div>

        <div
          style={{
            width: "30%",
            padding: "12px 16px",
            background: "white",
            marginTop: 32,
            borderRadius: "24px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => signInWithGithub()}
            style={{
              color: "#734BFF",
              fontFamily: "bold",
              fontSize: "16px",
            }}
          >
            Share Dambo on Tweeter
          </div>
          <img
            alt=""
            style={{ height: 24, width: 24 }}
            src={assets.icons.chevronRightPurple}
          />
        </div>
      </div>
      <img
        alt=""
        style={{ position: "absolute", bottom: 0, right: 20 }}
        src={damboBadge}
      />
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
          {route === "leaderboard" ? (
            <Leaderboard />
          ) : route === "governance" ? (
            <Governance />
          ) : (
            <>
              {mintMembershipBadge()}
              <div
                style={{
                  width: "100%",
                  border: "1px solid #E1E1E0",
                  margin: "12px 0px",
                }}
              />
              <div
                style={{
                  flexDirection: "row",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    width: "48%",
                  }}
                >
                  {marketingTask.map((x, i) => (
                    <TaskCard guildName={"marketing guild"} />
                  ))}
                </div>
                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    width: "48%",
                  }}
                >
                  {devTask.map((x, i) => (
                    <TaskCard guildName={"developer guild"} item={x} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
