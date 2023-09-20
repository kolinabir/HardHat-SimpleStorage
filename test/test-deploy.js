const { assert } = require("chai");
const {ethers} = require("hardhat");

describe("SimpleStorage", function(){
  let simpleStorageFactory,simpleStorage;
  beforeEach(async function () {
   simpleStorageFactory= await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy();
  })


  it("Should start with a fav num of 0", async function(){
    const currentFavNum = await simpleStorage.retrive();
    const expectedValue ="0";
    //assert or expect
    assert.equal(currentFavNum.toString(), expectedValue);
  })
  it("Should update when we call store", async function(){
    const tx = await simpleStorage.store(13);
    await tx.wait(1);
    const newValue = await simpleStorage.retrive();
    const expectedValue ="13";
    //assert or expect
    assert.equal(newValue.toString(), expectedValue);
  })

})