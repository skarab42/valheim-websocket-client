const logr = require("./logr");
const WebSocket = require("ws");
const config = require("./config");

const serverURL = `ws://${config.server.host}:${config.server.port}`;

let ws = null;
let logger = null;

function connect() {
  logger = logr("ws");

  logger.info("connecting...");

  ws = new WebSocket(serverURL, { perMessageDeflate: false });

  ws.on("open", () => {
    logger.info("connected");
  });

  ws.on("close", () => {
    logger.info("disconnected");
    process.exit(0);
  });
}

function send(message) {
  logger.info("send", message);
  ws.send(message);
}

module.exports = {
  connect,
  send,
};
