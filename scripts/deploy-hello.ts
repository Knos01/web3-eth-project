import "@nomiclabs/hardhat-ethers";
import { Contract } from 'ethers';
import { ethers } from 'hardhat';

async function deploy() {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const hello = await HelloWorld.deploy();
    await hello.deployed();

    return hello;
}

// @ts-ignore
async function sayHello(hello) {
    console.log("Say: ", await hello.hello());
}

deploy().then(sayHello)