const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')

const paths = require('./paths')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.dist,
    publicPath: './',
    // filename: 'js/[name].[contenthash].bundle.js',
    filename: "sdk.client.min.js",

    library: "sdkClient",
    libraryTarget: "umd",
    globalObject: "self",
  },
  module: {
    rules: [
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
  plugins: [
    new CleanWebpackPlugin(),
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      // filename: 'styles/[name].[contenthash].css',
      filename: 'sdk.client.min.css',
      chunkFilename: '[id].css',
    }),
  ],
  // optimization: {
  //   minimize: true,
  //   minimizer: [new CssMinimizerPlugin(), '...'],
  //   runtimeChunk: {
  //     name: 'runtime',
  //   },
  // },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})
