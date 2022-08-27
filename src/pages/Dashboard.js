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
import {
  api,
  utils,
  channels,
  NotificationItem,
} from "@epnsproject/frontend-sdk-staging";
import { MdNotifications } from "react-icons/md";
import { ethers } from "ethers";

const DashboardScreen = () => {
  const [route, setRoute] = useState("home");
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [fetchingNotifications, setFetchingNotifications] = useState(false);
  const [hasOptedForNotifications, setHasOptedForNotifications] =
    useState(true);
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
    fetchNotifications();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("This will be called every 2 seconds");
      fetchNotifications();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    setFetchingNotifications(true);

    // define the variables required to make a request
    const details = await channels.getChannelByAddress(
      "0x9F6770b3146caEC6a19c4BEda08CD2FD91D40759"
    );

    //check if user is subscribed to channel
    const isSubscribed = await channels.isUserSubscribed(
      "0xefbcE49124015ba34C90Df850ac944584aa320D9",
      "0x9F6770b3146caEC6a19c4BEda08CD2FD91D40759"
    );
    if (!isSubscribed) {
      setHasOptedForNotifications(false);
    }

    console.log("details", details, isSubscribed);

    // if (!isSubscribed) {
    //   //opt into a channel
    //   channels.optIn(signer, channelAddress, chainId, userAccount, {
    //     onSuccess: () => {
    //       console.log("opted in");
    //     }, // do something after a successfull subscription, like bring up a modal or a notification
    //   });
    // }
    const walletAddress = "0xefbcE49124015ba34C90Df850ac944584aa320D9";
    const pageNumber = 1;
    const itemsPerPage = 20;

    // fetch the notifications
    const { count, results } = await api.fetchNotifications(
      walletAddress,
      itemsPerPage,
      pageNumber
    );
    console.log("results of fetching notifications", { results });

    // parse all the fetched notifications
    const parsedResponse = utils.parseApiResponse(results);
    console.log(parsedResponse);
    setNotifications(
      parsedResponse.map((ele) => ({
        ...ele,
        notification: { ...ele?.notification },
      }))
    );
    setFetchingNotifications(false);
  };

  const optInForNotification = async () => {
    const channelAddress = "0x9F6770b3146caEC6a19c4BEda08CD2FD91D40759";
    // const details = await channels.getChannelByAddress(channelAddress);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const chainId = await signer.getChainId();
    const userAccount = "0xefbcE49124015ba34C90Df850ac944584aa320D9";
    //opt into a channel
    channels.optIn(signer, channelAddress, chainId, userAccount, {
      onSuccess: () => {
        console.log("opted in");
        setHasOptedForNotifications(true);
      }, // do something after a successfull subscription, like bring up a modal or a notification
    });
  };

  const renderHeader = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "1rem 0rem",
        alignItems: "center",
        borderBottom: "1px solid #E1E1E0",
      }}
    >
      <div style={{ fontFamily: "bold", fontSize: "1rem" }}>dambo</div>
      <div
        style={{
          fontFamily: "bold",
          fontSize: "1rem",
          color: "#734BFF",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="notifications-wrapper">
          <MdNotifications onClick={() => setShowNotifs(!showNotifs)} />
          {showNotifs ? (
            <>
              <div
                className="notifications-popup-backdrop"
                onClick={() => setShowNotifs(false)}
              ></div>
              <div className="notifications-popup">
                {notifications?.map((notif) => (
                  <NotificationItem
                    notificationTitle={notif.title}
                    notificationBody={notif.message}
                    cta={notif.cta}
                    app={notif.app}
                    icon={notif.icon}
                    image={notif.image}
                  />
                ))}
                {notifications.length === 0 && (
                  <div className="notifications-text1">
                    {fetchingNotifications ? (
                      "Fetching Notifications"
                    ) : !hasOptedForNotifications ? (
                      <>
                        <div>You have not yet opted for notifications</div>
                        <button onClick={optInForNotification}>Opt In</button>
                      </>
                    ) : notifications?.length === 0 ? (
                      "No notifications yet"
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        0x3837...3948
      </div>
    </div>
  );

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
        {renderHeader()}
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
