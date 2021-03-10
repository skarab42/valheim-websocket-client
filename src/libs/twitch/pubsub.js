const twitchClient = require("./client");
const { PubSubClient } = require("twitch-pubsub-client");

async function pubsub(callbacks = {}) {
  const pubSubClient = new PubSubClient();
  const userId = await pubSubClient.registerUserListener(twitchClient);

  if (callbacks.onRedemption) {
    await pubSubClient.onRedemption(userId, callbacks.onRedemption);
  }
}

module.exports = pubsub;
