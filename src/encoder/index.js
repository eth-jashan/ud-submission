import { ethers } from "ethers";

export const encodeConditions = (root) => {
  /*
   * Algorithm:
   * 1. Create an empty stack [];
   * 2. Do while stack is not empty:
   * 2.1. Pop an item from stack and add it to the 'result' array.
   * 2.2. Push 'right child' of popped item to stack.
   * 2.3. Push 'left child' of popped item to stack.
   */
  if (root == null) {
    return [];
  }

  const stack = [];
  const result = [];

  stack.push(root);

  while (stack.length > 0) {
    let current = stack.pop();
    // console.log(current);
    result.push(current.get_bytes());

    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }

  return "0x" + result.join("");
};

export class TreeNode {
  id;
  data;
  is_op;
  name;
  left = null;
  right = null;
  constructor(id, data, is_op, name) {
    this.id = id;
    this.data = data; // array of values
    this.is_op = is_op; // is operator
    this.name = name;
  }

  get_bytes() {
    return this.data.join("");
  }

  set_left(node) {
    this.left = node;
  }

  set_right(node) {
    this.right = node;
  }
}

export const getBytes4HexKeccack = (data) => {
  return ethers.utils.solidityKeccak256(["string"], [data]).slice(2, 10);
};
