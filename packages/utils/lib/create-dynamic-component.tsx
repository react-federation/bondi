import React, { ComponentType } from "react";
import loadModule from "./load-module";
import { FederatedModuleConfig } from "../types";
import useDynamicScript from "./use-dynamic-script";

function createDynamicComponent<T = any>({ url, scope, module }: FederatedModuleConfig): ComponentType<T> {
  function DynamicComponent(props: T = {} as any) {
    const { ready, failed } = useDynamicScript({
      url,
    });

    if (!ready) {
      return <h2>Loading dynamic script: {url}</h2>;
    }

    if (failed) {
      throw new Error(`Failed to load script ${url}`);
    }

    const Component = React.lazy(loadModule({ scope, module }) as any);

    return (
      <React.Suspense fallback="Loading System">
        <Component {...props} />
      </React.Suspense>
    );
  }

  return DynamicComponent;
}

export default createDynamicComponent;
