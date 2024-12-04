const HaloCommand = require("./src/commands/halo");
const HandleMenu = require("./src/commands/menu");

const initializeCommands = () => {
  return [
    new HaloCommand(),
    new HandleMenu(),
  ]
};

module.exports = initializeCommands;
