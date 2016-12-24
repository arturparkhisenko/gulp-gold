// note: ignored path 'src/**.min.**'

const gulp = require('gulp');
const del = require('del');
// const path = require('path');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const cssnano = require('cssnano');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssCssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');
const postcssBrowserReporter = require('postcss-browser-reporter');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`); // eslint-disable-line

const clean = () => del(['.tmp', 'dist']);

const lintScripts = () =>
  gulp.src([
    'src/scripts/**/*.js',
    // 'src/**/*.html',
    'gulpfile.js',
    '!src/scripts/**/*.min.js',
    '!node_modules/**',
  ])
  .pipe($.eslint())
  .pipe($.eslint.format())
  // .pipe($.if(!browserSync.active, $.eslint.failOnError()));
;

const lintStyles = () =>
  gulp.src([
    'src/styles/**/*.css',
    '!src/styles/**/*.min.css',
  ])
  .pipe($.stylelint({
    // failAfterError: true,
    reporters: [{
      formatter: 'verbose',
      console: true,
    }],
    debug: true,
  }));

const scripts = (done) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    $.util.log('[webpack]', stats.toString({
      // output options
      // https://github.com/webpack/docs/wiki/node.js-api
      chunks: false,
      colors: true,
    }));

    $.util.log('[webpack]', 'Packed successfully!');

    gulp.src([
      './src/scripts/main.min.js',
      './src/scripts/main.min.js.map',
    ]).pipe(gulp.dest('./dist/scripts/'));
  });

  done();
};

const styles = () =>
  gulp.src([
    'src/styles/main.css',
  ], {
    // read: false ,
    // since: gulp.lastRun('styles'),
  })
  .pipe($.plumber())
  // .pipe($.newer('src/styles'))
  .pipe($.sourcemaps.init())
  .pipe($.postcss([
    postcssImport({
      // path: ['src/styles/**/*'],
      // from: 'src/styles/main.css',
    }),
    postcssUrl({
      url: 'inline',
    }),
    postcssCssnext({
      browsers: '> 1%, last 2 versions, Firefox ESR',
      warnForDuplicates: false,
    }),
    cssnano({
      safe: true,
    }),
    postcssBrowserReporter(),
    postcssReporter(),
  ]))
  .pipe($.rename({
    suffix: '.min',
  }))
  .pipe($.sourcemaps.write('./'))
  .pipe(gulp.dest('src/styles/'))
  .pipe(gulp.dest('dist/styles/'))
  .pipe($.size({
    title: 'styles',
  }));

const images = () =>
  gulp.src([
    'src/images/**/*',
  ], {
    // since: gulp.lastRun('images'),
  })
  .pipe($.imagemin({
    progressive: true,
    interlaced: true,
  }))
  .pipe(gulp.dest('dist/images/'))
  .pipe($.size({
    title: 'images',
  }));

const copy = () =>
  gulp.src([
    // 'src/**/*.{html,ico}',
    'src/**/*.{txt,ico}',
    '!src/test',
    '!src/precache.json',
  ], {
    dot: true,
    // since: gulp.lastRun('copy'),
  }).pipe(gulp.dest('dist'))
  .pipe($.size({
    title: 'copy',
  }));

const html = () =>
  gulp.src([
    'src/**/*.html',
  ], {
    // since: gulp.lastRun('html'),
  })
  // .pipe($.newer('dist/'))
  .pipe($.htmlmin({
    collapseWhitespace: true,
  }))
  .pipe($.minifyInline())
  .pipe(gulp.dest('dist/'))
  .pipe($.size({
    title: 'html',
  }));

const watch = () => {
  browserSync({
    notify: false,
    logPrefix: 'gg',
    server: isDev ? 'src' : 'dist',
    https: true,
    // port: 443,
    // scrollElementMapping: ['main', '.mdl-layout'],
    // browser: 'chrome',
  });

  gulp.watch(['src/**/*.html'], gulp.series(html, reload));
  gulp.watch([
    'src/styles/**/*.css', '!src/styles/**/*.min.css',
  ], gulp.series(lintStyles, styles, reload));
  gulp.watch([
    'src/scripts/**/*.js', '!src/scripts/**/*.min.js',
  ], gulp.series(lintScripts, scripts, reload));
  gulp.watch(['src/images/**/*'], gulp.series(images, reload));
};

const serve = () => gulp.series(clean,
  gulp.parallel(
    gulp.series(lintScripts, scripts),
    gulp.series(lintStyles, styles),
    images, copy), html, watch)();

// Build production files, the default task
const build = () => gulp.series(clean,
  gulp.parallel(
    gulp.series(lintScripts, scripts),
    gulp.series(lintStyles, styles),
    images, copy, html))();

exports.lintScripts = lintScripts;
exports.lintStyles = lintStyles;
exports.serve = serve;
exports.default = build;

// export { serve, lintScripts, lintStyles };
// export default build;
