export type RemoteRenderer<TProps = unknown, TResult = unknown> = (
  target: HTMLElement,
  props?: TProps
) => Promise<TResult> | TResult;
export type RemoteModule = Record<string, unknown>;
export type RemoteModuleLoader = () => Promise<RemoteModule>;

export const ANGULAR_HOME_REMOTE = "angularApp/HomePage" as const;

const moduleLoaders = new Map<string, RemoteModuleLoader>();
const moduleCache = new Map<string, Promise<RemoteModule>>();

export function registerAngularRemote(
  specifier: string,
  loader: RemoteModuleLoader
) {
  moduleLoaders.set(specifier, loader);
}

export function loadAngularModule(specifier: string): Promise<RemoteModule> {
  const loader = moduleLoaders.get(specifier);

  if (!loader) {
    throw new Error(
      `Loader não registrado para o remoto "${specifier}". Use registerAngularRemote antes de consumir o módulo.`
    );
  }

  if (!moduleCache.has(specifier)) {
    moduleCache.set(
      specifier,
      loader()
        .then((mod) => mod as RemoteModule)
        .catch((error) => {
          moduleCache.delete(specifier);
          throw error;
        })
    );
  }

  return moduleCache.get(specifier)!;
}

function getByPath(source: RemoteModule, path: string | undefined) {
  if (!path) {
    return undefined;
  }

  return path.split(".").reduce<unknown>((value, segment) => {
    if (value && typeof value === "object" && segment in (value as object)) {
      return (value as Record<string, unknown>)[segment];
    }
    return undefined;
  }, source);
}

export interface LoadAngularExportOptions<T> {
  specifier: string;
  exportPaths?: string[];
  validate?: (value: unknown) => value is T;
  description?: string;
  fallback?: (module: RemoteModule) => T | undefined;
}

export async function loadAngularExport<T>({
  specifier,
  exportPaths = ["default"],
  validate = (value: unknown): value is T => value !== undefined,
  description = `Export não encontrado para ${specifier}`,
  fallback,
}: LoadAngularExportOptions<T>): Promise<T> {
  const remoteModule = await loadAngularModule(specifier);

  const candidates: unknown[] = [];

  for (const path of exportPaths) {
    const candidate = getByPath(remoteModule, path);
    if (candidate !== undefined) {
      candidates.push(candidate);
    }
  }

  if (fallback) {
    const fallbackValue = fallback(remoteModule);
    if (fallbackValue !== undefined) {
      candidates.push(fallbackValue);
    }
  }

  const match = candidates.find((candidate) => validate(candidate));

  if (match !== undefined) {
    return match as T;
  }

  throw new Error(description);
}

const DEFAULT_RENDERER_PATHS = [
  "render",
  "renderHome",
  "default",
  "default.render",
  "default.renderHome",
];

export interface LoadAngularRendererOptions<TProps, TResult>
  extends Partial<
    Pick<
      LoadAngularExportOptions<RemoteRenderer<TProps, TResult>>,
      "exportPaths" | "validate" | "description" | "fallback"
    >
  > {
  specifier?: string;
}

export function loadAngularRenderer<TProps = unknown, TResult = unknown>({
  specifier = ANGULAR_HOME_REMOTE,
  exportPaths = DEFAULT_RENDERER_PATHS,
  validate,
  description = `Função de renderização não encontrada para ${specifier}`,
  fallback,
}: LoadAngularRendererOptions<TProps, TResult> = {}): Promise<
  RemoteRenderer<TProps, TResult>
> {
  const mergedValidate =
    validate ??
    ((candidate: unknown): candidate is RemoteRenderer<TProps, TResult> =>
      typeof candidate === "function");

  return loadAngularExport<RemoteRenderer<TProps, TResult>>({
    specifier,
    exportPaths,
    validate: mergedValidate,
    description,
    fallback,
  });
}

registerAngularRemote(ANGULAR_HOME_REMOTE, () => import("angularApp/HomePage"));
