import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  chainId,
  contractAddress,
  startingBlock,
} from "../../utils/contractCall";
import { Client } from "@xmtp/xmtp-js";
import Loader from "../Loader";
import "./style.scss";
import Slideshow from "../Slideshow";
// import Slideshow from "../Slideshow";

export default function MyGraphs({ client }) {
  const [communityGraphs, setCommunityGraphs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const address = useSelector((x) => x.auth.accountAddress);
  const navigate = useNavigate();
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

  const [recievedMessage, setRecievedMessage] = useState([]);
  useEffect(async () => {
    // console.log("here", client);
    // const allConversations = await client.conversations.stream();
    // console.log("messages", allConversations);
    let messages = [];
    for (const conversation of await client.conversations.list()) {
      // All parameters are optional and can be omitted
      const opts = {
        // Only show messages from last 24 hours
        startTime: new Date(new Date().setDate(new Date().getDate() - 1)),
        endTime: new Date(),
      };
      const messagesInConversation = await conversation.messages(opts);
      messages.push(messagesInConversation);
    }
    let allMessages = [];
    messages.forEach((x) => {
      x.forEach((y) => {
        allMessages.push(y);
      });
    });
    setRecievedMessage(allMessages);
    // console.log("all messages", allMessages[0].senderAddress);
  }, []);

  const fetchCommunityGraphs = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `https://is3otkef0k.execute-api.us-east-1.amazonaws.com/Prod/graph?table=rule`
    );
    console.log("res is", res.data);
    const myGraphs = res?.data?.filter(
      (graph) => graph.creator.toLowerCase() === address.toLowerCase()
    );
    const contractEvents = await axios.get(
      `https://api.covalenthq.com/v1/${chainId}/events/address/${contractAddress}/?quote-currency=USD&format=JSON&starting-block=${startingBlock}&ending-block=latest&page-size=2000000000&key=ckey_aae0c3dccd2942ecb297c61ff36`
    );
    console.log("contract events ", contractEvents);
    const transferSingleEvents = contractEvents?.data?.data?.items.filter(
      (ele) => ele?.decoded?.name === "TransferSingle"
    );

    console.log("transfer single events", transferSingleEvents);
    const graphsWithMetadata = myGraphs?.map(async (graph) => {
      let imgUrl;
      try {
        const res = await axios.get(
          `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_metadata/${graph.token_id}/?&key=ckey_aae0c3dccd2942ecb297c61ff36`
        );
        imgUrl =
          res?.data?.data?.items?.[0]?.nft_data?.[0]?.external_data?.image;
      } catch (err) {
        const res = await axios.get(
          `https://is3otkef0k.execute-api.us-east-1.amazonaws.com/Prod/auxiliary?endpoint=${graph?.metadata_uri}`
        );
        console.log("res in catxch", res?.data);
        imgUrl = res?.data?.image;
      }
      const totalClaimed = transferSingleEvents.filter((event) => {
        return (
          event.decoded.params.find((param) => param.name === "_id")?.value ==
          graph?.token_id
        );
      });
      return {
        ...graph,
        imgUrl,
        totalClaimed,
      };
    });
    console.log("graphs with metadata", graphsWithMetadata);
    const graphsWithMetadataFulfilled = await Promise.all(graphsWithMetadata);
    console.log("graphs with metadata full", graphsWithMetadataFulfilled);

    setCommunityGraphs(graphsWithMetadataFulfilled);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCommunityGraphs();
  }, []);

  return (
    <div className="my-graphs-screen-container">
      <div
        style={{
          fontFamily: "books",
          fontSize: 18,
          margin: "22px 0px 0px 0px",
        }}
      >
        Messages from all claimed address
      </div>
      <div
        style={{
          fontFamily: "light",
          fontSize: 16,
          margin: "0px 0px 22px 0px",
        }}
      >
        Powered by <a href={"https://xmtp.org/"}>XMTP</a>
      </div>
      <Slideshow array={recievedMessage} />
      {isLoading ? (
        <div className="my-graph-screen-lottie-wrapper">
          <Loader />
        </div>
      ) : communityGraphs?.length ? (
        <>
          <div className="create-graph-wrapper">
            <button onClick={() => navigate("/graph")}>create graph</button>
          </div>
          <div className="community-list-wrapper">
            {communityGraphs?.map((ele, index) => (
              <div key={index} className="community-list-card">
                <div className="community-list-card-image">
                  <img src={ele.imgUrl} alt="" />
                </div>
                <div className="community-list-card-content">
                  <div className="community-list-card-title">{ele?.name}</div>
                  <div className="community-list-card-description">
                    {ele?.description}
                  </div>
                  <div className="community-list-claimed-info">
                    Total Claimed : {ele?.totalClaimed?.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-graphs-created">
          <div>You have not created any graphs yet</div>
          <button onClick={() => navigate("/graph")}>create graph</button>
        </div>
      )}
    </div>
  );
}
