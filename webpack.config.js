const path = require('path');
const webpack = require('webpack');
// const bundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const production = process.env.NODE_ENV === 'production';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['./scripts/main.js']
  },
  target: 'web',
  performance: {
    hints: 'warning' // false, 'error'
  },
  mode: production ? 'production' : 'development',
  devtool: 'source-map', // 'cheap-module-eval-source-map'
  watch: false,
  output: {
    path: path.resolve(__dirname, './src/scripts'),
    filename: '[name].min.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory=true',
          }
        ]
      }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
    minimize: true
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new bundleAnalyzerPlugin.BundleAnalyzerPlugin(),
  ]
};
