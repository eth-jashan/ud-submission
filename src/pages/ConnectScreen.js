import { Row, Col, Typography, message } from "antd";
import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import connectors from "../utils/connector";
import "./connectScreen.scss";
import { assets } from "../constant/assets";
import { useSelector, useDispatch } from "react-redux";
// import { setUnstoppableAuth } from "../store/actions/auth-action";
import { useNavigate } from "react-router";
// import { supabase } from "../utils/supabase";
// import axios from "axios";
// import { checkValid } from "../utils/contractCall";
// import { ethers } from "ethers";

const ConnectScreen = () => {
  // const discordCode = useSelector((x) => x.auth.discordCode);
  // const accountAddress = useSelector((x) => x.auth.accountAddress);
  // const github = useSelector((x) => x.auth.github);
  // const authorization = useSelector((x) => x.auth.authorization);
  const navigate = useNavigate();

  // const dispatch = useDispatch();
  // const onDiscordAuth = () => {
  //   if (!discordCode) {
  //     window.location.replace(
  //       `https://discord.com/api/oauth2/authorize?client_id=950635095465795615&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Ffallback&response_type=code&scope=identify%20guilds%20guilds.members.read`
  //     );
  //   }
  // };

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

  const onWalletConnect = (connectorId) => {
    if (!active) {
      return async () => {
        try {
          const connector = connectors[connectorId];

          // Taken from https://github.com/NoahZinsmeister/web3-react/issues/124#issuecomment-817631654
          if (
            connector instanceof WalletConnectConnector &&
            connector.walletConnectProvider
          ) {
            connector.walletConnectProvider = undefined;
          }
          await activate(connector);

          // // provider = new ethers.providers.Web3Provider(provider);
          // const signer = provider.getSigner();
          // await checkValid(
          //   0,
          //   "0x211efb2e4CC04A01D82135F16D8c35FE5e93c7f54679ABA0B20F972552633A1E8e9562Ce5Ad5Ec415D47909dfbdf50ae00000000000000000000000000000000000000000000000000000000000000004CC04A01D82135F16D8c35FE5e93c7f54679ABA0B20F972552633A1E8e9562Ce5Ad5Ec415D47909de22ffa0d000000000000000000000000000000000000000000000000000000000000000d",
          //   signer
          // );
        } catch (error) {
          console.error(error);
        }
      };
    }
  };
  // console.log(active, account);
  if (active) {
    console.log("account address", account, chainId, library.getSigner());
    //create user here
    navigate("/dashboard");
  }

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
            {Object.keys(connectors).map((v, i) => (
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
          {/* <div
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
            onClick={() => onDiscordAuth()}
          >
            <div
              style={{
                fontFamily: "books",
                color: "white",
              }}
            >
              {discordCode ? "Connected" : "Connect Discord"}
            </div>
            {!discordCode && (
              <img
                alt=""
                style={{ height: 24, width: 24 }}
                src={assets.icons.chevronRightWhite}
              />
            )}
          </div>

          <div
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
