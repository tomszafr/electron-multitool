var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "js");

var config = {
  entry: DEV + "/index.jsx",
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    path: OUTPUT,
    filename: "react.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      include: DEV,
      loader: "babel-loader"
    },
    {
      test: /\.scss?$/,
      loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap!sass-loader?sourceMap' })
    }]
  },
  plugins: [
        new ExtractTextPlugin('../css/style.css')
  ]
};

module.exports = config
