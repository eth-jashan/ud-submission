import React, { useState } from "react";
import { getPrInfo, tweetLookup } from "../utils/githiubChecks";

const TaskCard = ({ guildName, item, points, isActive }) => {
  const getMarketingTaskStatus = async (id) => {
    setError(false);
    setTaskStatus(false);
    try {
      const res = await tweetLookup(id);
      console.log("res tweet", res);
    } catch (error) {
      setError(true);
    }
  };
  const getDevTaskStatus = async (value) => {
    setError(false);
    setTaskStatus(false);
    try {
      const info = await getPrInfo("eth-jashan", "dambo-member-repo", value);
      console.log("Condition check", info, item);
      if (!info.data.mergeable) {
        // setError(true);
      } else if (info.data.mergeable) {
        console.log(item.url, info.data.issue_url);
        // if (info.data.issue_url === item.url) {
        setTaskStatus(true);
        // } else {
        //   setError(true);
        // }
      }
    } catch (error) {
      setError(true);
    }
  };

  const getClaimXp = () => {
    console.log("claim xp", {
      podType: guildName === "marketing guild" ? 1 : 2,
      contributionData: {
        contributionTitle: item?.title,
        contributionXP: points,
      },
      xpToIncrease: 500,
    });
  };

  const [taskStatus, setTaskStatus] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        padding: "1.25rem 1rem",
        borderRadius: 12,
        background: "#F0F0F0",
        margin: "12px 0px",
      }}
    >
      <div style={{ fontFamily: "books", fontSize: 14, marginBottom: 8 }}>
        {guildName}
      </div>
      <div
        style={{
          fontFamily: "books",
          fontSize: 20,
          width: "80%",
          textAlign: "start",
          marginBottom: "24px",
        }}
      >
        {item?.title || "lorem ipsum dolor louda lassan, hello bois"}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "0px 0px 1rem 0px",
          alignItems: "center",
          borderBottom: "1px solid #E1E1E0",
        }}
      >
        <div
          style={{
            color: "#734BFF",
            textDecoration: "underline",
            fontSize: "16px",
          }}
          onClick={
            guildName === "marketing guild"
              ? () => console.log("Marketing")
              : () => window.location.replace(item?.html_url)
          }
        >
          {guildName === "marketing guild" ? "Open to tweet" : "Open Github"}
        </div>
        <div
          style={{
            padding: "4px 12px",
            background: "#E2E3E3",
            fontSize: "14px",
            borderRadius: 12,
          }}
        >
          500 points
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <input
          style={{
            width: "80%",
            fontSize: "1rem",
            marginTop: "12px",
            border: 0,
            padding: "8px",
            outline: "none",
            color: error ? "red" : "#734BFF",
          }}
          // onBlur={() => {
          //   setError(false);
          //   setTaskStatus(false);
          // }}
          onChange={(e) =>
            guildName === "marketing guild"
              ? getMarketingTaskStatus(e.target.value)
              : getDevTaskStatus(e.target.value)
          }
          placeholder={
            guildName === "marketing guild"
              ? "Enter Tweet Url"
              : "Enter Pull Number"
          }
        />

        {taskStatus && (
          <div
            style={{
              padding: "0.5rem 0.5rem",
              background: "#734BFF",
              color: "white",
              fontFamily: "books",
              fontSize: 12,
              borderRadius: "24px",
            }}
          >
            Claim Xp
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
