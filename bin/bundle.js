const { name, version } = require("../package.json");
const esbuild = require("esbuild");

esbuild
  .build({
    bundle: true,
    platform: "node",
    define: {
      "process.env.PKG": true,
    },
    entryPoints: ["src/index.js"],
    outfile: `dist/${name}-v${version}.js`,
  })
  .catch(() => process.exit(1));
