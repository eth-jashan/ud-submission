import React from "react";
import { useSelector } from "react-redux";
const ClaimedNFT = () => {
  const address = useSelector((x) => x.auth.accountAddress);
  return (
    <div
      style={{
        width: "100%",
        marginTop: 40,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <div>
        <div style={{ fontSize: 40, fontFamily: "bolder" }}>{`${address?.slice(
          0,
          4
        )}...${address?.slice(-4)}`}</div>
        <div
          style={{
            fontSize: 40,
            fontFamily: "bolder",
            color: "#808080",
            marginBottom: "1rem",
          }}
        >
          damboDao Member
        </div>
        <div
          style={{
            fontSize: 16,
            fontFamily: "bolder",
            color: "#808080",
          }}
        >
          17th on leaderboard
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              textDecoration: "underline",
              fontSize: "1rem",
              marginTop: "2.5rem",
            }}
          >
            view on opensea
          </div>
        </div>
      </div>
      <div
        style={{
          border: "1px solid #808080",
          height: "194px",
          width: "194px",
          borderRadius: "8px",
        }}
      ></div>
    </div>
  );
};

export default ClaimedNFT;
