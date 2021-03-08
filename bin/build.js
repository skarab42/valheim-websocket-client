const { name, version } = require("../package.json");
const { exec } = require("pkg");

exec([
  `dist/${name}-v${version}.js`,
  "--target",
  "node14-win-x64",
  "--output",
  `dist/${name}-v${version}.exe`,
]);
