/*
  Example config for GraphView component
*/
import React from "react";

export const NODE_KEY = "id"; // Key used to identify nodes

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
export const EMPTY_TYPE = "empty";
export const CUSTOM_EMPTY_TYPE = "customEmpty"; // Empty node type
export const ADAPTER_TYPE = "poly";
export const MY_DOT = "myDot";
export const SKINNY_TYPE = "skinny";
export const SPECIAL_CHILD_SUBTYPE = "specialChild";
export const EMPTY_EDGE_TYPE = "emptyEdge";
export const SPECIAL_EDGE_TYPE = "specialEdge";

export const nodeTypes = [
  EMPTY_TYPE,
  CUSTOM_EMPTY_TYPE,
  // POLY_TYPE,
  // SPECIAL_TYPE,
  MY_DOT,
  SKINNY_TYPE,
];
export const edgeTypes = [EMPTY_EDGE_TYPE, SPECIAL_EDGE_TYPE];

export const nodeSubTypes = [SPECIAL_CHILD_SUBTYPE];

const EmptyNodeShape = (
  <symbol viewBox="0 0 154 154" width="154" height="154" id="emptyNode">
    <circle cx="77" cy="77" r="76" />
  </symbol>
);

const CustomEmptyShape = (
  <symbol viewBox="0 0 200 200" id="customEmpty">
    <circle cx="100" cy="100" r="50" />
    <g>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">test</div>
      </foreignObject>
    </g>
  </symbol>
);

const SpecialShape = (
  <symbol viewBox="-27 0 154 154" id="special" width="154" height="154">
    <rect transform="translate(50) rotate(45)" width="109" height="109" />
  </symbol>
);

const BalanceAdapter = (
  <symbol viewBox="0 0 100 100" id="poly">
    <circle cx="50" cy="50" r="45" />
  </symbol>
);

const OperatorShape = (
  <symbol viewBox="0 0 100 100" id="myDot">
    <circle cx="50" cy="50" r="45" />
  </symbol>
);

const LensCheck = (
  <symbol viewBox="0 0 100 100" id="skinny">
    <circle cx="50" cy="50" r="45" />
  </symbol>
);

const SpecialChildShape = (
  <symbol viewBox="0 0 154 154" id="specialChild">
    <rect
      x="2.5"
      y="0"
      width="154"
      height="154"
      fill="rgba(30, 144, 255, 0.12)"
    />
  </symbol>
);

const EmptyEdgeShape = (
  <symbol viewBox="0 0 50 50" id="emptyEdge">
    <circle cx="25" cy="25" r="8" fill="currentColor" />
  </symbol>
);

const SpecialEdgeShape = (
  <symbol viewBox="0 0 50 50" id="specialEdge">
    <rect
      transform="rotate(45)"
      x="27.5"
      y="-7.5"
      width="15"
      height="15"
      fill="currentColor"
    />
  </symbol>
);

export default {
  EdgeTypes: {
    emptyEdge: {
      shape: EmptyEdgeShape,
      shapeId: "#emptyEdge",
      typeText: "Empty",
    },
    specialEdge: {
      shape: SpecialEdgeShape,
      shapeId: "#specialEdge",
    },
  },
  NodeSubtypes: {
    specialChild: {
      shape: SpecialChildShape,
      shapeId: "#specialChild",
    },
  },
  NodeTypes: {
    // special: {
    //   shape: SpecialShape,
    //   shapeId: "#special",
    //   typeText: "Special",
    // },
    skinny: {
      shape: OperatorShape,
      shapeId: "#skinny",
      // typeText: "Operator",
    },
    poly: {
      shape: BalanceAdapter,
      shapeId: "#poly",
      // typeText: "Adapter",
    },
    myDot: {
      shape: LensCheck,
      shapeId: "#myDot",
      // typeText: "Lens",
    },
  },
};
