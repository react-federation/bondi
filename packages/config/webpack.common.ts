import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import postcssNormalize from 'postcss-normalize'
import merge from 'webpack-merge'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'

import { isProd, scriptRegexp } from './constants'
import type { JscConfig } from '@swc/core'

const jsc: JscConfig & Record<string, any> = {
  parser: {
    syntax: 'typescript',
    tsx: true
  }
}

if (isProd) {
  jsc.minify = {
    compress: {
      unused: true
    },
    mangle: true
  }
}

const htmlPlugin = new HtmlWebpackPlugin({
  templateContent: `
  <html>
    <head>
      <style>
        body {
          margin: 0
        }
      </style>
      <title>
        ${process.env.WINDOW_NAME || 'App'}
      </title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
`
})

const entry = {
  main: path.join(process.cwd(), 'index.tsx')
}

const loaderMapper = (loader: string) => ({ loader })

const postcss = {
  // Options for PostCSS as we reference these options twice
  // Adds vendor prefixing based on your specified browser support in
  // package.json
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebook/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3
      }),
      // Adds PostCSS Normalize as the reset css with default options,
      // so that it honors browserslist config in package.json
      // which in turn let's users customize the target behavior as per their needs.
      postcssNormalize()
    ],
    sourceMap: !isProd
  }
}

const module = {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'].map(loaderMapper).concat([postcss])
    },
    {
      test: /\.s[ac]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'].map(loaderMapper).concat([postcss])
    },
    {
      test: scriptRegexp,
      loader: 'swc-loader',
      exclude: /node_modules/,
      options: {
        jsc,
        minify: isProd
      }
    }
  ]
}

const output = {
  publicPath: 'auto'
}

const plugins = [htmlPlugin, process.env.ANALYZE === 'true' && new BundleAnalyzerPlugin()].filter((plugin) => plugin)

let webpackConfig = {
  entry,
  output,
  target: 'web',
  plugins,
  module,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.sass'],
    plugins: [new TsconfigPathsPlugin()]
  }
}

if (isProd) {
  const prodConfig: any = {
    mode: 'production',
    devtool: 'source-map'
  }

  webpackConfig = merge(webpackConfig, prodConfig)
} else {
  const devConfig: any = {
    mode: 'development',
    devtool: 'cheap-module-source-map'
  }

  webpackConfig = merge(webpackConfig, devConfig)
}

export default webpackConfig
