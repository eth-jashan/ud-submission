import React from "react";
import "./style.scss";

export default function Governance() {
  const governance = [
    {
      status: "Passed",
      title:
        "Discord role copy, lets see how big it needs to be, I am guessing just the heading is going to be enough",
      link: "channelLink",
      podType: "Marketing guild",
      finishTime: new Date(),
      votes: [
        {
          voteType: "yes",
          voteValue: 25,
        },
        {
          voteType: "no",
          voteValue: 12,
        },
        {
          voteType: "abstain",
          voteValue: 5,
        },
      ],
    },
    {
      status: "Fail",
      title:
        "Discord role copy, lets see how big it needs to be, I am guessing just the heading is going to be enough",
      link: "channelLink",
      podType: "Marketing guild",
      finishTime: new Date(),
      votes: [
        {
          voteType: "yes",
          voteValue: 11,
        },
        {
          voteType: "no",
          voteValue: 23,
        },
        {
          voteType: "abstain",
          voteValue: 2,
        },
      ],
    },
  ];
  const GovernanceCard = ({ governance }) => {
    const totalVotes = governance?.votes?.reduce((acc, crr) => {
      return acc + crr?.voteValue;
    }, 0);
    return (
      <div className="governance-card">
        <div className={`governance-status ${governance?.status}`}>
          {governance?.status}
        </div>
        <div className="governance-title">{governance?.title}</div>
        <div className="governance-info">
          <div className="governance-info-left">
            <div>Marketing guild</div>
            <div>20 Aug’22</div>
          </div>
          <div className="governance-info-right">
            <div className="voting-row">
              <div className="voting-row-left">
                yes <span>&bull; 23</span>
              </div>
              <div className="voting-row-right">
                <div className="voting-bar-wrapper">
                  <div
                    className="voting-bar"
                    style={{
                      width: `${
                        (governance?.votes[0]?.voteValue / totalVotes) * 100
                      }%`,
                      backgroundColor: "#1ba67280",
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="voting-row">
              <div className="voting-row-left">
                no <span>&bull; 10</span>
              </div>
              <div className="voting-row-right">
                <div className="voting-bar-wrapper">
                  <div
                    className="voting-bar"
                    style={{
                      width: `${
                        (governance?.votes[1]?.voteValue / totalVotes) * 100
                      }%`,
                      backgroundColor: "#ff797980",
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="voting-row">
              <div className="voting-row-left">
                abstain <span>&bull; 5</span>
              </div>
              <div className="voting-row-right">
                <div className="voting-bar-wrapper">
                  <div
                    className="voting-bar"
                    style={{
                      width: `${
                        (governance?.votes[2]?.voteValue / totalVotes) * 100
                      }%`,
                      backgroundColor: "#b0b0b080",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="governance-container">
      <div className="governance-header">past proposals</div>
      <div className="governance-cards-container">
        {governance.map((governance, index) => (
          <GovernanceCard governance={governance} key={index} />
        ))}
      </div>
    </div>
  );
}
