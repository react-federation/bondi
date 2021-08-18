/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { FederatedModuleConfig, ModuleScope } from '../types';

const loadComponent = ({ scope, module }) => {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    // await __webpack_init_sharing__('default');
    // const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    // await container.init(__webpack_share_scopes__.default);
    console.log(window[scope])
    const factory = await window[scope].get(module);
    const Module = factory();

    return Module;
  };
};
export default loadComponent;
