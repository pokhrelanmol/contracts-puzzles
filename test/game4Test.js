const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game4", function () {
    async function deployContractAndSetVariables() {
        const Game = await ethers.getContractFactory("Game4");
        const game = await Game.deploy();
        const signer1 = await ethers.getSigner();
        return { game, signer1 };
    }
    it("should be a winner", async function () {
        const { game, signer1 } = await loadFixture(
            deployContractAndSetVariables
        );
        // let's work  with singer1 or default signer address
        await game.write(signer1.address); // writting with singer1 addess you can put any address here
        await game.win(signer1.address); // put the same address here to pass the require statement

        // leave this assertion as-is
        assert(await game.isWon(), "You did not win the game");
    });
});
