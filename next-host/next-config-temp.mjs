import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const angularRemoteUrl = process.env.ANGULAR_REMOTE_URL ?? "http://localhost:4200";
const angularRemoteDefinition = `promise new Promise((resolve, reject) => {
  if (typeof window === "undefined") {
    return resolve({
      get: () => Promise.reject(new Error("angularApp remote só está disponível no cliente")),
      init: () => {},
    });
  }

  const remoteUrl = ${JSON.stringify(angularRemoteUrl)};
  const scripts = [
    { url: `${angularRemoteUrl}/polyfills.js`, optional: true },
    { url: `${angularRemoteUrl}/runtime.js`, optional: false },
    { url: `${angularRemoteUrl}/remoteEntry.js`, optional: false },
  ];

  const ensureScript = ({ url, optional }) => new Promise((res, rej) => {
    const existing = document.querySelector(`script[data-mf-src="${`" + url + "`"}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        return res();
      }
      existing.addEventListener("load", () => res(), { once: true });
      existing.addEventListener(
        "error",
        () => (optional ? res() : rej(new Error(`Falha ao carregar ${`" + url + "`"}`))),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    script.dataset.mfSrc = url;
    script.onload = () => {
      script.dataset.loaded = "true";
      res();
    };
    script.onerror = () => {
      script.remove();
      if (optional) {
        console.warn(`Falha ao carregar ${`" + url + "`"}, continuando (opcional).`);
        res();
      } else {
        rej(new Error(`Falha ao carregar ${`" + url + "`"}`));
      }
    };
    document.head.appendChild(script);
  });

  const loadInOrder = scripts.reduce(
    (promise, script) => promise.then(() => ensureScript(script)),
    Promise.resolve()
  );

  loadInOrder
    .then(() => {
      const container = window.angularApp;
      if (!container) {
        throw new Error("window.angularApp não foi definido após carregar remoteEntry.js");
      }
      resolve(container);
    })
    .catch((err) => {
      reject(err);
    });
});`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "nextHost",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          angularApp: angularRemoteDefinition,
        },
      })
    );
    return config;
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
