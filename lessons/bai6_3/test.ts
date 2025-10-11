import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config(); // đọc file .env

async function main() {
  // 1️⃣ Kết nối tới mạng Sepolia
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  // 2️⃣ Lấy private key từ file .env
  const privateKey = process.env.TESTNET_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("❌ Missing TESTNET_PRIVATE_KEY in .env file");
  }

  // 3️⃣ Tạo wallet từ private key
  const wallet = new ethers.Wallet(privateKey, provider);
  console.log("🔑 Using wallet:", wallet.address);

  // 4️⃣ Địa chỉ contract MyNFT đã deploy
  const contractAddress = "0x8D2aFD71F622e86b35881311136B455a445E8357";

  // 5️⃣ ABI rút gọn của MyNFT
const abi = [
  "function mint(address to) external",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function nextTokenId() view returns (uint256)"
];


  // 6️⃣ Kết nối contract
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  // 7️⃣ Lấy tokenId kế tiếp
  const nextId = await contract.nextTokenId();
  console.log("Next token ID:", nextId.toString());

  // 8️⃣ Mint NFT mới cho chính deployer
  const to = wallet.address;
  const tx = await contract.mint(to);
  console.log("⛏️ Minting NFT...");
  await tx.wait();

  console.log(`✅ Minted token #${nextId} to ${to}`);

  // 9️⃣ Kiểm tra lại chủ sở hữu
  const owner = await contract.ownerOf(nextId);
  console.log("👑 Owner of token", nextId.toString(), "is:", owner);
}

main().catch(console.error);
