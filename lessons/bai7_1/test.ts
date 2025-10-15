import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("🚀 Deploying MyMintableToken with account:", deployer);

  // 1️⃣ Deploy contract
  const myToken = await deploy("MyMintableToken", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log("✅ MyMintableToken deployed at:", myToken.address);

  // 2️⃣ Kết nối lại contract bằng signer (để gọi hàm mint)
  const signer = await ethers.getSigner(deployer);
  const token = await ethers.getContractAt("MyMintableToken", myToken.address, signer);

  // 3️⃣ Mint 1000 token cho deployer
  const decimals = await token.decimals();
  const amount = ethers.parseUnits("1000", decimals);
  const tx = await token.mint(deployer, amount);
  await tx.wait();

  console.log(`🪙 Minted 1000 MMT to ${deployer}`);

  // 4️⃣ In balance của deployer
  const balance = await token.balanceOf(deployer);
  console.log("💰 Deployer balance:", ethers.formatUnits(balance, decimals), "MMT");
};

export default func;
func.tags = ["MyMintableToken"];
