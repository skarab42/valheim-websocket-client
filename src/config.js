const path = require("path");
const fs = require("fs-extra");
const merge = require("deepmerge");
const minimist = require("minimist");
const { name, version } = require("../package");

const pkg = !!process.env.PKG;
const argv = minimist(process.argv.slice(2));
const cwd = pkg ? path.dirname(process.execPath) : process.cwd();
const logFile = path.join(cwd, "logs", "%DATE%.log");

const app = { name, version, pkg, cwd, argv, logFile };
const file = path.join(cwd, "config.json");

let files = [file];
let config = {};

function exit(message, code = 0) {
  console.error(`[config] ${message}`);
  process.exit(code);
}

function loadConfig(file) {
  try {
    config = merge(config, fs.readJsonSync(file));
  } catch (error) {
    exit(error.message, 1);
  }
}

if (!pkg) {
  const file = path.join(cwd, ".config/config.json");

  if (fs.pathExistsSync(file)) {
    files = [...files, file];
  }
}

if (argv.config) {
  const userFiles = Array.isArray(argv.config) ? argv.config : [argv.config];
  files = [...files, ...userFiles.map((file) => path.resolve(file))];
}

files.forEach(loadConfig);

module.exports = { ...config, app };
