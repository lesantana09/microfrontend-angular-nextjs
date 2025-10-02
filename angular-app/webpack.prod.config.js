const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    uniqueName: "angularApp",
    publicPath: "auto",
    scriptType: "text/javascript",
    library: { type: "var", name: "angularApp" },
  },
  optimization: {
    runtimeChunk: false, // importante para MF
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "angularApp",
      filename: "remoteEntry.js",
      exposes: {
        "./HomePage": "./src/bootstrap-home.ts",
      },
      shared: {
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: false,
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: false,
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: false,
        },
      },
    }),
  ],
};
