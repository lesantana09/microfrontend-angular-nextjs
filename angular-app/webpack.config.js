const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    uniqueName: "angularApp",
    publicPath: "auto",
    scriptType: "text/javascript",
    library: { type: "var", name: "angularApp" }, // container global
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "angularApp",
      filename: "remoteEntry.js", // gerado em localhost:4200/remoteEntry.js
      exposes: {
        "./HomePage": "./src/bootstrap-home.ts", // 🔑 expõe HomeComponent/renderHome
      },
      shared: {
        "@angular/core": {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
        },
        "@angular/common": {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
        },
        "@angular/router": {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
        },
      },
    }),
  ],
};
