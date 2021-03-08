const { name } = require("../package.json");
const fs = require("fs-extra");
const path = require("path");

const pkg = !!process.env.PKG;
const cwd = pkg ? path.dirname(process.execPath) : process.cwd();
const configFile = path.join(cwd, pkg ? `${name}.config.json` : "config.json");

fs.ensureFileSync(configFile);

console.log({ pkg, cwd, configFile });

process.exit();
