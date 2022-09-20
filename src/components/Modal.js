import React, { useState } from "react";
import crossBlack from "../assets/Icons/cross.svg";
import Select, { StylesConfig } from "react-select";
import { Input } from "antd";
const ModalComponent = ({ selected, onClose, onConfirm }) => {
  const [adapterType, setAdapterType] = useState();
  const [contractAddress, setContractAddress] = useState("");
  const [threshold, setThreshold] = useState(0);
  const [tokenId, setTokenId] = useState(0);
  const [operatorType, setOperatorType] = useState("");
  const [operator, setOperator] = useState("");
  console.log("s", selected);

  const getSelectedInfo = () => {
    switch (selected.type) {
      case "poly":
        return "Balance";
      case "skinny":
        return "Lens";
      case "myDot":
        return "Operators";
    }
  };

  const renderheader = () => (
    <div>
      <img
        src={crossBlack}
        onClick={() => onClose()}
        style={{ height: "24px", width: "24px", marginBottom: "12px" }}
      />
      <div style={{ fontFamily: "bold", fontSize: "36px" }}>
        {getSelectedInfo()} Adapter Setup
      </div>
    </div>
  );

  const renderERC721andERC20Form = () => (
    <>
      <div style={{ fontFamily: "books", fontSize: "24px", marginTop: "24px" }}>
        Enter the contract address 📜
      </div>
      <Input
        value={contractAddress}
        style={{
          fontSize: "1rem",
          padding: "12px 12px",
          borderRadius: "4px",
          border: "solid 1px #CCCCCC",
          width: "100%",
          marginTop: "12px",
        }}
        onChange={(e) => setContractAddress(e.target.value)}
        placeholder="Contract Address"
      />

      <div style={{ fontFamily: "books", fontSize: "24px", marginTop: "24px" }}>
        Set the operator 🧮
      </div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        styles={{
          container: (styles) => ({
            ...styles,
            marginTop: "12px",
          }),
          placeholder: (styles) => ({
            ...styles,
            fontFamily: "books",
            fontSize: "1rem",
          }),
          option: (styles) => ({
            ...styles,
            fontFamily: "books",
            fontSize: "1rem",
          }),
        }}
        onChange={(x) => setOperatorType(x.value)}
        name="color"
        options={[
          { label: "Greater than", value: "gt" },
          { label: "Less than", value: "lt" },
          { label: "Equals", value: "equals" },
          { label: "Not Equals", value: "notEquals" },
          { label: "Greater than equal", value: "gte" },
          { label: "Less than equal", value: "lte" },
        ]}
      />

      {adapterType === "ERC 1155" && (
        <>
          <div
            style={{ fontFamily: "books", fontSize: "24px", marginTop: "24px" }}
          >
            Insert the tokenID 🪙
          </div>
          <Input
            value={tokenId}
            style={{
              fontSize: "1rem",
              padding: "12px 12px",
              borderRadius: "4px",
              border: "solid 1px #CCCCCC",
              width: "100%",
              marginTop: "12px",
            }}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Contract Address"
          />
        </>
      )}

      <div style={{ fontFamily: "books", fontSize: "24px", marginTop: "24px" }}>
        Set the threshold 💯
      </div>
      <Input
        value={threshold}
        style={{
          fontSize: "1rem",
          padding: "12px 12px",
          borderRadius: "4px",
          border: "solid 1px #CCCCCC",
          width: "100%",
          marginTop: "12px",
        }}
        onChange={(e) => setThreshold(e.target.value)}
        placeholder="Contract Address"
      />
    </>
  );

  const renderFormOnType = () => {
    switch (adapterType) {
      case "ERC 20":
        return renderERC721andERC20Form();
      case "ERC 721":
        return renderERC721andERC20Form();
      case "ERC 1155":
        return renderERC721andERC20Form();
      default:
        false;
    }
  };

  const leafFormType = () => (
    <>
      <div style={{ fontFamily: "books", fontSize: "24px", marginTop: "24px" }}>
        Choose the the type of Adapter 😅
      </div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        onChange={(x) => setAdapterType(x.value)}
        styles={{
          container: (styles) => ({
            ...styles,
            marginTop: "12px",
          }),
          placeholder: (styles) => ({
            ...styles,
            fontFamily: "books",
            fontSize: "1rem",
          }),
          option: (styles) => ({
            ...styles,
            fontFamily: "books",
            fontSize: "1rem",
          }),
        }}
        name="color"
        options={[
          { label: "ERC 1155", value: "ERC 1155" },
          { label: "ERC 721", value: "ERC 721" },
          { label: "ERC 20", value: "ERC 20" },
        ]}
      />
      {renderFormOnType(adapterType)}
    </>
  );

  const rootFormType = () => (
    <>
      <div style={{ fontFamily: "books", fontSize: "24px", marginTop: "24px" }}>
        Choose the the type of Adapter 😅
      </div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        onChange={(x) => setOperator(x.value)}
        styles={{
          container: (styles) => ({
            ...styles,
            marginTop: "12px",
          }),
          placeholder: (styles) => ({
            ...styles,
            fontFamily: "books",
            fontSize: "1rem",
          }),
          option: (styles) => ({
            ...styles,
            fontFamily: "books",
            fontSize: "1rem",
          }),
        }}
        name="color"
        options={[
          { label: "and", value: "and" },
          { label: "or", value: "or" },
          { label: "nand", value: "nand" },
        ]}
      />
    </>
  );

  return (
    <div
      style={{
        width: "100%",
        position: "absolute",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          background: "white",
          padding: "2rem",
          position: "absolute",
          height: "96%",
          bottom: 0,
          borderRadius: "24px 24px 0px 0px",
          boxShadow: "0px 0px 4px 0px #0000001F",
          overflowY: "auto",
        }}
      >
        {renderheader()}

        {selected.family === "leaf" ? leafFormType() : rootFormType()}

        <div
          style={{
            width: "80%",
            padding: 12,
            background: "black",
            borderRadius: "24px",
            display: "flex",
            alignSelf: "center",
            marginTop: 22,
          }}
          onClick={() =>
            onConfirm(
              adapterType
                ? {
                    id: selected.id,
                    contractAddress,
                    adapterType,
                    threshold,
                    operatorType,
                  }
                : {
                    operator,
                    id: selected.id,
                  }
            )
          }
        >
          <div
            style={{ fontFamily: "books", fontSize: "16px", color: "white" }}
          >
            Upload Condition
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
