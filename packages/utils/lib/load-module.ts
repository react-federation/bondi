/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FederatedModuleConfig } from "../types";

const loadModule = <T = {}>({ scope, module }: Omit<FederatedModuleConfig, "url">) => {
  return async () => {
    try {
      // Initializes the share scope. This fills it with known provided modules from this build and all remotes
      // __webpack_init_sharing__ is a pointer to __webpack_require__.I, see the following links
      // https://github.com/webpack/webpack/blob/c181294865dca01b28e6e316636fef5f2aad4eb6/lib/APIPlugin.js#L107
      // https://github.com/webpack/webpack/blob/c181294865dca01b28e6e316636fef5f2aad4eb6/lib/RuntimeGlobals.js#L268s

      // @ts-ignore
      await __webpack_init_sharing__("default");
    } catch (error) {
      throw new Error(
        `make sure that you have modules shared in the "default" share scope (webpackConfig.shared[moduleName].shareScope = "default")`
      );
    }

    // @ts-ignore
    if (!window[scope]) {
      throw new Error(
        `the namespace/scope ${scope} doesn't exists, check the "name" key in your module federation config`
      );
    }

    // @ts-ignore
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);
    // @ts-ignore
    // @ts-ignore
    const factory = await window[scope].get(module);
    const Module = factory();

    return Module as T;
  };
};

export default loadModule;
