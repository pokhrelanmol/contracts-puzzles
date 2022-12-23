const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game3", function () {
    async function deployContractAndSetVariables() {
        const Game = await ethers.getContractFactory("Game3");
        const game = await Game.deploy();

        // Hardhat will create 10 accounts for you by default
        // you can get one of this accounts with ethers.provider.getSigner
        // and passing in the zero-based indexed of the signer you want:
        const signers = await ethers.getSigners();

        // you can get that signer's address via .getAddress()
        // this variable is NOT used for Contract 3, just here as an example

        return { game, signers };
    }

    it("should be a winner", async function () {
        const { game, signers } = await loadFixture(
            deployContractAndSetVariables
        );
        const [signer1, signer2, signer3] = signers;
        const address1 = await signer1.address;
        const address2 = await signer2.address;
        const address3 = await signer3.address;

        await game.connect(signer1).buy({ value: "2" });
        await game.connect(signer2).buy({ value: "3" });
        await game.connect(signer3).buy({ value: "1" });

        // TODO: win expects three arguments
        await game.win(address1, address2, address3);

        // leave this assertion as-is
        assert(await game.isWon(), "You did not win the game");
    });
});
