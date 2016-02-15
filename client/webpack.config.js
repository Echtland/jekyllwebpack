
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./webpack.base.config');

const devBuild = process.env.NODE_ENV !== 'production';

const bourbon = require('node-bourbon').includePaths;

config.output = {
  filename: 'javascripts/[name]-bundle.js',
  path: '../source/_assets',
};

// See webpack.common.config for adding modules common to both the webpack dev server and rails

config.module.loaders.push(
  {
    test: /\.jsx?$/,
    loader: 'babel',
    exclude: /node_modules/,
    query: {
      presets: ['es2015']
    }
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      "style",
      'css?' +
      'minimize' +
      // '&modules' +
      '&importLoaders=1' +
      // '&localIdentName=[name]__[local]__[hash:base64:5]' +
      '&localIdentName=[local]' +
      '!sass' +
      '?sourceMap' +
      '&includePaths[]=' + bourbon +
      '&includePaths[]=' + __dirname + '/node_modules' +
      '!postcss' +
      '!sass-resources'
    )
  }
  // {
  //   test: /\.css$/,
  //   loader: ExtractTextPlugin.extract(
  //     'style',
  //     'css?minimize&modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]' +
  //     '!postcss'
  //   ),
  // },
  // {
  //   test: /\.scss$/,
  //   loader: ExtractTextPlugin.extract(
  //     'style',
  //     'css?minimize&modules&importLoaders=3&localIdentName=[name]__[local]__[hash:base64:5]' +
  //     '!postcss' +
  //     '!sass' +
  //     '!sass-resources'
  //   ),
  // }
);

config.plugins.push(
  new ExtractTextPlugin('stylesheets/[name]-bundle.css', { allChunks: true }),
  new webpack.optimize.DedupePlugin()
);

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  config.devtool = 'eval-source-map';
} else {
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}

module.exports = config;
