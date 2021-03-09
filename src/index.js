const errorHandler = require("./libs/errorHandler");
const config = require("./libs/config");
const logr = require("./libs/logr");

logr.setSettings({
  fileRotate: {
    filename: config.app.logFile,
    size: "5M",
  },
});

errorHandler();

const logger = logr("client");

logger.info(`${config.app.name} v${config.app.version}`);
