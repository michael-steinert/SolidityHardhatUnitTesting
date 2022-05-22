// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Lending is ReentrancyGuard {
    event Deposited(address indexed account, address indexed token, uint256 indexed amount);

    error TransferFailed();
    error NeedsMoreThanZero();

    /* Mapping of Accounts has Tokens and Tokens has an Amount */
    mapping(address => mapping(address => uint256)) public accountToTokenDeposits;

    modifier moreThanZero(uint256 amount) {
        if (amount == 0) {
            revert NeedsMoreThanZero();
        }
        _;
    }

    function deposit(address token, uint256 amount) external nonReentrant moreThanZero(amount) {
        emit Deposited(msg.sender, token, amount);
        accountToTokenDeposits[msg.sender][token] += amount;
        bool isSuccess = IERC20(token).transferFrom(msg.sender, address(this), amount);
        if (!isSuccess) {
            revert TransferFailed();
        }
    }
}
