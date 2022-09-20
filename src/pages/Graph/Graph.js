import {
  GraphView, // required
  //  type LayoutEngineType // required to change the layoutEngineType, otherwise optional
} from "react-digraph";

import React, { useState, useRef } from "react";

// import { Grid, Paper, Select } from "@material-ui/core";

import "./Graph.css";
import {
  default as nodeConfig,
  // POLY_TYPE,
  MY_DOT,
  SKINNY_TYPE,
  ADAPTER_TYPE,
} from "./config";
import uuid from "react-uuid";
import Tree from "rc-tree";
import { ethers } from "ethers";
import { encodeConditions, getBytes4HexKeccack, TreeNode } from "../../encoder";
import ModalComponent from "../../components/Modal";
import activityTokenAbi from "../../abi/damboTokens.json";
const sample = {
  edges: [],
  nodes: [],
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GraphConfig = nodeConfig;

const NODE_KEY = "id"; // Allows D3 to correctly update DOM

export default function Graph() {
  // this is the initial value of the state
  const [nodes, setNodes] = useState(sample.nodes);
  const [edges, setEdges] = useState(sample.edges);
  const [targets, setTargets] = useState([]);
  const [source, setSources] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [operators, setOperators] = useState([]);

  const [open, setOpen] = React.useState(false);

  const myRef = useRef("someval?");

  const [selected, setSelected] = useState(null);

  const NodeTypes = GraphConfig.NodeTypes;
  const NodeSubtypes = GraphConfig.NodeSubtypes;
  const EdgeTypes = GraphConfig.EdgeTypes;

  function onCreateEdge(src, tgt) {
    const targetCount = {};
    const sourceCount = {};

    targets.forEach(
      (x) =>
        x === tgt.id && (targetCount[tgt.id] = (targetCount[tgt.id] || 0) + 1)
    );

    source.forEach(
      (x) =>
        x === src.id && (sourceCount[src.id] = (targetCount[src.id] || 0) + 1)
    );

    if (
      (src.family === "leaf" && tgt.family === "leaf") ||
      tgt.family === "leaf" ||
      targetCount[tgt.id] >= 2 ||
      sourceCount[src.id] >= 1
    ) {
      alert("Can't be connected !");
    } else {
      console.log("edge created", src, tgt);
      const newEdge = {
        source: src.id,
        target: tgt.id,
        type: "connectors",
      };
      if (src.family === "leaf") {
        if (!leaves.includes(src.id)) {
          setLeaves((prev) => [...prev, src.id]);
        }
      }
      // if(ta) {
      if (!operators.includes(tgt.id)) {
        setOperators((prev) => [...prev, tgt.id]);
      }
      // }
      setTargets((prev) => [...prev, tgt.id]);
      setSources((prev) => [...prev, src.id]);
      setEdges((prev) => [...prev, newEdge]);
    }
  }

  const getRootOfTree = () => {
    let root;
    operators.forEach((x, i) => {
      if (!source.includes(x)) {
        root = x;
      }
    });
    console.log("root for tree", root);
    if (root) {
      return root;
    }
  };

  const [tree, setTree] = useState();

  const getElementOnId = (id) => {
    const searchArray = info.filter((x) => x.id === id);
    return searchArray[0];
  };

  const createTree = () => {
    let rootNodeId = getRootOfTree();
    let calculatedId = [];
    const erc721Address = "0x249f86Fe21BaB5497D8172aCED59a5598F6526Af";
    let relationalArray = [];
    const leafIds = edges.filter(
      (x) => x.target === rootNodeId && operators.includes(x.target)
    );
    let rootNode = new TreeNode(
      rootNodeId,
      [getBytes4HexKeccack(getElementOnId(rootNodeId)?.operator)],
      true,
      getElementOnId(rootNodeId)?.operator
    );

    relationalArray.push({ parent: rootNode, children: [] });

    calculatedId.push(rootNodeId);

    leafIds.forEach((x) => {
      if (operators.includes(x.source)) {
        rootNodeId = x.source;
      } else {
        relationalArray[0].children.push(
          new TreeNode(
            x.source,
            [
              erc721Address.slice(2),
              getElementOnId(x.source)?.contractAddress.slice(2),
              getBytes4HexKeccack(getElementOnId(x.source)?.operatorType),
              ethers.utils.defaultAbiCoder
                .encode(
                  ["uint256"],
                  [parseInt(getElementOnId(x.source)?.threshold)]
                )
                .slice(2),
            ],
            false,
            "ERC721BalanceThreshold"
          )
        );
      }
    });

    operators.forEach((x, i) => {
      if (
        !calculatedId.includes(rootNodeId) &&
        calculatedId.length < operators.length
      ) {
        const leafIds = edges.filter((y) => y.target === rootNodeId);
        calculatedId.push(rootNodeId);
        relationalArray.push({
          parent: new TreeNode(
            rootNodeId,
            [getElementOnId(rootNodeId)?.operator],
            true,
            getElementOnId(rootNodeId)?.operator
          ),
          children: [],
        });

        leafIds.forEach((x) => {
          if (operators.includes(x.source)) {
            relationalArray[i + 1].children.push(
              new TreeNode(
                x.source,
                [getElementOnId(x.source)?.operator],
                true,
                getElementOnId(x?.source)?.operator
              )
            );
            rootNodeId = x.source;
          } else {
            relationalArray[i + 1].children.push(
              new TreeNode(
                x.source,
                [
                  erc721Address.slice(2),
                  getElementOnId(x.source)?.contractAddress.slice(2),
                  getBytes4HexKeccack(getElementOnId(x.source)?.operatorType),
                  ethers.utils.defaultAbiCoder
                    .encode(["uint256"], [getElementOnId(x?.source)?.threshold])
                    .slice(2),
                ],
                false,
                "ERC721BalanceThreshold"
              )
            );
          }
          console.log("function", rootNodeId, rootNode);
        });
      }
    });

    let rootNodes;
    relationalArray
      .slice()
      .reverse()
      .forEach(function (item, i) {
        if (i === 0) {
          const root = item.parent;
          root.set_left(item.children[0]);
          root.set_right(item.children[1]);
          console.log(root, item);
          setTree(root);
          rootNodes = root;
        } else if (i === relationalArray.length - 1) {
          console.log("item last", item);
          const topTree = item.parent;
          topTree.set_left(item.children[0]);
          topTree.set_right(rootNode);
          setTree(topTree);
        } else {
          const newParent = item;
          newParent.children.forEach((x) => {
            console.log(x);
            if (x.id !== rootNode.id) {
              newParent.parent.set_left(rootNode);
              newParent.parent.set_right(x);
            }
          });
          rootNode = newParent.parent;
        }
      });
  };

  const getTitle = (title) => {
    switch (title) {
      case "poly":
        return "Balance";
      case "skinny":
        return "Lens";
      case "myDot":
        return "operator";
    }
  };

  const getType = (title) => {
    switch (title) {
      case "poly":
        return "leaf";
      case "skinny":
        return "leaf";
      case "myDot":
        return "operator";
    }
  };

  function onCreateNode(nodeType) {
    const title = getTitle(nodeType);
    const x = 0;
    const y = 300;
    var type = nodeType;
    console.log(nodeType);
    const viewNode = {
      id: uuid(),
      title,
      type,
      family: getType(nodeType),
      x,
      y,
    };
    setNodes((prev) => [...prev, viewNode]);
  }

  function onCreateNodeClick(x, y) {
    const type = "poly";
    const title = "New Node";
    const viewNode = {
      id: Date.now(),
      title,
      type,
      x,
      y,
    };
    console.log("create node");
    setNodes((prev) => [...prev, viewNode]);
  }

  function onUpdateNode(viewNode) {
    console.log("on update node");
    console.log(viewNode);
    onSelectNode(viewNode);
    var i, index;
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].id === viewNode.id) index = i;
    }

    var mycopy = nodes;
    mycopy[index] = viewNode;
    setNodes(mycopy);
  }

  const [info, setInfo] = useState([]);

  const addInfo = (data) => {
    const check = info.filter((x) => x.id === data.id);
    if (check.length > 0) {
      const newCheck = info.filter((x) => x.id !== data.id);
      newCheck.push(data);
      setInfo(newCheck);
    } else {
      setInfo((prev) => [...prev, data]);
    }
    setSelected(false);
    setOpen(false);
  };
  console.log("id to input mapping!", info, tree);
  function onSelectNode(viewNode, event) {
    if (viewNode) {
      console.log("on select node");
      console.log(viewNode);
      console.log(event);
      console.log(edges);
      setOpen(true);
      // Deselect events will send Null viewNode
      setSelected(viewNode);
    }
  }

  function onDeleteNode(viewNode, nodeId, nodeArr) {
    console.log("on delete node");
    console.log(viewNode);
    // Delete any connected edges
    const newEdges = edges.filter((edge, i) => {
      return edge.source !== viewNode.id && edge.target !== viewNode.id;
    });

    console.log("new edges");
    console.log(newEdges);

    // graph.nodes = nodeArr;

    var newNodes = nodes.filter((node, i) => {
      return node.id !== viewNode.id;
    });

    setEdges(newEdges);
    setNodes(newNodes);
  }

  function onSelectEdge(viewEdge) {
    console.log("on select edge");
    // Deselect events will send Null viewNode
    setSelected(viewEdge);
  }

  function onSwapEdge(sourceViewNode, targetViewNode, viewEdge) {
    var i, index;
    console.log(viewEdge);
    for (i = 0; i < edges.length; i++) {
      if (
        edges[i].source === viewEdge.source &&
        edges[i].target === viewEdge.target
      )
        index = i;
    }

    const edge = {
      source: sourceViewNode.id,
      target: targetViewNode.id,
      handleText: viewEdge.handleText,
      type: viewEdge.type,
    };

    //edge.source = sourceViewNode;
    //edge.target = targetViewNode;
    console.log(sourceViewNode);
    console.log(targetViewNode);
    var mycopy = edges;

    mycopy[index] = edge;
    console.log(index);

    // reassign the array reference if you want the graph to re-render a swapped edge

    setEdges(mycopy);
  }

  function onDeleteEdge(e, ed) {
    console.log("on delete edge");
    var i, index;
    for (i = 0; i < edges.length; i++) {
      if (edges[i].source === e.source && edges[i].target === e.target)
        index = i;
    }
    console.log(e);

    var mycopy = edges;
    mycopy.splice(index, 1);
    setEdges(mycopy);
    // implement find index by id first
  }

  return (
    <div
      id="graph"
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <br />
      <div>
        <div>
          <div style={{ margin: "12px" }}>
            <button
              className="NodeButton"
              onClick={() => onCreateNode(ADAPTER_TYPE)}
            >
              ERC 721
            </button>
            <button
              className="NodeButton"
              onClick={() => onCreateNode(SKINNY_TYPE)}
            >
              Lens Protocol
            </button>
            <button className="NodeButton" onClick={() => onCreateNode(MY_DOT)}>
              Operator
            </button>
            <button className="NodeButton" onClick={() => createTree()}>
              Check tree
            </button>
            <button
              className="NodeButton"
              onClick={async () => {
                const root = encodeConditions(tree);
                console.log("tree", root);
                if (root) {
                  // run activity token function !!!!
                  const ethereum = window.ethereum;
                  const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                  });
                  console.log("accounts!!!", accounts);
                  const provider = new ethers.providers.Web3Provider(ethereum);
                  const walletAddress = accounts[0]; // first account in MetaMask
                  const signer = provider.getSigner(walletAddress);
                  const USDTContract = new ethers.Contract(
                    "0x8B5107218F962F8CEceA33d835feE4AE85a17b79",
                    activityTokenAbi.abi,
                    signer
                  );
                  const res = await (await USDTContract.setup(0, root)).wait();
                  console.log("ress", res);
                }
              }}
            >
              Create Bytes
            </button>
          </div>
        </div>

        <div>
          <div
            style={{
              height: "70vh",
              width: "86vw",
              backgroundColor: "black",
            }}
          >
            <GraphView
              ref={myRef}
              nodeKey={NODE_KEY}
              nodes={nodes}
              edges={edges}
              selected={selected}
              nodeTypes={NodeTypes}
              nodeSubtypes={NodeSubtypes}
              edgeTypes={EdgeTypes}
              allowMultiselect={true}
              onCreateNode={(x, y) => onCreateNodeClick(x, y)}
              onUpdateNode={(node) => onUpdateNode(node)}
              onSwapNode={() => console.log("firedddd")}
              onDeleteNode={(viewNode, nodeId, nodeArr) =>
                onDeleteNode(viewNode, nodeId, nodeArr)
              }
              onCreateEdge={(src, tgt) => onCreateEdge(src, tgt)}
              onSwapEdge={(src, tgt, view) => onSwapEdge(src, tgt, view)}
              onDeleteEdge={(e, edges) => onDeleteEdge(e, edges)}
              // onSelectNode={(node, e) => onSelectNode(node, e)}
              onSelectEdge={(edge) => onSelectEdge(edge)}
            />
          </div>
        </div>
      </div>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ></Modal> */}
      {open && selected && (
        <ModalComponent
          onClose={() => {
            setSelected(false);
            setOpen(false);
          }}
          onConfirm={(id, data) => addInfo(id, data)}
          selected={selected}
        />
      )}
    </div>
  );
}
