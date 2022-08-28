// import { Web3Storage, getFilesFromPath, File } from "web3.storage";
import { Web3Storage } from "web3.storage";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA5NDg2MjA3NDAxMjJDOTFkZWNlNzUwRDFEMDhFM0ZFOEUwMDQ1MDEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEyODExMjU4MTEsIm5hbWUiOiJ3ZWIzLXRlc3QifQ.Ja5fln0-MAU2H4dmNuq2i3RQ-VXzKpl9RH-By2bcvkw";

const client = new Web3Storage({ token: API_KEY });
const data = {
  name: "token name",
  description: "description of the token or proposal title",
  contributions: [
    {
      contributionTitle: "title 1",
      contributionXP: 100,
    },
  ],
};

export const saveToIPFS = async (data, fileName) => {
  // const files = await getFilesFromPath(data);
  const files = [new File([data], fileName)];
  const rootCid = await client.put(files);
  //   console.log("root cid", rootCid);
  return rootCid;
};

export const saveAsJSONToIPFS = async (data) => {
  const buffer = Buffer.from(JSON.stringify(data));
  const files = [new File([buffer], "file.json")];
  const rootCid = await client.put(files);
  return {
    success: true,
    cid: rootCid,
  };
};

export const appendContribution = async (
  oldContributionCid,
  contributionData
) => {
  try {
    console.log("old contri cid", oldContributionCid);
    const res = await client.get(oldContributionCid);
    console.log(
      "res in append",
      res.status,
      res.statusText,
      res.statusText === "OK"
    );
    if (res.statusText === "OK") {
      const files = await res.files(); // Web3File[]
      for (const file of files) {
        console.log(`${file.cid} ${file.name} ${file.size}`);
        console.log("file is", file);
        const text = await file.text();
        const oldContributions = JSON.parse(text);
        // const contributions = oldMetadata.contributions;
        console.log("file data", oldContributions);
        oldContributions.push({
          ...contributionData,
        });
        const hash = await saveAsJSONToIPFS([...oldContributions]);
        return {
          success: true,
          cid: hash.cid,
        };
      }
    }
    return {
      success: false,
      cid: null,
    };
  } catch (err) {
    console.error("err", err);
    return {
      success: false,
      cid: null,
    };
  }
};

// const cid = await saveToIPFS([
//   {
//     contributionTitle: "title of contribution",
//     contributionXP: 10,
//   },
// ]);
// "bafybeih7yshwq6ruxig6nokig5p37oppeenino7ql562wm7fe6rou4rh74",
// const cid = await appendContribution(
//   "bafybeia5ogbtbvyxjv3jcib7wejugwsasrflduodqszqnqacjpdapwanpm",
//   {
//     contributionTitle: "title of contribution2",
//     contributionXP: 20,
//   }
// );

// console.log("cid is", cid);

const buildProposalNFTSvg = (proposalInfo) => {
  return `<svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
    .proposalTitle {
        color: white;
        font-size: 40px;
        font-weight: bold;
        font-family: Inter;
        line-height: 40px;
    }
    </style>
    <path d="M320 0H0V320H320V0Z" fill="url(#paint0_linear_2_8)"/>
    <path d="M318 263H0V264H318V263Z" fill="white"/>
    <!-- <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="40" font-weight="bold" letter-spacing="0em"><tspan x="20" y="58.5455">Title of Contribution</tspan><tspan x="20" y="106.545">Proposal</tspan></text> -->
    <foreignObject x="20" y="58.5455" width="280" height="80">
            <div xmlns="http://www.w3.org/1999/xhtml" class="proposalTitle">
              ${proposalInfo?.title}
            </div>
        </foreignObject>
    <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="16" font-weight="600" letter-spacing="0em"><tspan x="20" y="297.818">Status: ${proposalInfo?.proposalStatus}</tspan></text>
    <defs>
    <linearGradient id="paint0_linear_2_8" x1="233.5" y1="279" x2="-392.5" y2="-586.5" gradientUnits="userSpaceOnUse">
    <stop stop-color="#ECFFB8"/>
    <stop offset="1" stop-color="#6852FF"/>
    </linearGradient>
    </defs>
    </svg>`;
};

// const proposalInfo = {
//   title: "Proposal title",
//   description: "asd",
//   thresholdPercentage: 50,
//   votes: [
//     {
//       walletAddress: "",
//       voteType: "",
//     },
//   ],
//   discordThreadLink: "",
//   authorInfo: {
//     address: "",
//     url: "",
//   },
//   podType: "",
//   created: "",
//   duration: "",
//   proposalStatus: "Passed",
// };

export const proposalNFTMetadata = async (proposalInfo) => {
  const nftSvg = buildProposalNFTSvg(proposalInfo);
  // await fs.writeFile("nftSvg.svg", nftSvg);
  const nftSvgCid = await saveToIPFS(nftSvg, "nftSvg.svg");

  console.log("nftSvg cid", nftSvgCid);

  const nftMetadata = {
    ...proposalInfo,
    name: proposalInfo?.title,
    description: proposalInfo?.description,
    image: `https://${nftSvgCid}.ipfs.w3s.link/nftSvg.svg`,
  };
  const metadataCid = await saveAsJSONToIPFS(nftMetadata);
  console.log("metadata cid", metadataCid?.cid);
  return metadataCid?.cid;
};

// proposalNFTMetadata(proposalInfo);
