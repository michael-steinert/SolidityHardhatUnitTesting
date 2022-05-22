# Hardhat Testing Template

## Different Kinds of Tests

* __Unit Tests__ are used on local Blockchains with one deployed Contracts and the Rest is mocked
* __Integration Tests__ are used on local Blockchains with multiple deployed Contracts and the Rest is mocked
* __End-to-End Tests__ are used on forked Blockchains (Mainnet) and the same Setup as Integration Tests
* __Property-based Tests__ are using Randomness to test all Edge Cases on the Contracts

## Code Coverage

* Code Coverage is a Measure in Percent of the Degree to which the Source Code is executed when particular Test Suite is run

## Fixtures

* Fixtures are Testing Scenarios that are executed one and then numbered by making Snapshots of the Blockchain
* For Example, Fixtures allows to test a ERC20 Token in that the Deployment and Funding of the Toke is made once, then each Test can use the existing Setup

## Tools for Testing

* Waffle is a Library for Writing and Testing Smart Contracts
* Mocha is a JavaScript Testing framework for NodeJS
* Chai is an Assertion Library for NodeJS

## Scripts

```shell
npm run compile
npm run test
npm run test --parallel
npm run coverage
```
