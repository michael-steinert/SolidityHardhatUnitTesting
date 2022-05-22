import {MockContract} from "ethereum-waffle";
import {Signer} from "ethers";
import {artifacts, waffle} from "hardhat";
import {Artifact} from "hardhat/types";
import ERC20ABI from "../../abis/erc20.abi.json";

export async function deployMockUsdc(deployer: Signer): Promise<MockContract> {
    // const erc20Artifact: Artifact = await artifacts.readArtifact("ERC20");
    const erc20Token: MockContract = await waffle.deployMockContract(deployer, ERC20ABI);
    await erc20Token.mock.decimals.returns(6);
    await erc20Token.mock.name.returns("USD Coin");
    await erc20Token.mock.symbol.returns("USDC");
    await erc20Token.mock.transferFrom.returns(true);
    return erc20Token;
}
