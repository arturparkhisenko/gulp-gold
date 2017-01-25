const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: [
      './scripts/main.js',
    ],
  },
  devtool: 'source-map',
  // devtool: 'cheap-module-eval-source-map',
  watch: false,
  output: {
    path: path.resolve(__dirname, './src/scripts'),
    filename: '[name].min.js',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      // https://github.com/babel/babel-loader#options
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
            cacheDirectory: true,
          },
        },
      ],
    }],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: __dirname,
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      // warnings: false,
      compress: { // or compressor
        warnings: false,
        // pure_getters: true,
        // unsafe: true,
        // unsafe_comps: true, // not documented
        // screw_ie8: true // not documented
      },
      output: {
        comments: false,
        // semicolons: true
      },
    }),
  ],
};
