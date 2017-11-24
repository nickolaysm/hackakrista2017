var Migrations = artifacts.require("./Migrations.sol");
var SimpleContract = artifacts.require("./SimpleContract.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SimpleContract);
};
