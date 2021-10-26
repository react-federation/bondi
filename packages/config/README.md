# `@bondi-js/config`

Just a bunch of configs for webpack and typescript to make your microfrontend development easier!

## Installation

```bash
npm i -D @bondi-js/config
```

or

```bash
yarn add -D @bondi-js/config
```



## Usage

`webpack.config.ts`

Make sure to set the exported module name, filename and namespace 

```ts
import { webpackConfig } from '@bondi-js/config'
import { merge } from 'webpack-merge'
import Webpack from 'webpack'

import packageJson from './package.json'

const { ModuleFederationPlugin } = Webpack.container
const name = 'default_namespace'
const module = 'main_frontend'
const filename = 'main_frontend.js'

const moduleFederationConfig = {
  name,
  exposes: {
    [module]: './app.tsx'
  },
  filename,
  shared: {
    react: {
      import: 'react',
      shareKey: 'react',
      shareScope: 'default',
      singleton: true,
      requiredVersion: packageJson.dependencies.react
    },
    'react-dom': {
      import: 'react-dom',
      shareKey: 'react-dom',
      shareScope: 'default',
      singleton: true,
      requiredVersion: packageJson.dependencies['react-dom']
    }
  }
}

const moduleFederationPlugin = new ModuleFederationPlugin(moduleFederationConfig)

const projectConfig: ReturnType<typeof merge> = {
  devServer: {
    port: 3002,
    historyApiFallback: true
  },
  plugins: [moduleFederationPlugin],
  output: {
    publicPath: 'auto'
  }
}

const config: any = merge(webpackConfig, projectConfig)

export default config

```

`tsconfig.json`

```json
{
  "extends": "@bondi-js/config/tsconfig.base",
}

```



## Contact

If you need help or have any question, feel free to contact us or open an issue! 

- Leonel Vieyra <me@leonelv.com>
- Pablo Sanchez <pds.gomez@gmail.com>

