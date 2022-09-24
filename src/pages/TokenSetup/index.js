import React, { useState } from "react";
import { Input } from "antd";
import upload from "../../assets/Icons/upload.svg";
import right_arrow from "../../assets/Icons/right_arrow_white.svg";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const TokenSetup = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(false);
  const [file, setFile] = useState(false);
  const props = {
    name: "file",
    multiple: false,
    action: false,

    onChange(info) {
      // const { status } = info.file;

      // if (status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }

      // if (status === "done") {
      //   message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === "error") {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
      console.log("Uploaded Image", info.file);
      console.log(info.file.originFileObj);
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  new Blob([info.file.originFileObj], { type: "image/jpeg" });

  const renderHeader = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "1rem 1rem",
        alignItems: "center",
        borderBottom: "1px solid #E1E1E0",
        width: "100%",
      }}
    >
      <div style={{ fontFamily: "bold", fontSize: "1rem" }}>DAGToken</div>
      <div
        style={{
          fontFamily: "bold",
          fontSize: "1rem",
          color: "#734BFF",
        }}
      >
        {`${"0x565CBd65Cb3e65445AfD14169003A528C985e9C7"?.slice(
          0,
          4
        )}...${"0x565CBd65Cb3e65445AfD14169003A528C985e9C7"?.slice(-4)}`}
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        alignItems: "center",
      }}
    >
      {renderHeader()}
      <div style={{ padding: "1rem", width: "60%" }}>
        <div
          style={{
            fontFamily: "bold",
            fontSize: 40,
            textAlign: "start",
          }}
        >
          Setup New Item
        </div>

        <div>
          <div
            style={{
              fontFamily: "books",
              color: "gray",
              fontSize: "1rem",
              display: "flex",
              flexDirection: "row",
              marginTop: "2rem",
            }}
          >
            <div style={{ color: "red" }}>* </div>
            <div> Required fields</div>
          </div>
        </div>

        <div
          style={{
            fontFamily: "bold",
            fontSize: 22,
            textAlign: "start",
            marginTop: "1.5rem",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div> Image, Video, Audio, or 3D Model</div>{" "}
          <div style={{ color: "red" }}>* </div>
        </div>

        <div
          style={{
            border: "1px dashed black",
            height: 300,
            width: 300,
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1.5rem",
          }}
        >
          {!imageUrl ? (
            <Dragger {...props}>
              <img src={upload} style={{ width: "2rem", height: "2rem" }} />
            </Dragger>
          ) : (
            <img
              src={imageUrl}
              style={{ height: "100%", width: "100%", borderRadius: 12 }}
            />
          )}
        </div>
        <div
          style={{
            fontFamily: "bold",
            fontSize: 22,
            textAlign: "start",
            marginTop: "1.5rem",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div> Name</div> <div style={{ color: "red" }}>* </div>
        </div>
        <Input
          value={name}
          style={{
            fontSize: "1rem",
            padding: "12px 12px",
            borderRadius: "4px",
            border: "solid 1px #CCCCCC",
            width: "100%",
            marginTop: "12px",
          }}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <div
          style={{
            fontFamily: "bold",
            fontSize: 22,
            textAlign: "start",
            marginTop: "1.5rem",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div> Description</div> <div style={{ color: "red" }}>* </div>
        </div>
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
          The description will be included on the item's detail page underneath
          its image. Markdown syntax is supported.
        </div>
        <Input.TextArea
          value={description}
          rows={4}
          maxLength={6}
          style={{
            fontSize: "1rem",
            padding: "12px 12px",
            borderRadius: "4px",
            border: "solid 1px #CCCCCC",
            width: "100%",
            marginTop: "12px",
          }}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <div
          style={{
            width: "80%",
            padding: "12px 18px",
            background: "black",
            borderRadius: "24px",
            display: "flex",
            alignSelf: "center",
            marginTop: 22,
            opacity: 0.5,
            justifyContent: "space-between",
          }}
          onClick={() => console.log("Submit the creation")}
        >
          <div
            style={{ fontFamily: "books", fontSize: "16px", color: "white" }}
          >
            Design Condition
          </div>
          <img src={right_arrow} style={{ height: 20, width: 20 }} />
        </div>
      </div>
    </div>
  );
};

export default TokenSetup;
