import React, { useState } from "react";
import crossBlack from "../assets/Icons/cross.svg";
import Select, { StylesConfig } from "react-select";
import { Input } from "antd";
const ModalComponent = ({ selected, onClose, onConfirm, info }) => {
  const currentInfo = info.filter((x) => x.id === selected?.id);
  console.log("Current info", currentInfo);
  const [adapterType, setAdapterType] = useState(currentInfo[0]?.adapterType);
  const [adapterSelection, setAdapterSelection] = useState(
    currentInfo[0]?.adapterType
      ? {
          value: currentInfo[0]?.adapterType,
          label: currentInfo[0]?.adapterType,
        }
      : ""
  );
  const [contractAddress, setContractAddress] = useState(
    currentInfo[0]?.contractAddress || ""
  );
  const [threshold, setThreshold] = useState(currentInfo[0]?.threshold || "0");
  const [tokenId, setTokenId] = useState(currentInfo[0]?.tokenId || "0");
  const [operatorType, setOperatorType] = useState(
    currentInfo[0]?.operatorType || ""
  );
  const getOperatorTypeLabel = (operatorType) => {
    switch (operatorType) {
      case "gt":
        return "Greater than";
      case "lt":
        return "Less than";
      case "equals":
        return "Equals";
      case "notEquals":
        return "Not Equals";
      case "gte":
        return "Greater than equal";
      case "Less than equal":
        return "lte";
      default:
        return "";
    }
  };
  const [operatorTypeSelection, setOperatorTypeSelection] = useState(
    currentInfo[0]?.operatorType
      ? {
          value: currentInfo[0]?.operatorType,
          label: getOperatorTypeLabel(currentInfo[0]?.operatorType),
        }
      : ""
  );
  const [operator, setOperator] = useState("");
  const [operatorSelection, setOperatorSelection] = useState({
    value: currentInfo[0]?.operator,
    label: currentInfo[0]?.operator,
  });

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
        value={operatorTypeSelection}
        onChange={(x) => {
          setOperatorTypeSelection(x);
          setOperatorType(x.value);
        }}
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
        value={adapterSelection}
        onChange={(x) => {
          setAdapterSelection(x);
          setAdapterType(x.value);
        }}
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
        onChange={(x) => {
          setOperatorSelection(x);
          setOperator(x.value);
        }}
        value={operatorSelection}
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

  const lensThreshold = () => (
    <>
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
        value={operatorTypeSelection}
        onChange={(x) => {
          setOperatorTypeSelection(x);
          setOperatorType(x.value);
        }}
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

  const renderLensFormOnType = (adapterType) => {
    switch (adapterType) {
      case "LensFollowerThreshold":
        return lensThreshold();
      case "LensProfileExists":
        return false;
      case "LensPubThreshold":
        return lensThreshold();
      default:
        false;
    }
  };

  const lensFormType = () => (
    <>
      <div style={{ fontFamily: "books", fontSize: "24px", marginTop: "24px" }}>
        Choose the the type of Adapter 😅
      </div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        value={adapterSelection}
        onChange={(x) => {
          setAdapterSelection(x);
          setAdapterType(x.value);
        }}
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
          { label: "Lens Follower Threshold", value: "LensFollowerThreshold" },
          { label: "Lens Profile Exists", value: "LensProfileExists" },
          { label: "Lens Pub Threshold", value: "LensPubThreshold" },
        ]}
      />
      {renderLensFormOnType(adapterType)}
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

        {selected.family === "leaf"
          ? selected?.type === "poly"
            ? leafFormType()
            : lensFormType()
          : rootFormType()}

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
          onClick={() => {
            if (selected.type === "poly" || selected.type === "myDot") {
              onConfirm(
                adapterType
                  ? adapterType !== "ERC 1155"
                    ? {
                        id: selected.id,
                        contractAddress,
                        adapterType,
                        threshold,
                        operatorType,
                      }
                    : {
                        id: selected.id,
                        contractAddress,
                        adapterType,
                        threshold,
                        operatorType,
                        tokenId,
                      }
                  : {
                      operator,
                      id: selected.id,
                    }
              );
            } else {
              onConfirm({
                operatorType,
                id: selected.id,
                threshold,
                adapterType,
              });
            }
          }}
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
