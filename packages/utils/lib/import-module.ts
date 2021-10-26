import { FederatedModuleConfig } from "../types";
import loadModule from "./load-module";

type PromiseFn = (value: any) => void;

export const injectModuleInDOM = (url: string) => {
  const element = document.createElement("script");

  element.src = url;
  element.type = "text/javascript";
  element.async = true;

  document.head.appendChild(element);

  return new Promise((resolve: PromiseFn, reject: PromiseFn) => {
    element.onload = resolve;

    element.onerror = (error) => {
      element.remove();
      reject(error);
    };
  });
};

const importModule = async <T>({ scope, module, url }: FederatedModuleConfig) => {
  try {
    await injectModuleInDOM(url);

    const loadedModule = await loadModule<T>({ scope, module })();

    return loadedModule;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export default importModule;
