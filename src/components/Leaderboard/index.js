import React from "react";
import "./style.scss";

export default function Leaderboard() {
  const leaderboardRankings = [
    {
      twitterUsername: "wulfor",
      points: 100,
    },
    {
      twitterUsername: "wulfor",
      points: 100,
    },
    {
      twitterUsername: "wulfor",
      points: 100,
    },
    {
      twitterUsername: "wulfor",
      points: 100,
    },
    {
      twitterUsername: "wulfor",
      points: 100,
    },
    {
      twitterUsername: "wulfor",
      points: 100,
    },
    {
      twitterUsername: "wulfor",
      points: 100,
    },
    {
      twitterUsername: "wulfor",
      points: 100,
    },
    {
      twitterUsername: "wulfor",
      points: 100,
    },
    {
      twitterUsername: "wulfor",
      points: 100,
    },
  ];
  return (
    <div className="leaderboard-screen-container">
      <div className="leaderboard-table">
        <div className="leaderboard-table-header">
          <div className="table-header-main">
            <div className="header-left">twitter username</div>
            <div className="header-right">Points</div>
          </div>
        </div>
        <div className="leaderboard-table-body">
          {leaderboardRankings.map((rank, index) => (
            <div className="ranking-row">
              <div className="ranking-index">{index + 1}</div>
              <div className="ranking-ranker-info">
                <div>{rank?.twitterUsername}</div>
                <div>{rank?.points}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="current-ranking">
        <div className="ranking-row">
          <div className="ranking-index">11</div>
          <div className="ranking-ranker-info">
            <div>Shaurya</div>
            <div>200</div>
          </div>
        </div>
      </div>
    </div>
  );
}
