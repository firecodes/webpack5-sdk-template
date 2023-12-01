const { BannerPlugin } = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const version = require("../package.json").version;
const paths = require('../config/paths')
const tools = require('./tools');
const createTsConfig = require("./tsconfig.js");

const banner = `sdk.client v${version}
(c) 2014-${new Date().getFullYear()} .`;

module.exports = {
  // target: "web",  //node  web 等等
  entry: "./src-ts/index.ts",
  // entry: "./dist-build-ts/index.js",
  output: {
    publicPath: '/',
    path: paths.distTs,
    filename: "sdk.client.js",
    library: "sdkClient",
    libraryTarget: "umd",
    globalObject: "self",
  },
  mode: "development",
  devtool: "source-map",
  node: false,
  //  externals: {},
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@': paths.src
    },
  },
  module: {
    rules: [
      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        // type: 'asset/resource',
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/media/[name].[hash:7].[ext]'
          }
        }
      },
      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        // type: 'asset/inline',
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/fonts/[name].[hash:7].[ext]'
          }
        }
      },
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
        test: /\.js$/,
        use: tools.createBabelLoader("js"),
        // exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        use: tools.createBabelLoader("jsx"),
        // exclude: /node_modules/
      },
      // {
      //   test: /\.tsx?$/,
      //   use: tools.createTsParseUseLoader("ts-loader", createTsConfig())
      // },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader',],
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
