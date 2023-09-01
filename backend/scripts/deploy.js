const hre = require("hardhat");

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {
  // Deploy the NFT Contract
  const nftContract = await hre.ethers.deployContract("CryptoDevsNFT");
  await nftContract.waitForDeployment();
  console.log("CryptoDevsNFT deployed to: ", nftContract.target);

  // Deploy the NFT Marketplace Contract
  const nftMarketplaceContract = await hre.ethers.deployContract(
    "NFTMarketplace"
  );
  await nftMarketplaceContract.waitForDeployment();
  console.log("NFTMarketplace deployed to: ", nftMarketplaceContract.target);

  // Deploy the DAO Contract
  const amount = hre.ethers.parseEther("0.01");
  const daoContract = await hre.ethers.deployContract(
    "CryptoDevsDAO",
    [nftMarketplaceContract.target, nftContract.target],
    { value: amount }
  );
  await daoContract.waitForDeployment();
  console.log("CryptoDevsDAO deployed to: ", daoContract.target);

  await sleep(30 * 1000);

  // Verify the NFT Contract
  await hre.run("verify:verify", {
    address: nftContract.target,
    constructorArguments: [],
  });

  // Verify the DAO Contract
  await hre.run("verify:verify", {
    address: daoContract.target,
    constructorArguments: [nftMarketplaceContract.target, nftContract.target],
  });
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
