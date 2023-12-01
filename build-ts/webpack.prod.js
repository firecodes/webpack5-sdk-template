const config = require("./webpack.config");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  ...config,
  output: {
    ...config.output,
    filename: "sdk.client.min.js",
  },
  mode: "production",
  plugins: [
    ...config.plugins,
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'sdk.client.min.css',
      chunkFilename: '[id].css',
    }),
  ]
};
