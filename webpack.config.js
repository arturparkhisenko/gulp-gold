import { resolve } from 'path';
import webpack from 'webpack';

export default {
  context: resolve(__dirname, 'src'),
  entry: {
    main: [
      './scripts/main.js',
    ],
  },
  devtool: 'source-map',
  // devtool: 'cheap-module-eval-source-map',
  watch: false,
  output: {
    path: resolve(__dirname, './src/scripts'),
    filename: '[name].min.js',
  },
  // See: http://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['', '.js'],
    // modules: [
    //   path.resolve('./src/scripts'),
    //   'node_modules',
    // ],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      // https://github.com/babel/babel-loader#options
      loader: 'babel',
      // loader: 'babel?presets[]=es2015&cacheDirectory=true',
      query: {
        // presets: ['es2015'],
        presets: [require.resolve('babel-preset-es2015')],
        cacheDirectory: true,
      },
    }],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    // for "webpack": "^2.1.0-beta.13",
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: false,
    // }),
    new webpack.optimize.UglifyJsPlugin({
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
