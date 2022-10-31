---
title: "So you want to run fresh React on IE11?"
description: "Digging ancient sites"
date: 2021-06-30T11:57:43+03:00
draft: false
---

#### Digging ancient sites ...
#### 2021-06-30

0. Install `react-app-polyfill`
1. On your entry point (let's say `src/index.jsx`) insert on the top `import 'react-app-polyfill/ie11';` (ie9 for even older browser support but that's out of the scope of this guide)
2. Add the following on your `package.json` 
```json
"browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all",
      "ie 11"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version",
      "ie 11"
    ]
  }
```
3. Tweak your `.babelrc` to have at least the following:
```json
{
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          // let's play it safe
          ie: 9
        },
        forceAllTransforms: true,
        useBuiltIns: false,
        modules: false
      }
    ],
    '@babel/preset-react'
  ]
}
```
4. Tweak your `webpack.config.js` `module` attribute as follows:
```json
module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { transpileOnly: true },
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.tsx',
      '.ts',
    ],
  },
```
5. Enjoy your code on a relic of the past