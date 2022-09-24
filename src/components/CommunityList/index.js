import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import addWhite from "../../assets/Icons/plus_colored.svg";
import axios from "axios";
import Loader from "../Loader";

const CommunityList = () => {
  const address = useSelector((x) => x.auth.accountAddress);
  const [searchText, setSearchText] = useState("");
  const [communityGraphs, setCommunityGraphs] = useState([]);

  // const communityLists = [1, 2, 3, 4, 5, 6];
  const fetchCommunityGraphs = async () => {
    const res = await axios.get(
      `https://is3otkef0k.execute-api.us-east-1.amazonaws.com/Prod/graph?table=rule`
    );
    console.log("res is", res.data);
    const graphsWithMetadata = res.data?.map(async (graph) => {
      const res = await axios.get(
        `https://api.covalenthq.com/v1/80001/tokens/0x556a57F7097f2D34a452d5E3FEa5AF379629aCA7/nft_metadata/${graph.token_id}/?&key=ckey_aae0c3dccd2942ecb297c61ff36`
      );
      console.log("asdjkclnac", res.data);
    });
    setCommunityGraphs(res.data);
  };
  useEffect(() => {
    fetchCommunityGraphs();
  }, []);

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
        {communityGraphs?.length ? (
          <>
            {communityGraphs
              ?.filter(
                (ele) =>
                  ele.name.includes(searchText) ||
                  ele.description.includes(searchText)
              )
              ?.map((ele, index) => (
                <div key={index} className="community-list-card">
                  <div className="community-list-card-image"></div>
                  <div className="community-list-card-content">
                    <div className="community-list-card-title">{ele?.name}</div>
                    <div className="community-list-card-description">
                      {ele?.description}
                    </div>
                    <div className="community-list-card-button">Check</div>
                  </div>
                </div>
              ))}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default CommunityList;
