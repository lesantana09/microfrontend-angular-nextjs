const DEFAULT_BASE_URL = process.env.ANGULAR_REMOTE_URL ?? "http://localhost:4200";

const ANGULAR_FILES = [
  { path: "/polyfills.js", optional: true },
  { path: "/runtime.js", optional: false },
  { path: "/remoteEntry.js", optional: false },
];

export function buildAngularRemoteDefinition(baseUrl = DEFAULT_BASE_URL) {
  const scripts = ANGULAR_FILES.map(({ path, optional }) => ({
    url: `${baseUrl}${path}`,
    optional,
  }));

  return createRemoteLoader("angularApp", scripts);
}

function createRemoteLoader(globalName, scripts) {
  const serializedScripts = JSON.stringify(scripts);

  return `promise new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve({
        get: () => Promise.reject(new Error("${globalName} remote só está disponível no cliente")),
        init: () => {},
      });
      return;
    }

    const scripts = ${serializedScripts};

    const ensureScript = ({ url, optional }) =>
      new Promise((scriptResolve, scriptReject) => {
        const existing = document.querySelector('script[data-mf-src="' + url + '"]');
        if (existing) {
          if (existing.dataset.loaded === "true") {
            scriptResolve();
            return;
          }
          existing.addEventListener("load", () => scriptResolve(), { once: true });
          existing.addEventListener(
            "error",
            () => (optional ? scriptResolve() : scriptReject(new Error('Falha ao carregar ' + url))),
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
          scriptResolve();
        };
        script.onerror = () => {
          script.remove();
          if (optional) {
            console.warn('Falha ao carregar ' + url + ' (opcional). Continuando.');
            scriptResolve();
          } else {
            scriptReject(new Error('Falha ao carregar ' + url));
          }
        };
        document.head.appendChild(script);
      });

    scripts
      .reduce((chain, entry) => chain.then(() => ensureScript(entry)), Promise.resolve())
      .then(() => {
        const container = window["${globalName}"];
        if (!container) {
          throw new Error('window.${globalName} não foi definido após carregar remoteEntry.js');
        }
        resolve(container);
      })
      .catch((error) => reject(error));
  })`;
}
