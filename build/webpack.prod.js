const config = require("./webpack.config");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  ...config,
  output: {
    ...config.output,
    filename: "sdk.client.min.js",
  },
  mode: "production",
  // module: {
  //   rules: [
  //     ...config.module.rules,
  //     {
  //       test: /\.js$/,
  //       loader: "webpack-remove-debug",
  //     },
  //   ],
  // },
  plugins: [
    ...config.plugins,
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'sdk.client.min.css',
      chunkFilename: '[id].css',
    }),
  ]
};
