const errorHandler = require("./errorHandler");
const config = require("./config");
const logr = require("./logr");

logr.setSettings({
  fileRotate: {
    filename: config.app.logFile,
    size: "5M",
  },
});

errorHandler();

const logger = logr("client");

logger.info(`${config.app.name} v${config.app.version}`);

Promise.reject("Kapouééééé");
Promise.reject(new Error("Prout1"));
throw new Error("Prout2");
