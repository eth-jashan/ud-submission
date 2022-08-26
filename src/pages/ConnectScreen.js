import { Row, Col, Typography } from "antd"
import React from "react"
import { useWeb3React } from "@web3-react/core"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import connectors from "../utils/connector"
import { assets } from "../constant/assets"

const ConnectScreen = () => {
    const onDiscordAuth = () => {
        window.location.replace(
            `https://discord.com/api/oauth2/authorize?client_id=950635095465795615&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Ffallback&response_type=code&scope=identify%20guilds%20guilds.members.read`
        )
    }

    const { active, account, activate, deactivate } = useWeb3React()

    const onWalletConnect = (connectorId) => {
        return async () => {
            try {
                const connector = connectors[connectorId]

                // Taken from https://github.com/NoahZinsmeister/web3-react/issues/124#issuecomment-817631654
                if (
                    connector instanceof WalletConnectConnector &&
                    connector.walletConnectProvider
                ) {
                    connector.walletConnectProvider = undefined
                }
                await activate(connector)
            } catch (error) {
                console.error(error)
            }
        }
    }
    if (active) {
        const username = JSON.parse(localStorage.getItem("username"))
        const authorization = localStorage.getItem(
            `authorization?clientID=316afdd4-8b6f-4e6c-8891-c1d22ce96112&scope=openid+wallet&username=${username.value}`
        )
        console.log(active, account, username, authorization)
    }
    async function handleDisconnect() {
        try {
            deactivate()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                background: "white",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <div>
                <div
                    style={{
                        fontFamily: "bold",
                        color: "black",
                        fontSize: "80px",
                        textAlign: "center",
                    }}
                >
                    gm gm welcome to
                </div>
                <div
                    style={{
                        fontFamily: "bold",
                        color: "black",
                        fontSize: "80px",
                        textAlign: "center",
                    }}
                >
                    our app, we make
                </div>
                <div
                    style={{
                        fontFamily: "bold",
                        color: "#734BFF",
                        fontSize: "80px",
                        textAlign: "center",
                    }}
                >
                    daoing fun
                </div>
            </div>
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
                        onClick={onWalletConnect(v)}
                        style={{
                            width: "335px",
                            marginTop: 120,
                            padding: "1rem 1.5rem",
                            background: "#734BFF",
                            display: "flex",
                            justifyContent: "space-between",
                            borderRadius: 32,
                            fontSize: 16,
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                fontFamily: "books",
                                color: "white",
                            }}
                        >
                            Connect Wallet
                        </div>
                        <img
                            style={{ height: 24, width: 24 }}
                            src={assets.icons.chevronRightWhite}
                        />
                    </div>
                ))}
                <div
                    style={{
                        width: "335px",
                        marginTop: 20,
                        padding: "1rem 1.5rem",
                        background: "#5665F3",
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: 32,
                        fontSize: 16,
                        alignItems: "center",
                    }}
                >
                    <div
                        onClick={() => onDiscordAuth()}
                        style={{
                            fontFamily: "books",
                            color: "white",
                        }}
                    >
                        Connect Discord
                    </div>
                    <img
                        style={{ height: 24, width: 24 }}
                        src={assets.icons.chevronRightWhite}
                    />
                </div>
                {/* <div
                    style={{
                        width: "335px",
                        marginTop: 20,
                        padding: "1rem 1.5rem",
                        background: "#1D9AEF",
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: 32,
                        fontSize: 16,
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "books",
                            color: "white",
                        }}
                    >
                        Connect Twitter
                    </div>
                    <img
                        style={{ height: 24, width: 24 }}
                        src={assets.icons.chevronRightWhite}
                    />
                </div> */}
            </div>
        </div>
    )
}

export default ConnectScreen
