const { expect } = require('chai');

async function main() {
  const [owner, addr1] = await ethers.getSigners();
  const initialSupply = '100000000000000000000';
  const myTokenContract = await await hre.ethers.deployContract("MyToken", [initialSupply, owner.address]);
  await myTokenContract.waitForDeployment();

  await myTokenContract.connect(owner).mint(addr1.address, 1000);
  await myTokenContract.connect(addr1).stake(100);

  const stakedBalance = await myTokenContract.getStake(addr1.address);
  console.log("Staking successful. Staked balance of addr1:", stakedBalance.toString());

  await new Promise(resolve => setTimeout(resolve, 10000));

  await myTokenContract.connect(addr1).withdraw();

  const stakedBalanceAfterWithdrawal = await myTokenContract.getStake(addr1.address);
  console.log("Withdrawal successful. Staked balance of addr1 after withdrawal:", stakedBalanceAfterWithdrawal.toString())
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});