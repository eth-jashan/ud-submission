import React, { useState, useEffect } from "react";
import "./style.scss";
import Loader from "../Loader";
import { checkValid } from "../../utils/contractCall";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [claimableCommunityLists, setClaimableCommunityLists] = useState([]);

  const context = useWeb3React();
  const {
    // connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  const fetchClaimable = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `https://is3otkef0k.execute-api.us-east-1.amazonaws.com/Prod/graph?table=rule`
    );
    console.log("res is", res.data);
    const graphsMapped = res.data?.map(async (graph) => {
      const isClaimable = await checkValid(
        graph?.token_id,
        graph?.bytes,
        library?.getSigner()
      );
      return { ...graph, isClaimable };
    });
    const claimableGraphs = graphsMapped.filter((graph) => graph.isClaimable);
    setClaimableCommunityLists(claimableGraphs);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchClaimable();
  }, []);
  return (
    <div className="home-screen-container">
      {isLoading ? (
        <div className="home-screen-lottie-wrapper">
          <Loader />
        </div>
      ) : (
        <div className="home-screen-content-wrapper">
          <div className="community-list-wrapper">
            {claimableCommunityLists.map((ele, index) => (
              <div key={index} className="community-list-card">
                <div className="community-list-card-image"></div>
                <div className="community-list-card-content">
                  <div className="community-list-card-title">The Catalyzer</div>
                  <div className="community-list-card-description">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </div>
                  <div className="community-list-card-button">
                    {/* <img src={addWhite} alt="" /> */}
                    Claim
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
