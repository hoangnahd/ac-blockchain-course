// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyMintableToken
 * @dev Token ERC20 có thể mint, chỉ owner (người deploy) được phép mint thêm token
 */
contract MyMintableToken is ERC20, Ownable {
    // Constructor khởi tạo token với tên và ký hiệu
    constructor() ERC20("MyMintableToken", "MMT") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function getBalance(address account) external view returns (uint256) {
        return balanceOf(account);
    }
}
