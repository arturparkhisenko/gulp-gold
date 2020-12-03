const path = require('path');
const webpack = require('webpack');
// const bundleAnalyzerPlugin = require('webpack-bundle-analyzer');

const production = process.env.NODE_ENV === 'production';

// Use it to upgrade to the new Webpack
process.traceDeprecation = true;

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['./scripts/main.js'],
  },
  target: ['web', 'es5'], // Remove es5 to output es6
  performance: {
    hints: 'warning', // false, 'error'
  },
  mode: production === true ? 'production' : 'development',
  devtool: production === true ? false : 'eval-cheap-source-map', // 'source-map'
  watch: false,
  output: {
    path: path.resolve(__dirname, './src/scripts'),
    filename: '[name].min.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      DEBUG: JSON.stringify(production !== true),
    }),
    // new bundleAnalyzerPlugin.BundleAnalyzerPlugin(),
  ],
};

if (production === true) {
  config.optimization = {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  };
}

module.exports = config;
