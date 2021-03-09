const config = require("./config");
const logr = require("./logr");

logr.setSettings({
  fileRotate: {
    filename: config.app.logFile,
    size: "5M",
  },
});

const logger = logr("client");

logger.info(`${config.app.name} v${config.app.version}`);
