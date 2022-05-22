import {ethers} from "hardhat";
import {expect, assert} from "chai";
import {BigNumber} from "ethers";
import {parseEther} from "ethers/lib/utils";

export const shouldDeposit = (): void => {
    //   // to silent warning for duplicate definition of Transfer event
    //   ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.OFF);

    context("Testing Function deposit()", async function () {
        it("should revert if the Token Amount is not greater then Zero", async function () {
            /* Deployed Contract is already loaded from Fixtures, therefore "this" can be used */
            await expect(this.lending.connect(this.signers.alice)
                .deposit(this.mocks.mockUsdc.address, ethers.constants.Zero))
                .to.be.revertedWith("NeedsMoreThanZero");
        });
        it("should emit a proper Event", async function () {
            /* Type `uint256` in Contract corresponds to Type `BigNumber` */
            const amount: BigNumber = ethers.constants.One;
            /* Deployed Contract is already loaded from Fixtures, therefore "this" can be used */
            await expect(this.lending.connect(this.signers.alice)
                .deposit(this.mocks.mockUsdc.address, amount))
                .to.emit(this.lending, "Deposited")
                .withArgs(this.signers.alice.address, this.mocks.mockUsdc.address, amount);
        });
        it("should update Storage Variable properly", async function () {
            /* Type `uint256` in Contract corresponds to Type `BigNumber` */
            const amount: BigNumber = parseEther("42");
            /* Mapping is public therefore a Getter is automatically generated from the Contract */
            const previousAccountToTokenDeposits: BigNumber = await this.lending.accountToTokenDeposits(
                this.signers.alice.address,
                this.mocks.mockUsdc.address
            );
            await this.lending.connect(this.signers.alice).deposit(this.mocks.mockUsdc.address, amount);
            const currentAccountToTokenDeposits: BigNumber = await this.lending.accountToTokenDeposits(
                this.signers.alice.address,
                this.mocks.mockUsdc.address
            );
            /* Function `assert` can not operate with BigNumbers, therefore convert the Value to Type `BigInt` */
            /* Type Coercion allows to check the Type as well the Value */
            assert(
                currentAccountToTokenDeposits.toBigInt() === previousAccountToTokenDeposits.add(amount).toBigInt(),
                "New Value should be equal to previous Value plus Amount"
            );
        });
        it("should revert with Error TransferFailed", async function () {
            /* Changing Value of ERC20 Mock from `true` to `false` */
            await this.mocks.mockUsdc.mock.transferFrom.returns(false);
            await expect(this.lending.connect(this.signers.alice)
                .deposit(this.mocks.mockUsdc.address, ethers.constants.Two))
                .to.be.revertedWith("TransferFailed");
        });
    });
};
