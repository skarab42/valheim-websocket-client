const config = require("./config");

const path = require("path");
const execDir = path.dirname(process.execPath);
require("dotenv-flow").config({ path: path.join(execDir, "../config") });

const WebSocket = require("ws");

const { ApiClient } = require("twitch");
const { StaticAuthProvider } = require("twitch-auth");
const { PubSubClient } = require("twitch-pubsub-client");

const serverPort = process.env.VWS_SERVER_PORT;
const clientId = process.env.TWITCH_CLIENT_ID;
const accessToken = process.env.TWITCH_ACCESS_TOKEN;
const huginRewardId = process.env.TWITCH_HUGIN_REWARD_ID;

const authProvider = new StaticAuthProvider(clientId, accessToken);
const apiClient = new ApiClient({ authProvider });
const pubSubClient = new PubSubClient();

let connected = false;

const ws = new WebSocket(`ws://localhost:${serverPort}`, {
  perMessageDeflate: false,
});

ws.on("open", function open() {
  console.log("connected");
  connected = true;
});

ws.on("close", () => {
  console.log(">>> disconnected, exit...");
  process.exit();
});

(async () => {
  const userId = await pubSubClient.registerUserListener(apiClient);
  await pubSubClient.onRedemption(userId, ({ rewardId, userName, message }) => {
    if (connected && huginRewardId === rewardId) {
      console.log(`>>> hugin/message/${userName}/${message}`);
      ws.send(`hugin/message/${userName}/${message}`);
    }
  });
})();
