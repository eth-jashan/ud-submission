import React, { useState, useEffect } from "react";
import "./style.scss";
import Loader from "../Loader";
import {
  checkValid,
  claimNFT,
  contractAddress,
  chainId,
} from "../../utils/contractCall";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";
import { useSelector } from "react-redux";

const antIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [claimableCommunityLists, setClaimableCommunityLists] = useState([]);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimLoadingUuid, setClaimLoadingUuid] = useState(-1);

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

  const address = useSelector((x) => x.auth.accountAddress);
  const COVALENT_KEY = "ckey_5517541ba1564651939c1cf161d";

  const fetchClaimable = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `https://is3otkef0k.execute-api.us-east-1.amazonaws.com/Prod/graph?table=rule`
    );
    const graphsMapped = res.data?.map(async (graph) => {
      const isClaimable = await checkValid(
        graph?.token_id,
        graph?.bytes,
        library?.getSigner()
      );
      return { ...graph, isClaimable };
    });
    const graphsMappedResolved = await Promise.all(graphsMapped);
    const claimableGraphs = graphsMappedResolved.filter(
      (graph) => graph.isClaimable
    );

    const allTokens = await axios.get(
      `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${COVALENT_KEY}`
    );

    const allNfts = allTokens?.data?.data?.items.filter(
      (x) =>
        x.type === "nft" &&
        x?.contract_address?.toLowerCase() === contractAddress?.toLowerCase()
    );

    console.log("all nfts are", allNfts);

    const claimableGraphsWithMetadata = claimableGraphs?.map(async (graph) => {
      const noOfTokens = allNfts.filter(
        (ele) => ele?.nft_data?.[0]?.token_id == graph?.token_id
      );
      let res;
      if (!noOfTokens) {
        res = await axios.get(
          `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_metadata/${graph.token_id}/?&key=ckey_aae0c3dccd2942ecb297c61ff36`
        );
      }

      console.log("noOftokens", noOfTokens);

      return {
        ...graph,
        imgUrl:
          res?.data?.data?.items?.[0]?.nft_data?.[0]?.external_data?.image,
        isClaimed: !!noOfTokens?.length,
      };
    });
    const claimableGraphsWithMetadataFulfilled = await Promise.all(
      claimableGraphsWithMetadata
    );

    const filtered = claimableGraphsWithMetadataFulfilled.filter(
      (ele) => !ele.isClaimed
    );
    console.log("graphs with metadata full", filtered);

    setClaimableCommunityLists(filtered);
    setIsLoading(false);
  };

  const claimGraphToken = async (token_id, bytes, uuid) => {
    try {
      setClaimLoading(true);
      setClaimLoadingUuid(uuid);
      const res = await claimNFT(token_id, bytes, library?.getSigner());
      console.log("res of claim nft", res);
      setClaimLoading(false);
      setClaimLoadingUuid(-1);
      message.success("claimed successfully");
    } catch (err) {
      setClaimLoading(false);
      setClaimLoadingUuid(-1);
    }
  };

  useEffect(() => {
    if (active) {
      fetchClaimable();
    }
  }, []);

  return (
    <div className="home-screen-container">
      {isLoading ? (
        <div className="home-screen-lottie-wrapper">
          <Loader />
        </div>
      ) : (
        <div className="home-screen-content-wrapper">
          {claimableCommunityLists?.length ? (
            <div className="community-list-wrapper">
              {claimableCommunityLists.map((ele, index) => (
                <div key={ele?.uuid} className="community-list-card">
                  <div className="community-list-card-image">
                    <img src={ele.imgUrl} alt="" />
                  </div>
                  <div className="community-list-card-content">
                    <div className="community-list-card-title">{ele?.name}</div>
                    <div className="community-list-card-description">
                      {ele?.description}
                    </div>
                    <div
                      className="community-list-card-button"
                      onClick={() =>
                        claimGraphToken(ele?.token_id, ele?.bytes, ele?.uuid)
                      }
                    >
                      {/* <img src={addWhite} alt="" /> */}
                      Claim
                      {claimLoading && claimLoadingUuid === ele?.uuid ? (
                        <Spin indicator={antIcon} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="nothing-left-to-claim">Nothing more to claim</div>
          )}
        </div>
      )}
    </div>
  );
}
