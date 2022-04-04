//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import 'hardhat/console.sol';

contract A {
  uint256 a;

  function setA(uint256 _a) public {
    a = _a;
  }

  function getA() public view returns (uint256) {
    return a;
  }
}

contract B {
  uint256 b;
  address ContractA;

  constructor(address _B) {
    ContractA = _B;
  }

  function setB(uint256 _b) public {
    //b = _b;

    //A(ContractA).setA(_a + 1);
    ContractA.delegatecall(abi.encodeWithSignature('setA(uint256)', _b + 1));
  }

  function getB() public view returns (uint256) {
    return b;
  }
}