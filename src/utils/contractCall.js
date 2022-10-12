import { ethers } from "ethers";
import activityTokenAbi from "../abi/damboTokens.json";

export const contractAddress = "0xD320DC06406Ffc693d96e0B2E5261314dff3054a";
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
  let res;
  try {
    res = await ActivityContract.checkValidity(
      0,
      "0x211efb2e4CC04A01D82135F16D8c35FE5e93c7f54679ABA09aDAd8d8c615feaeC15169F713F72bd820a2F9e0fbdf50ae000000000000000000000000000000000000000000000000000000000000000025508C8f6AB2990BB77B658635295387fb8637EB3683ee78a8B718665Bb730e21954D31DAe90E9010000000000000000000000000000000000000000000000000000000000000000fbdf50ae0000000000000000000000000000000000000000000000000000000000000001"
    );
    console.log(res);
  } catch (err) {
    console.log("erre is", err, bytes);
  }
  console.log("res of check valid", res);

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
