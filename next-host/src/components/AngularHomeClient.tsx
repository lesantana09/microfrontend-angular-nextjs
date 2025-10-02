"use client";

import { useEffect, useRef } from "react";
import type { AngularHomeRenderProps } from "../types/angular-remote";
import { ANGULAR_HOME_REMOTE, loadAngularRenderer } from "../lib/angularRemote";

export type AngularHomeClientProps = AngularHomeRenderProps;

const AngularHomeClient = ({ title, message }: AngularHomeClientProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    let cancelled = false;
    let teardown: (() => void) | undefined;

    loadAngularRenderer<AngularHomeRenderProps, void | (() => void)>()
      .then((render) => {
        if (cancelled) {
          return;
        }

        const props = { title, message } satisfies AngularHomeRenderProps;

        return Promise.resolve(render(element, props)).then((result) => {
          if (!cancelled && typeof result === "function") {
            teardown = result;
          }
        });
      })
      .catch((error) => {
        console.error(
          `Falha ao inicializar remoto ${ANGULAR_HOME_REMOTE}`,
          error
        );
      });

    return () => {
      cancelled = true;
      teardown?.();
      element.innerHTML = "";
    };
  }, [title, message]);

  return <div ref={containerRef} />;
};

export default AngularHomeClient;
