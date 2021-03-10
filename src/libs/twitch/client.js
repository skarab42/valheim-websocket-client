const { twitch } = require("../config");
const { ApiClient } = require("twitch");
const { StaticAuthProvider } = require("twitch-auth");

module.exports = new ApiClient({
  authProvider: new StaticAuthProvider(twitch.clientId, twitch.accessToken),
});
