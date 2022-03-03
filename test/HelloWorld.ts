import "@nomiclabs/hardhat-ethers";
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Hello world', function() {
    it('should say hi', async function () {
        // 1. setup - DONE
        // 2. deploy our contract

        const HelloWorld = await ethers.getContractFactory('HelloWorld');
        const hello = await HelloWorld.deploy();
        await hello.deployed();

        // 3. call our functions to test
        expect(await hello.hello()).to.equal('Hello, World!');
        
    })
})