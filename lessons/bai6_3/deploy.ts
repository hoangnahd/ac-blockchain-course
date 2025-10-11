import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  // 1️⃣ Deploy MyNFT
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();
  await myNFT.waitForDeployment();

  const contractAddress = await myNFT.getAddress();
  console.log("✅ MyNFT deployed at:", contractAddress);

  // 2️⃣ Mint 1 NFT cho deployer
  const mintTx = await myNFT.mint(deployer.address);
  await mintTx.wait();
  console.log("🎨 Minted 1 NFT for:", deployer.address);

  // 3️⃣ In ra ownerOf(0)
  const owner = await myNFT.ownerOf(0);
  console.log("🧑‍🎨 Owner of token 0 is:", owner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
