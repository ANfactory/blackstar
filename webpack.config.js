var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

var assetsPluginOpts = {
  path: path.join(__dirname, 'src', 'server'),
  filename: 'assets.json',
  prettyPrint: true
};

var providePluginOpts = {
  $: "jquery",
  jQuery: "jquery",
  "window.jQuery": "jquery"
};

module.exports = {
  entry: './src/client/app.js',
  output: {
    path: path.join(__dirname, 'public', '[hash]'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    publicPath: '/[hash]/'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new CleanWebpackPlugin(['public'], {verbose: true, dry: false}),
    new ExtractTextPlugin('[name].css'),
    new AssetsPlugin(assetsPluginOpts),
    new webpack.ProvidePlugin(providePluginOpts)
  ]
};
