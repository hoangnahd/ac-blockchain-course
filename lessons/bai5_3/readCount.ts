import { ethers } from "hardhat";
async function main() {
  // 1️⃣ Thông tin contract
  const contractAddress = "0xDFe70ae94585dCE94685de4a021207215d2307cE";
  const abi = [
    "function getCount() public view returns (uint)",
    "function increment() public"
  ];
  const [provider] = await ethers.getSigners();

  const contract = new ethers.Contract(contractAddress, abi, provider);

  // 4️⃣ Gọi hàm getCount()
  const count = await contract.getCount();

  // 5️⃣ In kết quả ra console
  console.log("Current count is:", count.toString());
}
// 6️⃣ Chạy hàm chính
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
