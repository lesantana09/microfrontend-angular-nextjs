import { NextFederationPlugin } from "@module-federation/nextjs-mf";
import { buildAngularRemoteDefinition } from "./module-federation/angular-remote-definition.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config, { dev }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "nextHost",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          angularApp: buildAngularRemoteDefinition(),
        },
      })
    );

    if (dev) {
      config.watchOptions = {
        ...(config.watchOptions ?? {}),
        poll: 800,
        aggregateTimeout: 300,
      };
    }

    return config;
  },
};

export default nextConfig;
