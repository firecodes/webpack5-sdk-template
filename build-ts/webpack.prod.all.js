const config = require("./webpack.config");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const libraryTarget = "window" // commonjs2 | commonjs | 

module.exports = {
  ...config,
  output: {
    ...config.output,
    filename: `sdk.client.${libraryTarget}.js`,
    libraryTarget: libraryTarget,
    // libraryExport: 'default',
  },
  // mode: "production",
  plugins: [
    ...config.plugins,
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: `sdk.client.${libraryTarget}.css`,
      chunkFilename: '[id].css',
    }),
  ]
};
