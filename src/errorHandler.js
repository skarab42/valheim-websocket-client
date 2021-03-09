const logr = require("./logr");

function errorFactory(origin, error) {
  return { origin, error: error.stack || error };
}

module.exports = () => {
  const logger = logr("errorHandler");

  process.on("uncaughtException", (error, origin) => {
    logger.error(error.message || error, errorFactory(origin, error));
  });

  process.on("unhandledRejection", (reason) => {
    logger.error(
      reason.message || reason,
      errorFactory("unhandledRejection", reason)
    );
  });
};
