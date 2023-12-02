const { BannerPlugin } = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const version = require("../package.json").version;
const paths = require('../build/paths')

const banner = `sdk.client v${version}
(c) 2014-${new Date().getFullYear()} .`;

module.exports = {
  entry: "./src/index.js",
  // entry: "./src-js/index.js",
  // entry: "./src-ts/index.ts",
  // entry: "./dist-build-ts/index.js",  
  output: {
    publicPath: '/',
    path: paths.distjs,
    filename: "sdk.client.js",
    library: "sdkClient",
    libraryTarget: "umd",
    globalObject: "self",
  },
  mode: "development",
  devtool: "source-map",
  node: false,
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src
    },
  },
  module: {
    rules: [
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
      // { test: /\.js$/, use: ['babel-loader'] },
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-object-assign"],
          },
        },
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: (() => {
    const list = [
      // new CleanWebpackPlugin(),
      new BannerPlugin(banner),
    ]
    if (process.env.NODE_ENV !== 'production') {
      // Extracts CSS into separate files
      list.push(
        new MiniCssExtractPlugin({
          filename: 'sdk.client.css',
          chunkFilename: '[id].css',
        })
      )
    }
    return list
  })()
};
