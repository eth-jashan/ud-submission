import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import addWhite from "../../assets/Icons/plus_colored.svg";

const CommunityList = () => {
  const address = useSelector((x) => x.auth.accountAddress);
  const [searchText, setSearchText] = useState("");

  const communityLists = [1, 2, 3, 4, 5, 6];

  return (
    <div className="community-list-container">
      <div className="community-list-title">List of Graphs</div>
      <div className="community-list-search">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="search graphs"
        />
      </div>
      <div className="community-list-wrapper">
        {communityLists.map((ele, index) => (
          <div key={index} className="community-list-card">
            <div className="community-list-card-image"></div>
            <div className="community-list-card-content">
              <div className="community-list-card-title">The Catalyzer</div>
              <div className="community-list-card-description">
                Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                microdosing tousled waistcoat.
              </div>
              <div className="community-list-card-button">
                <img src={addWhite} alt="" />
                Follow
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityList;
