- # `@bondi-js/utils`

  A set of utilities that makes loading libs and React components as federated modules easier! 

  ## Installation

  ```bash
  npm i @bondi-js/utils
  ```

  or

  ```bash
  yarn add @bondi-js/utils
  ```

  ## Usage

  ### `createDynamicComponent`
  
  This function provides a way to load a React Component as a federated module.
  
  ```tsx
  import React from "react";
  import { Spinner } from "@chakra-ui/react"
  import { createDynamicComponent } from "@bondi-js/utils";
  
  const Layout = createDynamicComponent({
    url: "https://dreamy-wescoff-2993eb.netlify.app/crypto-layout.js",
    module: "crypto_app_layout",
    scope: "default_namespace",
    placeholder: <Spinner />
  });
  
  const App = () => {
    return (
      <Layout>
        {/* your content here*/}
      </Layout>
    );
  };
  
  export default App;
  
  ```

  

  ### `importModule`
  
  This function is very similar to the dynamic import (`import("./foo.js")`), makes a dynamic import for the federated module and returns a promise
  
  ```tsx
  import { importModule } from '@bondi-js/utils';
  
  async function main() {
    const module = await importModule({
      url: "https://test/module.js",
    	module: "module_name",
      scope: "default_namespace",
    })
    
    module.method()
  }
  ```
  
  
  
  ## Contact
  
  If you need help or have any question, feel free to contact us or open an issue!
  
  - Leonel Vieyra [me@leonelv.com](mailto:me@leonelv.com)
  - Pablo Sanchez [pds.gomez@gmail.com](mailto:pds.gomez@gmail.com)
