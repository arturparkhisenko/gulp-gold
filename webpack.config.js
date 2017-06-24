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
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['env', {
            targets: {
              browsers: [
                'last 2 versions',
                'safari >= 7',
                '>3%',
              ],
            },
            modules: false,
            loose: true,
          }]],
          cacheDirectory: true,
        },
      }],
    }],
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor', // Specify the common bundle's name.
    //   // children: true, // use all children of the chunk
    //   // async: true // create an async commons chunk
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { // or compressor
        warnings: false,
        drop_console: false,
      },
      output: {
        comments: false,
      },
    }),
  ],
};
