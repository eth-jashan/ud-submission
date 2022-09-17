import React from "react";
import { useSelector } from "react-redux";

const CommunityList = () => {
  const address = useSelector((x) => x.auth.accountAddress);

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
      <div style={{ fontFamily: "bold", fontSize: "1rem" }}>DAGToken</div>
      <div
        style={{
          fontFamily: "bold",
          fontSize: "1rem",
          color: "#734BFF",
        }}
      >
        {`${address?.slice(0, 4)}...${address?.slice(-4)}`}
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      {renderHeader()}
    </div>
  );
};

export default CommunityList;
