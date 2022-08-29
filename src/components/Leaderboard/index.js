import React from "react";
import "./style.scss";

export default function Leaderboard() {
  const leaderboardRankings = [
    {
      name: "shaurya",
      Xp: 500,
    },
    {
      name: "wulfor",
      Xp: 437,
    },
    {
      name: "Jashan",
      Xp: 418,
    },
    {
      name: "Srijan",
      Xp: 400,
    },
    {
      name: "Shivam",
      Xp: 344,
    },
    {
      name: "JSON",
      Xp: 310,
    },
    {
      name: "Chacha Chaudhary",
      Xp: 220,
    },
    {
      name: "Infi",
      Xp: 190,
    },
    {
      name: "Aviral",
      Xp: 160,
    },
    {
      name: "Somesh",
      Xp: 130,
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
                <div>{rank?.name}</div>
                <div>{rank?.Xp}</div>
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
