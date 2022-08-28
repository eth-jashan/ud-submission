import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import { api, utils, channels } from "@epnsproject/frontend-sdk-staging";
import { MdNotifications } from "react-icons/md";
import { ethers } from "ethers";

export default function DashboardHeader() {
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState([]);
  //   const [fetchingNotifications, setFetchingNotifications] = useState(false);
  const [hasOptedForNotifications, setHasOptedForNotifications] =
    useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  const lastReadNotificationsLength = useRef(0);
  const [nftData, setNftData] = useState(null);

  useEffect(() => {
    fetchNotifications(true);
    const interval = setInterval(() => {
      // console.log("This will be called every 2 seconds");
      fetchNotifications();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchMembershipNFTMetadata = async (
    contractAddress,
    tokenId,
    chainId
  ) => {
    try {
      const res = await axios.get(
        `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_metadata/${tokenId}/?quote-currency=USD&format=JSON&key=ckey_aae0c3dccd2942ecb297c61ff36`
      );

      const nftData = res?.data?.data?.items[0]?.nft_data;
      console.log("res", nftData);
      setNftData(nftData);

      //   if (nftData) {
      //     return {
      //       success: true,
      //       metadata: nftData,
      //     };
      //   } else {
      //     return {
      //       success: false,
      //       metadata: null,
      //     };
      //   }
    } catch (err) {
      console.error("err", err);
    }
  };

  const fetchNotifications = async (firstFetch = false) => {
    // setFetchingNotifications(true);

    // define the variables required to make a request
    const details = await channels.getChannelByAddress(
      "0x972C4D46cd527891ea654A2ceB37b85495179647"
    );

    //check if user is subscribed to channel
    const isSubscribed = await channels.isUserSubscribed(
      "0x10f26D2b7aB670b4F3E7d8eD24cd60152a1CAf87",
      "0x972C4D46cd527891ea654A2ceB37b85495179647"
    );
    if (!isSubscribed) {
      setHasOptedForNotifications(false);
    }

    console.log("details", details, isSubscribed);

    const walletAddress = "0x10f26D2b7aB670b4F3E7d8eD24cd60152a1CAf87";
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
    if (firstFetch) {
      lastReadNotificationsLength.current = parsedResponse?.length;
    }
    setNotifications(
      parsedResponse.map((ele) => ({
        ...ele,
        notification: { ...ele?.notification },
      }))
    );
    // setFetchingNotifications(false);
    if (lastReadNotificationsLength?.current < notifications?.length) {
      const unreadNotifications = notifications.slice(
        0,
        notifications?.length - lastReadNotificationsLength.current
      );
      unreadNotifications.forEach((notif) => {
        if (notif?.message === "membership minted") {
          console.log("token id", typeof tokenId, tokenId);
          lastReadNotificationsLength.current = notifications?.length;
          setTokenId(notif?.title);
          setShowMembershipModal(true);
          fetchMembershipNFTMetadata(
            "0xD7B74ECD61aD3a68d306094C345c587F86B3547c",
            notif?.title,
            80001
          );
        }
      });
    }
  };

  const optInForNotification = async () => {
    const channelAddress = "0x972C4D46cd527891ea654A2ceB37b85495179647";
    // const details = await channels.getChannelByAddress(channelAddress);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const chainId = await signer.getChainId();
    const userAccount = "0x10f26D2b7aB670b4F3E7d8eD24cd60152a1CAf87";
    //opt into a channel
    channels.optIn(signer, channelAddress, chainId, userAccount, {
      onSuccess: () => {
        console.log("opted in");
        setHasOptedForNotifications(true);
      }, // do something after a successfull subscription, like bring up a modal or a notification
    });
  };

  const toggleShowNotifs = () => {
    if (showNotifs) {
      console.log("updating last read notifs", notifications?.length);
      lastReadNotificationsLength.current = notifications?.length;
    }
    setShowNotifs(!showNotifs);
  };

  console.log("last read motit", lastReadNotificationsLength?.current);

  const closeMembershipModal = () => {
    setShowMembershipModal(false);
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
          <MdNotifications onClick={toggleShowNotifs} />
          {notifications?.length - lastReadNotificationsLength?.current > 0 && (
            <div className="unread-notifications-count">
              {notifications?.length - lastReadNotificationsLength?.current}
            </div>
          )}
          {showNotifs ? (
            <>
              <div
                className="notifications-popup-backdrop"
                onClick={() => {
                  lastReadNotificationsLength.current = notifications?.length;
                  setShowNotifs(false);
                }}
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
                    {!hasOptedForNotifications ? (
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
        {showMembershipModal && (
          <div
            className="membership-modal-backdrop"
            onClick={closeMembershipModal}
          >
            <div className="membership-modal-main">
              <img src={nftData?.[0]?.token_url} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
