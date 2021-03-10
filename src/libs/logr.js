const chalk = require("chalk");
const deepmerge = require("deepmerge");
const colors = new chalk.Instance({ level: 3 });
const fileStream = require("file-stream-rotator");

let globalSettings = {
  group: "logr",
  level: "debug",
  color: true,
  fileRotate: {
    filename: "logs/%DATE%.log",
    date_format: "YYYY-MM-DD",
    frequency: "custom",
    verbose: false,
    size: "5M",
  },
  levels: {
    log: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
  },
  colors: {
    debug: colors.white,
    info: colors.blue,
    warn: colors.yellow,
    error: colors.red,
  },
};

function writeLine(stream, line, ...data) {
  if (data.length) {
    const names = Object.getOwnPropertyNames(data[0]);
    line += ` ${JSON.stringify(data[0], names)}`;
  }

  stream.write(`[${new Date().toISOString()}]${line}\n`);
}

function log(settings, level, message, ...data) {
  let logLevel = settings.levels[level] || levels.log;
  let setLevel = settings.levels[settings.level] || levels.log;

  if (logLevel < setLevel) {
    return;
  }

  let color = settings.color ? settings.colors[level] : (t) => t;
  let prefix = `[${settings.group}][${level}]`;

  console[level](`${color(prefix)} ${message}`, ...data);

  if (settings.stream) {
    writeLine(settings.stream, `${prefix} ${message}`, ...data);
  }
}

function logr(options = {}) {
  if (typeof options === "string") {
    options = { group: options };
  }

  const settings = deepmerge.all([
    {},
    globalSettings,
    options,
    { stream: null },
  ]);

  settings.stream = settings.fileRotate
    ? fileStream.getStream(settings.fileRotate)
    : null;

  return {
    log(level, message, ...data) {
      log(settings, level, message, ...data);
    },
    debug(message, ...data) {
      this.log("debug", message, ...data);
    },
    info(message, ...data) {
      this.log("info", message, ...data);
    },
    warn(message, ...data) {
      this.log("warn", message, ...data);
    },
    error(message, ...data) {
      this.log("error", message, ...data);
    },
  };
}

logr.setSettings = (settings) =>
  (globalSettings = deepmerge(globalSettings, settings));

module.exports = logr;
