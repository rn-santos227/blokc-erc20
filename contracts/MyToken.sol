// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20, Ownable {
  mapping(address => uint256) private _stakes;
  
  constructor(uint256 initialSupply, address initialOwner) ERC20("MyToken", "MTK") Ownable(initialOwner) {
    _mint(initialOwner, initialSupply);
  }

  function mint(address account, uint256 amount) public onlyOwner {
    _mint(account, amount);
  }

  function stake(uint256 amount) public {
    require(amount > 0, "Cannot stake 0 tokens");
    require(balanceOf(msg.sender) >= amount, "Insufficient balance");

    _stakes[msg.sender] += amount;
    _transfer(msg.sender, address(this), amount);
  }

  function getStake(address account) public view returns (uint256) {
    return _stakes[account];
  }
}