import { ethers } from "ethers";
import activityTokenAbi from "../abi/damboTokens.json";

export const createGraph = async (metaHash, root, tokenId) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const walletAddress = accounts[0]; // first account in MetaMask
  const signer = provider.getSigner(walletAddress);
  const ActivityContract = new ethers.Contract(
    "0x57716a1A50473b7391e9CbadcACefB848b54b145",
    activityTokenAbi.abi,
    signer
  );
  const res = await (
    await ActivityContract.setup(tokenId, root, metaHash)
  ).wait();
  return res;
};

export const checkValid = async (tokenId, bytes, signer) => {
  console.log("asdads", tokenId, bytes, signer);
  const ActivityContract = new ethers.Contract(
    "0x57716a1A50473b7391e9CbadcACefB848b54b145",
    activityTokenAbi.abi,
    signer
  );
  const res = await ActivityContract.checkValidity(tokenId, bytes);

  return res;
};

export const claimNFT = async (tokenId, bytes) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const walletAddress = accounts[0]; // first account in MetaMask
  const signer = provider.getSigner(walletAddress);
  const ActivityContract = new ethers.Contract(
    "0x57716a1A50473b7391e9CbadcACefB848b54b145",
    activityTokenAbi.abi,
    signer
  );
  const res = await (await ActivityContract.claim(tokenId, bytes)).wait;

  return res;
};
