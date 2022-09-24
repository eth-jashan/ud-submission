import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import Loader from "../Loader";

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const COVALENT_KEY = "ckey_5517541ba1564651939c1cf161d";
  const chains = [
    {
      name: "Ethereum",
      chainId: 1,
    },
    {
      name: "Polygon",
      chainId: 137,
    },
    {
      name: "Mumbai",
      chainId: 80001,
    },
  ];

  const accountAddress = useSelector((x) => x.auth.accountAddress);

  const [tokens, setTokens] = useState([]);
  const [allNfts, setAllNfts] = useState([]);

  const fetchAllNft = async (address) => {
    try {
      const tokenApis = chains.map((chain) =>
        axios.get(
          `https://api.covalenthq.com/v1/${chain.chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${COVALENT_KEY}`
        )
      );
      const res = await Promise.all(tokenApis);

      const tokensMapped = res.map((chainInfo) => {
        const data = chainInfo?.data?.data;
        const nft = data?.items.filter((x) => x.native_token !== true);
        const mergedArray = [];
        nft?.forEach((x, i) => {
          x?.nft_data?.forEach((item, index) => {
            console.log("item is", item);
            const startingLetters = item?.external_data?.image?.slice(0, 4);
            if (startingLetters === "http" || startingLetters === "data") {
              mergedArray.push(item);
            }
          });
        });
        return {
          items: mergedArray,
          chainId: data?.chain_id,
        };
      });
      setTokens(tokensMapped);
      console.log("nft", tokensMapped);
      const allNfts = tokensMapped.reduce((acc, curr) => {
        acc.push(...curr?.items);
        return acc;
      }, []);
      console.log("allNfts", allNfts);
      setAllNfts(allNfts);
    } catch (err) {
      console.error("err", err);
      return {
        success: false,
        tokens: null,
      };
    }
  };

  const fetchAllTokens = async (address) => {
    try {
      const tokenApis = chains.map((chain) =>
        axios.get(
          `https://api.covalenthq.com/v1/${chain.chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${COVALENT_KEY}`
        )
      );
      const res = await Promise.all(tokenApis);

      const tokensMapped = res.map((chainInfo) => {
        const data = chainInfo?.data?.data;
        const tokens = data?.items.filter((x) => x.native_token === true);
        return {
          items: tokens,
          chainId: data?.chain_id,
        };
      });
      setTokens(tokensMapped);
      console.log("nft", tokensMapped);
    } catch (err) {
      console.error("err", err);
      return {
        success: false,
        tokens: null,
      };
    }
  };

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
  //         <div
  //           style={{
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "flex-start",
  //             // background: "red",
  //           }}
  //         >
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
  //                 // setShowInput(true);
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
  //           <div
  //             style={{
  //               display: "flex",
  //               width: "80%",
  //               alignItems: "center",
  //               // background: "red",
  //             }}
  //           ></div>
  //         </div>
  //       </div>
  //       <img
  //         alt=""
  //         style={{ position: "absolute", bottom: 0, right: 20 }}
  //         src={damboBadge}
  //       />
  //     </div>
  //   );
  useEffect(async () => {
    setIsLoading(true);
    await fetchAllNft("0x469eA996dd8d4c779B4D7DB884B7841EcAaE5922");
    await fetchMembershipNFTMetadata(
      `0x78cc9e95447eabd06786abfa48ff36b77149e7e5`,
      3,
      80001
    );
    setIsLoading(false);
  }, []);

  const [route, setRoute] = useState("nft");
  const [activeChain, setActiveChain] = useState(1);
  const [meta, setMeta] = useState(false);
  //   const claimed = useSelector((x) => x.auth.claimed);

  const fetchMembershipNFTMetadata = async (
    contractAddress,
    tokenId,
    chainId
  ) => {
    try {
      const res = await axios.get(
        `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_metadata/${tokenId}/?quote-currency=USD&format=JSON&key=${COVALENT_KEY}`
      );
      const nftData = res?.data?.data?.items[0]?.nft_data;
      console.log("res..", nftData[0].external_data);
      if (nftData) {
        setMeta(nftData[0].external_data.image);
        //   return {
        //     success: true,
        //     metadata: nftData,
        //   };
        // } else {
        //   return {
        //     success: false,
        //     metadata: null,
        //   };
      }
    } catch (err) {
      console.error("err", err);
    }
  };

  //   const renderSnackBar = () => (
  //     <div
  //       style={{
  //         display: "flex",
  //         padding: "1rem 0rem 1rem 0rem",
  //         borderBottom: "1px solid #E1E1E0",
  //         alignItems: "center",
  //         marginTop: "12px",
  //         marginBottom: "1rem",
  //       }}
  //     >
  //       <div
  //         onClick={async () => {
  //           await fetchAllNft("0x565CBd65Cb3e65445AfD14169003A528C985e9C7");
  //           setRoute("nft");
  //         }}
  //         style={{
  //           display: "flex",
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //           fontFamily: route === "nft" ? "bolder" : "books",
  //           fontSize: "1rem",
  //           //   marginLeft: "2rem",
  //         }}
  //       >
  //         NFTs
  //       </div>
  //       <div
  //         onClick={async () => {
  //           await fetchAllTokens("0x565CBd65Cb3e65445AfD14169003A528C985e9C7");
  //           setRoute("erc");
  //         }}
  //         style={{
  //           display: "flex",
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //           fontFamily: route === "erc" ? "bolder" : "books",
  //           marginLeft: "2rem",
  //           fontSize: "1rem",
  //         }}
  //       >
  //         ERC-20s
  //       </div>
  //     </div>
  //   );
  return (
    <div className="scrollDiv profile-container">
      {/* {mintMembershipBadge()} */}
      {/* {<ClaimedNFT meta={meta} />} */}
      {/* {renderSnackBar()} */}
      {isLoading ? (
        <div className="home-screen-lottie-wrapper">
          <Loader />
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              marginTop: "1rem",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridGap: "1rem",
            }}
          >
            {allNfts.map((x, i) =>
              route === "nft" ? (
                <div className="profile-list" key={i}>
                  <img src={x?.external_data?.image} />
                </div>
              ) : (
                <div
                  style={{ border: "1px solid #E1E1E0", padding: 12 }}
                  className="profile-list"
                  key={i}
                >
                  <img src={x?.logo_url} />
                  <div style={{ fontFamily: "books", fontSize: "1rem" }}>
                    {x?.contract_name} : {parseFloat(x.balance) / 1e18}
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
