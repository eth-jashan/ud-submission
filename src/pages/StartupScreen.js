import { Row, Col, Typography } from "antd"
import React from "react"
const { Title } = Typography

const StartupScreen = () => {
    return (
        <Row
            style={{
                background: "#363B59",
                width: "100vw",
                height: "100vh",
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
            }}
        >
            <Col span={24}>
                <Title
                    style={{ fontFamily: "bolder", color: "white" }}
                    // level={1}
                >
                    Enter A
                </Title>
                <Title style={{ fontFamily: "thin", color: "white" }}>
                    Whole New
                </Title>
                <Title
                    style={{ fontFamily: "bolder", color: "white" }}
                    // level={1}
                >
                    World of Dao
                </Title>
            </Col>
            <Col span={24}>
                <div
                    style={{
                        width: "100%",
                        padding: 12,
                        background: "#BC93F9",
                        color: "white",
                        fontFamily: "monospace",
                        textAlign: "center",
                        borderRadius: 8,
                    }}
                >
                    Let's Walk In
                </div>
            </Col>
        </Row>
    )
}

export default StartupScreen
