const errorHandler = require("./libs/errorHandler");
const pubsub = require("./libs/twitch/pubsub");
const config = require("./libs/config");
const client = require("./libs/client");
const logr = require("./libs/logr");

logr.setSettings({
  group: "client",
  fileRotate: {
    filename: config.app.logFile,
    size: "5M",
  },
});

const clientLogger = logr();
const twitchLogger = logr("twitch");

errorHandler();

clientLogger.info(`${config.app.name} v${config.app.version}`);

client.connect();

function parseRoute(route, payload) {
  Object.entries(payload).forEach(([key, value]) => {
    route = route.replace(`:${key}`, value);
  });

  return route;
}

pubsub({
  onRedemption(payload) {
    const { rewardId, userName, message } = payload;

    twitchLogger.info(`rewardId`, rewardId);
    twitchLogger.debug(`onRedemption`, { rewardId, userName, message });

    const route = config.routes.rewards[rewardId];

    route && client.send(parseRoute(route, { userName, message }));
  },
});
