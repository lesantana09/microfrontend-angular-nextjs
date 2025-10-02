import type { AngularHomeRenderProps } from "./angular-remote";

declare module "angularApp/HomePage" {
  export function renderHome(
    el: HTMLElement,
    props?: AngularHomeRenderProps
  ): Promise<() => void>;
  export const HomeComponent: unknown;
}
