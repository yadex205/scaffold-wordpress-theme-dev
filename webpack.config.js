const { resolve } = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeSassGlobImporter = require('node-sass-glob-importer');

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: IS_DEVELOPMENT ? 'development' : 'production',
  entry: [
    './src/assets/js/app.js',
    './src/assets/css/app.sass'
  ],
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'app.js'
  },
  plugins: [
    new CopyPlugin([
      { context: './src', from: './**/*.php' },
      { context: './src', from: './assets/!(css|js)/**/*' }
    ]),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoader: 2 }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-preset-env')({ stage: 3 }),
                require('postcss-calc')()
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: { importer: nodeSassGlobImporter() }
          }
        ]
      }
    ]
  }
};
