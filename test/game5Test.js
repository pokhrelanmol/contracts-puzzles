const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Game5", function () {
    async function deployContractAndSetVariables() {
        const Game = await ethers.getContractFactory("Game5");
        const game = await Game.deploy();
        const signers = await ethers.getSigners();
        const threshold = 0x00ffffffffffffffffffffffffffffffffffffff;
        let signer;
        for (let _signer of signers) {
            if (_signer.address < threshold) {
                console.log("valid address: ", _signer.address);
                signer = _signer;
                break;
            }
        }
        return { game, signer };
    }
    it("should be a winner", async function () {
        const { game, signer } = await loadFixture(
            deployContractAndSetVariables
        );

        await game.connect(signer).win();

        // leave this assertion as-is
        assert(await game.isWon(), "You did not win the game");
    });
});
