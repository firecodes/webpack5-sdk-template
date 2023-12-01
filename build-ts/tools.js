'use strict'
require('es-expand')
const path = require('path')
const mergeObject = require('webpack-merge')
const _ = require('lodash')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.cssLoaders = function (options) {
  options = options || {}
  const cssLoader = {
    loader: 'css-loader',
    options: { sourceMap: options.sourceMap }
  }
  const postcssLoader = {
    loader: 'postcss-loader',
    options: { sourceMap: options.sourceMap }
  }

  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    // Extract CSS when that option is specified 
    if (options.extract) {
      const miniCssLoader = {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: false,
        },
      }
      loaders.unshift(miniCssLoader)
    }
    return loaders
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
// babel预设：开始

// js 的 babel 的预设
const jsBabelPresets = [
  ['@babel/preset-env', { 'useBuiltIns': false, }]
];

// js 的 babel 的插件 ：2020-4-10
const jsBabelPlugins = [
  // Stage 2
  ['@babel/plugin-proposal-decorators', { 'legacy': false, decoratorsBeforeExport: true }],
  '@babel/plugin-proposal-function-sent',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-numeric-separator',
  '@babel/plugin-proposal-throw-expressions',
  // Stage 3
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-syntax-import-meta',
  ['@babel/plugin-proposal-class-properties', { 'loose': true }],
  '@babel/plugin-proposal-json-strings'
]

// flow 的 babel 的预设
const flowBabelPresets = ['@babel/preset-flow']
// jsx 的 babel 的预设
const jsxBabelPresets = ['@babel/preset-react']
// TypeScript 的 babel 的预设
const tsBabelPresets = ['@babel/preset-typescript']

/**
 * createBabelPresets(type,options)
 * @param  type ? : string   要创建的预设的类型
 *
 * type 可表示的类型及有效值如下
 * jsx类型 : jsx、react
 * typescript类型 : ts、tsx、typescript
 * 其它类型 : 除上述之外的所有值
 */
exports.createBabelLoader = function (type) {
  type = type.toLowerCase()
  let babelPresets = []
  switch (type) {
    case 'jsx':
    case 'react': {
      babelPresets = babelPresets.concat(flowBabelPresets, jsxBabelPresets)
      break
    }
    case 'ts':
    case 'tsx':
    case 'typescript': {
      babelPresets = babelPresets.concat(tsBabelPresets)
      break
    }
    default: {
      babelPresets.concat(flowBabelPresets)
    }
  }
  return {
    loader: 'babel-loader',
    options: {
      presets: jsBabelPresets.concat(babelPresets),
      plugins: jsBabelPlugins
    }
  }
}
// babel预设：结束 
// TypeScript的Loader：开始  
/** 创建 TypeScript 的 Loader  */
exports.createTsParseUseLoader = function (loader, tsConfig) {
  switch (loader) {
    // 用 babel-loader 解析 TypeScript
    case 'babel-loader': {
      return exports.createBabelLoader('ts')
    }
    // 用 ts-loader 解析 TypeScript
    default: {
      return [
        exports.createBabelLoader('js'),
        { loader: 'ts-loader', options: tsConfig }
      ]
    }
  }
}

const uniqMerge = mergeObject.merge({
  customizeArray: function (a, b, key) {
    return _.uniqWith([...a, ...b], _.isEqual)
  }
})
/**
 * 将多个配置对象合并一个配置对象，并会对数组类型的配置项去重；
 * @returns  Configuration  返回合并后的配置对象 
 */
exports.uniqMerge = uniqMerge