//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hero {
    enum Class { 
        Mage, 
        Healer, 
        Barbarian,
        Warrior
    }

    mapping(address => uint[]) addressToHeroes;

    function generateRandom() public view virtual returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
    }

    function getHeroes() public view returns (uint[] memory) {
        return addressToHeroes[msg.sender];
    }

    function getStrength(uint hero) public pure returns(uint) {
        return uint32(hero >> 2) & 0x1F;
    }

    function getHealth(uint hero) public pure returns(uint) {
        return uint32(hero >> 7) & 0x1F;
    }

    function getDexterity(uint hero) public pure returns(uint) {
        return uint32(hero >> 12) & 0x1F;
    }

    function getIntellect(uint hero) public pure returns(uint) {
        return uint32(hero >> 17) & 0x1F;
    }

    function getMagic(uint hero) public pure returns(uint) {
        return uint32(hero >> 22) & 0x1F;
    }

    function createHero(Class class) public payable {
        require(msg.value >= 0.05 ether, "Please send more money");
        
        uint[] memory stats = new uint[](5);
        stats[0] = 2;
        stats[1] = 7;
        stats[2] = 12;
        stats[3] = 17;
        stats[4] = 22;

        uint length = 5;
        uint hero = uint(class);

        do {
            uint pos = generateRandom() % length;
            uint value = generateRandom() % (13 + length) + 1;

            hero |= value << stats[pos];

            length--;
            stats[pos] = stats[length];
        } while (length > 0);

        addressToHeroes[msg.sender].push(hero);
    }
}