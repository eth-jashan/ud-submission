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

  if (!active) {
    console.log("in not active");
    navigate("/");
  }

  // const [route, setRoute] = useState("home");
  //   const [showInput, setShowInput] = useState(false);
  //   const [inputText, setInputText] = useState("");
  //   const dispatch = useDispatch();
  //   async function signInWithGithub() {
  //     await supabase.auth.signIn(
  //       {
  //         provider: "github",
  //       },
  //       {
  //         redirectTo: "http://localhost:3000/twitter/fallback?",
  //       }
  //     );
  //   }

  //   const [devTask, setDevTask] = useState([]);
  //   const [marketingTask, setMarketingTask] = useState(task);
  //   const address = useSelector((x) => x.auth.accountAddress);

  //   const claimed = useSelector((x) => x.auth.claimed);

  //   useEffect(async () => {
  //     const issues = await getIssuesForRepo("eth-jashan", "dambo-member-repo");

  //     const issuesOnly = issues.data.filter(
  //       (x) => x.pull_request === null || x.pull_request === undefined
  //     );
  //     console.log("Issues", issuesOnly);
  //     setDevTask(issuesOnly);
  //   }, []);

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
    </div>
  );

  //   const mintMembershipBadge = () => (
  //     <div
  //       style={{
  //         width: "100%",
  //         background: "#734BFF",
  //         padding: "2rem 1.25rem 2rem",
  //         borderRadius: 20,
  //         marginTop: 24,
  //         flexDirection: "row",
  //         position: "relative",
  //       }}
  //     >
  //       <div>
  //         <div
  //           style={{
  //             color: "white",
  //             fontFamily: "bolder",
  //             fontSize: 20,
  //           }}
  //         >
  //           Join damboDAO
  //         </div>
  //         <div
  //           style={{
  //             color: "white",
  //             fontFamily: "bolder",
  //             fontSize: 32,
  //             marginTop: 24,
  //           }}
  //         >
  //           Spread the news about
  //           <br />
  //           dambo to claim membership
  //           <br /> badge
  //         </div>
  //         {showInput ? (
  //           <div className="twitter-claim-input-row">
  //             <input
  //               placeholder="Enter the twitter id"
  //               style={{ outline: "none" }}
  //               type="text"
  //               value={inputText}
  //               onChange={(e) => setInputText(e.target.value)}
  //             />
  //             <button
  //               onClick={async () => {
  //                 const res = await tweetLookup(inputText);
  //                 if (res === "gm 🔆👀  @dambo_live") {
  //                   console.log("claim membership");
  //                   dispatch(setClaimed(true));
  //                 }
  //               }}
  //             >
  //               <IoMdCheckmark />
  //             </button>
  //             <button onClick={() => setShowInput(false)}>
  //               <IoClose />
  //             </button>
  //           </div>
  //         ) : (
  //           <div
  //             style={{
  //               width: "30%",
  //               padding: "12px 16px",
  //               background: "white",
  //               marginTop: 32,
  //               borderRadius: "24px",
  //               display: "flex",
  //               flexDirection: "row",
  //               alignItems: "center",
  //             }}
  //           >
  //             <div
  //               onClick={async () => {
  //                 setShowInput(true);
  //                 window.open(
  //                   `https://twitter.com/intent/tweet?text=gm 🔆👀  @dambo_live`
  //                 );
  //                 // await getMembership(
  //                 //   "0xD7B74ECD61aD3a68d306094C345c587F86B3547c",
  //                 //   "0x565CBd65Cb3e65445AfD14169003A528C985e9C7"
  //                 // );
  //               }}
  //               style={{
  //                 color: "#734BFF",
  //                 fontFamily: "bold",
  //                 fontSize: "16px",
  //               }}
  //             >
  //               Share Dambo on Tweeter
  //             </div>

  //             <img
  //               alt=""
  //               style={{ height: 24, width: 24 }}
  //               src={assets.icons.chevronRightPurple}
  //             />
  //           </div>
  //         )}
  //       </div>
  //       <img
  //         alt=""
  //         style={{ position: "absolute", bottom: 0, right: 20 }}
  //         src={damboBadge}
  //       />
  //     </div>
  //   );
  //   const fetchMembershipNFTMetadata = async (
  //     contractAddress,
  //     tokenId,
  //     chainId
  //   ) => {
  //     try {
  //       const res = await axios.get(
  //         `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_metadata/${tokenId}/?quote-currency=USD&format=JSON&key=${COVALENT_KEY}`
  //       );
  //       const nftData = res?.data?.data?.items[0]?.nft_data;
  //       console.log("res..", nftData[0].external_data);
  //       if (nftData) {
  //         setMeta(nftData[0].external_data.image);
  //         //   return {
  //         //     success: true,
  //         //     metadata: nftData,
  //         //   };
  //         // } else {
  //         //   return {
  //         //     success: false,
  //         //     metadata: null,
  //         //   };
  //       }
  //     } catch (err) {
  //       console.error("err", err);
  //     }
  //   };
  //   const [meta, setMeta] = useState(false);
  //   useEffect(async () => {
  //     await fetchMembershipNFTMetadata(
  //       `0x78cc9e95447eabd06786abfa48ff36b77149e7e5`,
  //       3,
  //       80001
  //     );
  //   }, [route]);

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
            <HomeScreen />
          ) : route === "list" ? (
            <CommunityList />
          ) : (
            <ProfileScreen />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
