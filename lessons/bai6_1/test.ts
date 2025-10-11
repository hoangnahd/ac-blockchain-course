import { ethers } from "ethers";

async function main() {
  // 1️⃣ Connect to Sepolia network
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  // 2️⃣ Your deployed contract address
  const contractAddress = "0x18B751eD453894E1Fc87760E3BD19B42BAA4794C";

  // 3️⃣ Minimal ERC20 ABI
  const abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address account) view returns (uint256)"
  ];

  // 4️⃣ Create contract instance
  const contract = new ethers.Contract(contractAddress, abi, provider);

  // 5️⃣ Read data
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();

  console.log("Token Name:", name);
  console.log("Symbol:", symbol);
  console.log("Total Supply:", ethers.formatUnits(totalSupply, 18));

  // 6️⃣ Optional — check deployer balance
  const deployer = "0xF363f0A938E7aA315ceFB24b9C7AeC79A9c5eCd4";
  const balance = await contract.balanceOf(deployer);
  console.log("Deployer Balance:", ethers.formatUnits(balance, 18));
}

main().catch(console.error);
