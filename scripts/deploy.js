const {ethers, run, network} = require("hardhat");
require("dotenv").config();


async function main () {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying contract...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    // await simpleStorage.deployed();
    console.log("SimpleStorage deployed to:", simpleStorage.target);
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API) {
      console.log("Verifying contract...");
      const deploymentReceipt = await simpleStorage.deploymentTransaction().wait(2)
      await verify(simpleStorage.target, []);
    }

    const currentValue = await simpleStorage.retrive();
    console.log("current value "+ currentValue.toString());

    const tx = await simpleStorage.store(13);
    await tx.wait(1);
    const newValue = await simpleStorage.retrive();
    console.log("updated value "+ newValue.toString());
};

async function verify (contractAddress, args) {
  console.log("Verifying contract...");
    try {
    await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
    });
    } catch (error) {
      if (error.message.toLowerCase().includes("already verified")) {
        console.log("Contract already verified");
      }else {
        console.log(error);
       }
    }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
