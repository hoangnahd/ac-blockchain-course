import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying MyToken with account:", deployer);

  const myToken = await deploy("MyToken", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log("✅ MyToken deployed at:", myToken.address);
};

export default func;
func.tags = ["deploy"]; // ⚡ đảm bảo dòng này tồn tại
