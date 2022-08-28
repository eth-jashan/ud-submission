import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import damboBadge from "../assets/dambo-membership.svg";
import { assets } from "../constant/assets";
import ClaimedNFT from "./ClaimedNFT";
import "./style.scss";
const ProfileScreen = () => {
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
        nft.forEach((x, i) => {
          x?.nft_data.forEach((item, index) => {
            mergedArray.push(item);
          });
        });
        return {
          items: mergedArray,
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
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            // background: "red",
          }}
        >
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
          <div
            style={{
              display: "flex",
              width: "80%",
              alignItems: "center",
              // background: "red",
            }}
          ></div>
        </div>
      </div>
      <img
        alt=""
        style={{ position: "absolute", bottom: 0, right: 20 }}
        src={damboBadge}
      />
    </div>
  );
  useEffect(async () => {
    await fetchAllNft(accountAddress);
  }, []);

  const [route, setRoute] = useState("nft");
  const [activeChain, setActiveChain] = useState(1);

  const renderSnackBar = () => (
    <div
      style={{
        display: "flex",
        padding: "1rem 0rem 1rem 0rem",
        borderBottom: "1px solid #E1E1E0",
        alignItems: "center",
        marginTop: "12px",
        marginBottom: "1rem",
      }}
    >
      <div
        onClick={async () => {
          await fetchAllNft("0x565CBd65Cb3e65445AfD14169003A528C985e9C7");
          setRoute("nft");
        }}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: route === "nft" ? "bolder" : "books",
          fontSize: "1rem",
          //   marginLeft: "2rem",
        }}
      >
        NFTs
      </div>
      <div
        onClick={async () => {
          await fetchAllTokens("0x565CBd65Cb3e65445AfD14169003A528C985e9C7");
          setRoute("erc");
        }}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: route === "erc" ? "bolder" : "books",
          marginLeft: "2rem",
          fontSize: "1rem",
        }}
      >
        ERC-20s
      </div>
    </div>
  );
  return (
    <div className="scrollDiv">
      {/* {mintMembershipBadge()} */}
      <ClaimedNFT />
      {renderSnackBar()}
      <div style={{ display: "flex", flexDirection: "row" }}>
        {chains.map((x, i) => (
          <div
            onClick={() => setActiveChain(i)}
            style={{
              padding: "8px 12px",
              borderRadius: 20,
              background: i === activeChain ? "#734BFF" : "white",
              border: i !== activeChain && "1px solid #734BFF",
              marginLeft: i !== 0 && "12px",
              marginTop: "12px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                fontFamily: "books",
                fontSize: "1rem",
                color: i !== activeChain ? "#734BFF" : "white",
              }}
            >
              {x.name}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        {tokens[activeChain]?.items.map((x, i) =>
          route === "nft" ? (
            <div className="profile-list">
              <img src={x?.external_data?.image} />
            </div>
          ) : (
            <div
              style={{ border: "1px solid #E1E1E0", padding: 12 }}
              className="profile-list"
            >
              <img src={x?.logo_url} />
              <div style={{ fontFamily: "books", fontSize: "1rem" }}>
                {x?.contract_name} : {parseFloat(x.balance) / 1e18}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
