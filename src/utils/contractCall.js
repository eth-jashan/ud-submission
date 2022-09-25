import { ethers } from "ethers";
import activityTokenAbi from "../abi/damboTokens.json";

export const contractAddress = "0x3683ee78a8B718665Bb730e21954D31DAe90E901";
export const chainId = 80001;
export const startingBlock = 28274828;

export const createGraph = async (metaHash, root, tokenId) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const walletAddress = accounts[0]; // first account in MetaMask
  const signer = provider.getSigner(walletAddress);
  const ActivityContract = new ethers.Contract(
    contractAddress,
    activityTokenAbi.abi,
    signer
  );
  const res = await (
    await ActivityContract.setup(tokenId, root, metaHash)
  ).wait();
  return res;
};

export const checkValid = async (tokenId, bytes, signer, index = 10) => {
  console.log(
    "check valid",
    tokenId,
    bytes,
    signer,
    typeof tokenId,
    typeof bytes,
    typeof signer
  );
  const ActivityContract = new ethers.Contract(
    contractAddress,
    activityTokenAbi.abi,
    signer
  );
  const res = await ActivityContract.checkValidity(index, bytes);
  console.log("res of check valid", res, index);

  return res;
};

export const claimNFT = async (tokenId, bytes, signer) => {
  console.log(
    "claim nft",
    tokenId,
    bytes,
    signer,
    typeof tokenId,
    typeof bytes
  );
  const ActivityContract = new ethers.Contract(
    contractAddress,
    activityTokenAbi.abi,
    signer
  );
  const res = await (await ActivityContract.claim(tokenId, bytes)).wait();

  return res;
};
