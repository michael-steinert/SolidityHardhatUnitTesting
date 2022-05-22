import {Fixture, MockContract} from "ethereum-waffle";
import {ContractFactory, Wallet} from "ethers";
import {ethers} from "hardhat";
import {deployMockUsdc} from "./mocks";
import {Lending} from "../../typechain-types";

type UnitLendingFixtureType = {
    lending: Lending;
    mockUsdc: MockContract;
};

export const unitLendingFixture: Fixture<UnitLendingFixtureType> = async (signers: Wallet[]) => {
    const deployer: Wallet = signers[0];
    const lendingFactory: ContractFactory = await ethers.getContractFactory("Lending");
    const lending: Lending = (await lendingFactory.connect(deployer).deploy()) as Lending;
    await lending.deployed();
    const mockUsdc = await deployMockUsdc(deployer);
    return {lending, mockUsdc};
};
