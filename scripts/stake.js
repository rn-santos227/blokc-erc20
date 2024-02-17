const { ethers } = require("hardhat");

async function main() {
  const [owner, addr1] = await ethers.getSigners();
  const gweiInitialAmount = ethers.parseUnits("100000000000000000000", "gwei");
  const myTokenContract = await await hre.ethers.deployContract("MyToken", [gweiInitialAmount, owner.address]);
  await myTokenContract.waitForDeployment();

  const gweiAmount = ethers.parseUnits("1000", "gwei");
  await myTokenContract.connect(owner).mint(addr1.address, gweiAmount);
  await myTokenContract.connect(addr1).stake(gweiAmount);

  const stakedBalance = await myTokenContract.getStake(addr1.address);
  console.log("Staking successful. Staked balance of addr1:", stakedBalance.toString());
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});