import Web3 from "web3";
import Provider from "@truffle/hdwallet-provider";
import deployerAbi from "../abi/deployer.json";
import implementationAbi from "../abi/damboTokens.json";
import {
  proposalNFTMetadata,
  saveAsJSONToIPFS,
  appendContribution,
} from "./ipfs.js";

COVALENT_KEY = "ckey_aae0c3dccd2942ecb297c61ff36";
WEB3_STORAGE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA5NDg2MjA3NDAxMjJDOTFkZWNlNzUwRDFEMDhFM0ZFOEUwMDQ1MDEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEyODExMjU4MTEsIm5hbWUiOiJ3ZWIzLXRlc3QifQ.Ja5fln0-MAU2H4dmNuq2i3RQ-VXzKpl9RH-By2bcvkw";
LOCAL_ACCOUNT_ADDRESS = "0x972C4D46cd527891ea654A2ceB37b85495179647";
LOCAL_ACCOUNT_PRIVATE_KEY =
  "593eb294091810b22c9190d3830587065062f7879d599d7325f0965b543082ef";
ALCHEMY_RPC_URL =
  "https://polygon-mumbai.g.alchemy.com/v2/w3P5g5S0SLQvDPksCjziSXMK-EJKiJMm";

const provider = new Provider(LOCAL_ACCOUNT_PRIVATE_KEY, ALCHEMY_RPC_URL);
const web3 = new Web3(provider);

const upgradableBeaconAddress = "0x5AC7DCe710Dd33AEE29c0696Fdc2887193c96524";
const deployerContractAddress = "0xA4e5297A5177a62Fd4997D0DD14863d5461cE30D";

const deployerContractABI = deployerAbi.abi;
const implementationContractABI = implementationAbi.abi;

const deployerContract = new web3.eth.Contract(
  deployerContractABI,
  deployerContractAddress
);

// ---------------------------------------- DEPLOYER CONTRACT FUNCTIONS ------------------------------------------------
let deployedContractAddress = "0xD7B74ECD61aD3a68d306094C345c587F86B3547c";
const deployedContractInstance = new web3.eth.Contract(
  implementationContractABI,
  deployedContractAddress
);

export const deployDao = (
  communityName,
  communitySymbol,
  guildId,
  interaction,
  followUp
) => {
  try {
    deployerContract.methods
      .deployCommunity(upgradableBeaconAddress, communityName, communitySymbol)
      .send({
        from: LOCAL_ACCOUNT_ADDRESS,
      })
      .on("receipt", function (receipt) {
        // receipt example
        console.log("receipt is", receipt?.events?.DaoDeployed);
        console.log(
          "--------------------------contract address    ",
          receipt?.events?.DaoDeployed?.returnValues
        );
        const newContractAddress =
          receipt?.events?.DaoDeployed?.returnValues?.contractAddress;
        console.log("deplotyed address", newContractAddress);

        deployedContractAddress = newContractAddress;
        console.log("deployedContractAddress", deployedContractAddress);

        console.log(`DAO succesfully created!`);
        const data = {
          name: communityName,
          symbol: communitySymbol,
          guildId: guildId,
          contractAddress: deployedContractAddress,
        };
        followUp(data, interaction);
      })
      .on("error", function (err) {
        console.error("err", err);
      });
  } catch (error) {
    console.error(error);
  }
};

// deployDao("Shaurya Test8", "SHAU");
// "0xD46D04fa8213231a2c5a9845FF410eE9030246D6";

// ---------------------------------------- GETTER FUNCTIONS ------------------------------------------------

export const getMembership = async (contractAddress, userAddress) => {
  const deployedContractInstance = new web3.eth.Contract(
    implementationContractABI,
    contractAddress
  );
  const events = await deployedContractInstance.getPastEvents(
    "MemberProfileCreated",
    {
      fromBlock: 0,
      toBlock: "latest",
      filter: {
        issuer: userAddress,
      },
    }
  );
  if (events?.length) {
    return {
      hasMembership: true,
      tokenId: events[0]?.returnValues?.tokenId,
    };
  } else {
    return {
      hasMembership: false,
      tokenId: null,
    };
  }
};

// getMembership(
//   deployedContractAddress,
//   "0xc9F225D5E88c5169317aA17a692EF37E8F0Badb3"
// );

const getXpInfoFromAddress = async (contractAddress, userAddress) => {
  const deployedContractInstance = new web3.eth.Contract(
    implementationContractABI,
    contractAddress
  );

  //   console.log("pod id is", podId);

  const events = await deployedContractInstance.getPastEvents(
    "PointIncreased",
    {
      fromBlock: 0,
      toBlock: "latest",
      filter: {
        issuer: userAddress,
        // podId: podId,
      },
    }
  );

  //   console.log("events inads are ", events);
  console.log("events are", events.length);
  //   let info;
  //   if (podId) {
  if (events?.length) {
    const eventsWithPods = events.map((event) => event?.returnValues?.podId);
    const uniquePodIds = [...new Set(eventsWithPods)];
    const finalEvents = uniquePodIds.map((podId) => {
      const eventsWithPodId = events.filter(
        (event) => event?.returnValues?.podId === podId
      );
      const latestEvent = eventsWithPodId[eventsWithPodId?.length - 1];
      return {
        podId,
        xp: latestEvent?.returnValues?.point,
        hash: latestEvent?.returnValues?.hash,
      };
    });
    // const latestInfo = events[events?.length - 1];
    // info = {
    //   issuer: latestInfo?.returnValues?.issuer,
    //   tokenId: latestInfo?.returnValues?.tokenId,
    //   point: latestInfo?.returnValues?.point,
    //   podId: latestInfo?.returnValues?.podId,
    //   hash: latestInfo?.returnValues?.hash,
    // };
    //   } else {
    //   }

    console.log("info is", finalEvents);
    console.log("final events for id 1", finalEvents[0]);
    return finalEvents;
  }
};

// getXpInfoFromAddress(
//   deployedContractAddress,
//   "0xc9F225D5E88c5169317aA17a692EF37E8F0Badb3"
// );

const getUserAddressFromTokenId = async (contractAddress, tokenId) => {
  const deployedContractInstance = new web3.eth.Contract(
    implementationContractABI,
    contractAddress
  );

  const events = await deployedContractInstance.getPastEvents(
    "MemberProfileCreated",
    {
      fromBlock: 0,
      toBlock: "latest",
      filter: {
        tokenId: tokenId,
      },
    }
  );

  //   console.log("events are", events);
  return events[events?.length - 1]?.returnValues?.issuer;
};

// const userId = await getUserAddressFromTokenId(deployedContractAddress, 1);
// console.log("userId ", userId);

// ---------------------------------------- IMPLEMENTATION CONTRACT FUNCTIONS ------------------------------------------------

// mint a membership NFT
export const mintMembershipNFT = async (
  contractAddress,
  issuerAddress,
  userName,
  podType,
  contributionData,
  addUserToDao
) => {
  const deployedContractInstance = new web3.eth.Contract(
    implementationContractABI,
    contractAddress
  );

  console.log(
    contractAddress,
    issuerAddress,
    userName,
    podType,
    contributionData,
    addUserToDao
  );

  const contributionHash = await saveAsJSONToIPFS([contributionData]);
  deployedContractInstance.methods
    .mintMembershipNFT(
      issuerAddress,
      podType,
      contributionHash?.cid,
      contributionData.contributionXP
    )
    .send({
      from: LOCAL_ACCOUNT_ADDRESS,
    })
    .on("receipt", function (receipt) {
      console.log("receipt is", receipt?.events?.MemberProfileCreated);
      console.log("receipt mnsad ", receipt?.events);
      const mintedTokenId =
        receipt?.events?.MemberProfileCreated?.returnValues?.tokenId;

      //   addUserToDao({
      //     userAddr: issuerAddress,
      //     userName: userName,
      //     contractAddress: contractAddress,
      //     tokenId: parseInt(mintedTokenId),
      //     podType: podType as number,
      //     Xp: contributionData.contributionXP,
      //   });

      //   epnsSdk.sendNotification(
      //     issuerAddress,
      //     mintedTokenId,
      //     "Congratulation! Your membership is minted!",
      //     mintedTokenId,
      //     "Congratulation! Your membership is minted!",
      //     3, //this is the notificationType
      //     "", // a url for users to be redirected to
      //     "", // an image url, or an empty string
      //     null //this can be left as null
      //   );

      // TODO: send to epns
    })
    .on("error", function (err) {
      console.error("-------err-------", new Error(err).message);
    });
};

// mintMembershipNFT(
//   deployedContractAddress,
//   "0xefbcE49124015ba34C90Df850ac944584aa320D9",
//   1,
//   {
//     contributionTitle: "Contribution 1",
//     contributionXP: 10,
//   },
//   10
// );

// increase xp of tokenId for a specific pod by XP
export const increaseXP = async (
  contractAddress,
  tokenId,
  podType,
  xpToIncrease,
  contributionData,
  dbData,
  updateDb
) => {
  const deployedContractInstance = new web3.eth.Contract(
    implementationContractABI,
    contractAddress
  );
  const userAddress = await getUserAddressFromTokenId(contractAddress, tokenId);
  console.log("user address is", userAddress);
  const xpInfo = await getXpInfoFromAddress(contractAddress, userAddress);
  console.log("xpInfo is", xpInfo);
  const oldCid = xpInfo.filter((info) => info.podId === podType.toString())[0];
  console.log("oldCid is", oldCid);
  let contributionHash;
  if (oldCid) {
    contributionHash = await appendContribution(oldCid?.hash, contributionData);
  } else {
    contributionHash = await saveAsJSONToIPFS([contributionData]);
  }

  if (contributionHash.success) {
    deployedContractInstance.methods
      .inceasePoints(tokenId, podType, xpToIncrease, contributionHash?.cid)
      .send({
        from: LOCAL_ACCOUNT_ADDRESS,
      })
      .on("receipt", function (receipt) {
        console.log("receipt is", receipt?.events);
        // TODO: send to epns and if total XP crossed threshold send to discord bot to give write role
        updateDb(dbData);
        epnsSdk.sendNotification(
          userAddress,
          `${tokenId}`,
          `Congratulation! Your XP for ${PodType[podType]} pod is increased by ${xpToIncrease} points!`,
          `${tokenId}`,
          `Congratulation! Your XP for ${PodType[podType]} pod is increased by ${xpToIncrease} points!`,
          3, //this is the notificationType
          "", // a url for users to be redirected to
          "", // an image url, or an empty string
          null //this can be left as null
        );
      })
      .on("error", function (err) {
        console.error("err", err);
      });
  }
};

// increaseXP(deployedContractAddress, 1, 2, 50, {
//   contributionTitle: "Contribution 4",
//   contributionXP: 40,
// });
const proposalInfo = {
  title: "Proposal title",
  description: "asd",
  thresholdPercentage: 50,
  votes: [
    {
      walletAddress: "",
      voteType: "",
    },
  ],
  discordThreadLink: "",
  authorInfo: {
    address: "",
    url: "",
  },
  podType: "",
  created: "",
  duration: "",
  proposalStatus: "Passed",
  attributes: [
    {
      trait_type: "Yes Votes",
      value: 5,
      max_value: 10,
    },
  ],
};

export const mintProposalNft = async (
  contractAddress,
  proposalInfo,
  dbData,
  updateDb
) => {
  const deployedContractInstance = new web3.eth.Contract(
    implementationContractABI,
    contractAddress
  );

  const metadataHash = await proposalNFTMetadata(proposalInfo);

  deployedContractInstance.methods
    .mintVoteIntegrity(`https://${metadataHash}.ipfs.w3s.link/file.json`)
    .send({
      from: LOCAL_ACCOUNT_ADDRESS,
    })
    .on("receipt", function (receipt) {
      console.log("receipt is", receipt?.events);
      updateDb(dbData);
    })
    .on("error", function (err) {
      console.error("err", err);
    });
};

// mintProposalNft(deployedContractAddress, proposalInfo);

// const deployedContractInstance = new web3.eth.Contract(
//   implementationContractABI,
//   contractAddress
// );

// deployedContractInstance.methods
//   .getTotalXP(1)
//   .call({
//     from: LOCAL_ACCOUNT_ADDRESS,
//   })
//   .then((result) => {
//     console.log("result is", result);
//   })
//   .catch((err) => console.error("err", err));
