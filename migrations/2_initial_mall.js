const Mall = artifacts.require("Mall");

module.exports = function (deployer) {
    deployer.deploy(Mall);
};