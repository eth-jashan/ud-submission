import React, { useState, useEffect } from "react";
import "./style.scss";
import {
  api,
  utils,
  channels,
  NotificationItem,
} from "@epnsproject/frontend-sdk-staging";
import { MdNotifications } from "react-icons/md";

export default function DashboardHeader() {
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [fetchingNotifications, setFetchingNotifications] = useState(false);
  const [hasOptedForNotifications, setHasOptedForNotifications] =
    useState(true);

  useEffect(() => {
    fetchNotifications();
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "1rem 0rem",
        alignItems: "center",
        borderBottom: "1px solid #E1E1E0",
      }}
      className="dashboard-header-container"
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
                {notifications?.map((notif, index) => (
                  //   <NotificationItem
                  //     notificationTitle={notif.title}
                  //     notificationBody={notif.message}
                  //     cta={notif.cta}
                  //     app={notif.app}
                  //     icon={notif.icon}
                  //     image={notif.image}
                  //   />
                  <div className="notif-text" key={index}>
                    {notif.message}
                  </div>
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
}
