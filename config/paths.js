const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve(__dirname, '../dist'),

  dist: path.resolve(__dirname, '../dist'),

  distjs: path.resolve(__dirname, '../distjs'),

  distNode: path.resolve(__dirname, '../distNode'),

  distTs: path.resolve(__dirname, '../distTs'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),

  static: path.resolve(__dirname, '../static'),
}
