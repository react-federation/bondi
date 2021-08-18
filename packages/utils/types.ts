export interface FederatedModuleConfig {
  url: string;
  module: string;
  scope: string;
}

export interface ModuleScope<T = any> {
  init: (module: T) => Promise<void>;
  get: <T>(moduleName: string) => () => Promise<T>;
}
