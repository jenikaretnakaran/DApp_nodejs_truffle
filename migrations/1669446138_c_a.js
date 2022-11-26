const certi = artifacts.require("Certi");

module.exports = function (deployer) {
  deployer.deploy(certi);
};
