const { resolve } = require('path');
const autoPrefixer = require('autoprefixer');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const nodeSassGlobImporter = require('node-sass-glob-importer');

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: IS_DEVELOPMENT ? 'development' : 'production',
  entry: [
    resolve('./src/assets/js/site.js'),
    resolve('./src/assets/css/style.scss')
  ],
  output: {
    path: resolve('./dist'),
    filename: 'site.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { ie: '11' } }]
            ]
          }
        }
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoPrefixer()
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              importer: nodeSassGlobImporter()
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'style.css'
    })
  ]
}
