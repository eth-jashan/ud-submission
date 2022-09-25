import { Row, Col, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import connectors from "../utils/connector";
import "./connectScreen.scss";
import { assets } from "../constant/assets";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Client } from "@xmtp/xmtp-js";
import { setUnstoppableAuth } from "../store/actions/auth-action";
import axios from "axios";

const ConnectScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
  console.log("aksmdck", active, account);
  const [xtmpClient, setXtmpClient] = useState(false);
  const [finalConnectors, setFinalConnectors] = useState({});

  const onWalletConnect = (connectorId) => {
    if (!active) {
      return async () => {
        try {
          const connector = finalConnectors[connectorId];

          // Taken from https://github.com/NoahZinsmeister/web3-react/issues/124#issuecomment-817631654
          if (
            connector instanceof WalletConnectConnector &&
            connector.walletConnectProvider
          ) {
            connector.walletConnectProvider = undefined;
          }
          await activate(connector);
        } catch (error) {
          console.error(error);
        }
      };
    }
  };
  // console.log(active, account);
  useEffect(async () => {
    if (active) {
      console.log("account address", account, chainId, library.getSigner());
      dispatch(setUnstoppableAuth(account, chainId));
      navigate("/dashboard");
      // setXtmpClient(xmtp);
    }
  }),
    [active];

  // async function handleDisconnect() {
  //   try {
  //     deactivate();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async function signInWithGithub() {
  //   await supabase.auth.signIn(
  //     {
  //       provider: "github",
  //     },
  //     {
  //       redirectTo: "http://localhost:3000/twitter/fallback?",
  //     }
  //   );
  // }

  // useEffect(async () => {
  //   if (discordCode && authorization && github) {
  //     // navigate("/dashboard");
  //   }
  // });

  console.log("connectors are", finalConnectors);

  useEffect(async () => {
    // setIsLoading(true);
    const res = await axios.get(
      "https://is3otkef0k.execute-api.us-east-1.amazonaws.com/Prod/auxiliary?id=test"
    );
    console.log("res.data.data", process.env.NODE_ENV, res.data);

    // if (process.env.NODE_ENV !== "development") {
    // setRedirectUri(res?.data?.uri);
    const connector = connectors(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : res?.data?.uri
    );
    // console.log("connector is", connector);
    setFinalConnectors(connector);
    // }
    // setIsLoading(false);
  }, []);

  return (
    <div className="connect-socials-screen-container">
      <div className="socials-screen-left">
        <div className="socials-left-header">
          <div className="project-name">DAG Token</div>
          <div className="twitter-link">twitter</div>
        </div>
        <div className="socials-gm">gm gm</div>
        <div className="socials-dao-info">
          DAGToken is first of its kind community incentivising tokens.
          Communities can create conditions, so that people can mint their
          tokens.
        </div>
      </div>
      <div className="socials-screen-right">
        <div className="socials-right-heading">Get started</div>
        <div className="social-connect-btns">
          <div></div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            {Object.keys(finalConnectors).map((v, i) => (
              <div
                key={i}
                style={{
                  width: "100%",
                  marginTop: 50,
                  padding: "1rem 1.5rem",
                  background: "#734BFF",
                  display: "flex",
                  justifyContent: "space-between",
                  borderRadius: 32,
                  fontSize: 16,
                  alignItems: "center",
                }}
                onClick={onWalletConnect(v)}
              >
                <div
                  style={{
                    fontFamily: "books",
                    color: "white",
                  }}
                >
                  {!active ? "Connect Wallet" : "Connected"}
                </div>
                {!active && (
                  <img
                    alt=""
                    style={{ height: 24, width: 24 }}
                    src={assets.icons.chevronRightWhite}
                  />
                )}
              </div>
            ))}
          </div>
          {xtmpClient && (
            <div
              style={{
                width: "100%",
                marginTop: 20,
                padding: "1rem 1.5rem",
                background: "#5665F3",
                display: "flex",
                justifyContent: "space-between",
                borderRadius: 32,
                fontSize: 16,
                alignItems: "center",
              }}
              onClick={async () => {
                const conversation =
                  await xtmpClient.conversations.newConversation(
                    "0x3F11b27F323b62B159D2642964fa27C46C841897"
                  );
                console.log(conversation);
              }}
            >
              <div
                style={{
                  fontFamily: "books",
                  color: "white",
                }}
              >
                {"Connect Discord"}
              </div>
              {
                <img
                  alt=""
                  style={{ height: 24, width: 24 }}
                  src={assets.icons.chevronRightWhite}
                />
              }
            </div>
          )}

          {/* <div
            style={{
              width: "100%",
              marginTop: 20,
              padding: "1rem 1.5rem",
              background: "black",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: 32,
              fontSize: 16,
              alignItems: "center",
            }}
            onClick={() => signInWithGithub()}
          >
            <div
              style={{
                fontFamily: "books",
                color: "white",
              }}
            >
              {github ? "Connected" : "Connect Github"}
            </div>
            {!github && (
              <img
                alt=""
                style={{ height: 24, width: 24 }}
                src={assets.icons.chevronRightWhite}
              />
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ConnectScreen;
