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
import { Client } from "@xmtp/xmtp-js";
import { useWeb3React } from "@web3-react/core";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, message, Input, Modal } from "antd";
import { useSelector } from "react-redux";

import crossBlack from "../../assets/Icons/cross.svg";

const antIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

export default function HomeScreen({ client }) {
  const [isLoading, setIsLoading] = useState(false);
  const [claimableCommunityLists, setClaimableCommunityLists] = useState([]);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimLoadingUuid, setClaimLoadingUuid] = useState(-1);
  const [modalOpen, setModalOpen] = useState(true);
  const [claimedTokens, setClaimedTokens] = useState([]);

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
  const [xmtpClinet, setXmtpClient] = useState(client);
  const [messageSent, setMessage] = useState("");

  const fetchClaimable = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `https://is3otkef0k.execute-api.us-east-1.amazonaws.com/Prod/graph?table=rule`
    );
    const graphsMapped = res.data?.map(async (graph, i) => {
      const isClaimable = await checkValid(
        graph?.token_id,
        graph?.bytes,
        library?.getSigner(),
        i
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
      let imgUrl;
      if (!noOfTokens) {
        try {
          const res = await axios.get(
            `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_metadata/${graph.token_id}/?&key=ckey_aae0c3dccd2942ecb297c61ff36`
          );
          imgUrl =
            res?.data?.data?.items?.[0]?.nft_data?.[0]?.external_data?.image;
        } catch (err) {
          // fetch from backend
          const res = await axios.get(
            `https://is3otkef0k.execute-api.us-east-1.amazonaws.com/Prod/auxiliary?endpoint=${graph?.metadata_uri}`
          );
          console.log("res in catxch", res?.data);
          imgUrl = res?.data?.image;
        }
      }

      console.log("noOftokens", noOfTokens);

      return {
        ...graph,
        imgUrl,
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

  const claimGraphToken = async (token_id, bytes, uuid, creator) => {
    try {
      setClaimLoading(true);
      setClaimLoadingUuid(uuid);
      const res = await claimNFT(token_id, bytes, library?.getSigner());
      console.log("res of claim nft", res);
      if (res && client) {
        const conversation = await client.conversations.newConversation(
          creator
        );
        await conversation.send(messageSent);
        setModalOpen(false);
      }
      setClaimLoading(false);
      setClaimLoadingUuid(-1);
      message.success("claimed successfully");
    } catch (err) {
      setClaimLoading(false);
      setClaimLoadingUuid(-1);
    }
  };

  const fetchClaimedTokens = async () => {
    const allTokens = await axios.get(
      `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${COVALENT_KEY}`
    );

    console.log("all tokens are", allTokens);

    const claimedTokens = allTokens?.data?.data?.items?.filter(
      (token) =>
        token?.contract_address.toLowerCase() === contractAddress.toLowerCase()
    );

    console.log("claim", claimedTokens);
    setClaimedTokens(claimedTokens);
  };

  useEffect(async () => {
    if (active) {
      // const xmtp = await Client.create(library.getSigner());
      // setXmtpClient(xmtp);
      fetchClaimable();
      fetchClaimedTokens();
    }
  }, []);

  const renderheader = () => (
    <div>
      <img
        src={crossBlack}
        onClick={() => setModalOpen(false)}
        style={{ height: "24px", width: "24px", marginBottom: "12px" }}
      />
      <div style={{ fontFamily: "bold", fontSize: "36px" }}>Message Box</div>
    </div>
  );

  const [selected, setSelected] = useState(false);

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
                      onClick={
                        () => {
                          setSelected(ele);
                          setModalOpen(true);
                        }

                        // claimGraphToken(ele?.token_id, ele?.bytes, ele?.uuid)
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

          <div className="claimed-tokens-wrapper">
            {claimedTokens?.length ? (
              <>
                <div className="claimed-tokens-title">Claimed tokens</div>
                <div className="claimed-tokens-grid-wrapper">
                  {claimedTokens?.[0]?.nft_data?.map((ele, index) => (
                    <div key={index}>
                      <img src={ele?.external_data?.image} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
      {modalOpen && (
        <div
          style={{
            height: "400px",
            width: "60%",
            padding: "24px",
            background: "white",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "20%",
            border: "1px solid #E1E1E0",
            borderRadius: "24px",
          }}
        >
          {renderheader()}
          <div
            style={{
              fontFamily: "books",
              color: "gray",
              fontSize: "1rem",
              display: "flex",
              flexDirection: "row",
              marginTop: "4px",
              textAlign: "start",
            }}
          >
            Send a notification message to know the community that you joined
            the tribe !
          </div>
          <Input.TextArea
            value={messageSent}
            rows={4}
            style={{
              fontSize: "1rem",
              padding: "12px 12px",
              borderRadius: "4px",
              border: "solid 1px #CCCCCC",
              width: "100%",
              marginTop: "12px",
            }}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message to be sent"
          />
          <div
            style={{
              fontFamily: "light",
              fontSize: 16,
              margin: "0px 0px 22px 0px",
            }}
          >
            Powered by <a href={"https://xmtp.org/"}>XMTP</a>
          </div>
          <div
            style={{
              width: "80%",
              padding: "12px",
              background: "#734BFF",
              borderRadius: "24px",
              fontFamily: "bold",
              color: "white",
              fontSize: "22px",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              alignSelf: "center",
            }}
            onClick={() => {
              // () => setModalOpen(true)
              claimGraphToken(
                selected?.token_id,
                selected?.bytes,
                selected?.uuid,
                selected?.creator
              );
            }}
          >
            Send message & Claim
            {/* {claimLoading && claimLoadingUuid === selected?.uuid ? (
              <Spin indicator={antIcon} />
            ) : (
              ""
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}
