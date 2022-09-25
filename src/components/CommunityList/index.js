import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import addWhite from "../../assets/Icons/plus_colored.svg";
import axios from "axios";
import Loader from "../Loader";
import { chainId, contractAddress } from "../../utils/contractCall";

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
        `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_metadata/${graph.token_id}/?&key=ckey_aae0c3dccd2942ecb297c61ff36`
      );
      console.log("asdjkclnac", res.data);
      return {
        ...graph,
        imgUrl:
          res?.data?.data?.items?.[0]?.nft_data?.[0]?.external_data?.image,
      };
    });
    console.log("graphs with metadata", graphsWithMetadata);
    const graphsWithMetadataFulfilled = await Promise.all(graphsWithMetadata);
    console.log("graphs with metadata full", graphsWithMetadataFulfilled);

    setCommunityGraphs(graphsWithMetadataFulfilled);
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
      {communityGraphs?.length ? (
        <div className="community-list-wrapper">
          {communityGraphs
            ?.filter(
              (ele) =>
                ele.name.includes(searchText) ||
                ele.description.includes(searchText)
            )
            ?.map((ele, index) => (
              <div key={index} className="community-list-card">
                <div className="community-list-card-image">
                  <img src={ele.imgUrl} alt="" />
                </div>
                <div className="community-list-card-content">
                  <div className="community-list-card-title">{ele?.name}</div>
                  <div className="community-list-card-description">
                    {ele?.description}
                  </div>
                  {/* <div className="community-list-card-button">Check</div> */}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CommunityList;
