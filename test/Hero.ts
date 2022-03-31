import "@nomiclabs/hardhat-ethers";
import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import { expect } from 'chai';

describe('Hero', function() {
    async function createHeroContract() {
        const HeroFactory = await ethers.getContractFactory('TestHero');
        const hero = await HeroFactory.deploy();
        await hero.deployed();

        return hero;
    }

    let hero: Contract;

    before(async function() {
        hero = await createHeroContract();
    });

    it('should fail at creating hero \'cause of payment', async function() {
        let e: any;

        try {
            await hero.createHero(0, {
                value: ethers.utils.parseEther('0.049999999')
            });
        } catch (err) {
            e = err;
        }

        expect(e.message.includes("Please send more money")).to.equal(true);
    })

    it('should return no heroes', async function() {
        expect(await hero.getHeroes()).to.deep.equal([]);
    })

    it('should get strength', async function() {
        await hero.createHero(0, { value: ethers.utils.parseEther('0.05') });
        const heroes = await hero.getHeroes();

        console.log(heroes);
        console.log(await hero.getStrength(heroes[0]));
    })

    it('should do smtn', async function() {
        const hero = await createHeroContract();

        await hero.setRandom(69)
        await hero.createHero(0, { value: ethers.utils.parseEther('0.05') });
        
        const h = (await hero.getHeroes())[0];
        console.log(h)

        expect(await hero.getMagic(h)).to.equal(16);
        expect(await hero.getHealth(h)).to.equal(2);
    })
})