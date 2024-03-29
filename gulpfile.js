// note: ignored path 'src/**.min.**'

const gulp = require('gulp');
const del = require('del');
const gulpLoadPlugins = require('gulp-load-plugins');
const PluginError = require('plugin-error');
const fancyLog = require('fancy-log');
const browserSync = require('browser-sync');
const cssnano = require('cssnano');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');
const postcssBrowserReporter = require('postcss-browser-reporter');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const pkg = require('./package.json');

let imagemin = null;
const $ = gulpLoadPlugins();
const server = browserSync.create();
const production = process.env.NODE_ENV === 'production';

process.traceDeprecation = production === false;

console.log(`v${pkg.version}, production = ${production}`); // eslint-disable-line

// TODO: imagemin ESM only, using dynamic import before full support of "type": "module"
const importDynamicModules = () => {
  return Promise.resolve(import('gulp-imagemin')).then((imageminModule) => {
    imagemin = imageminModule.default;
  });
};

const clean = () => del(['.tmp', 'dist']);

const lintScripts = () =>
  gulp
    .src([
      'src/scripts/**/*.js',
      // 'src/**/*.html',
      'gulpfile.js',
      '!src/scripts/**/*.min.js',
      '!node_modules/**'
    ])
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format());
// .pipe($.if(!browserSync.active, $.eslint.failOnError()));

const lintStyles = () =>
  gulp
    .src(['src/styles/**/*.css', '!src/styles/**/*.min.css'])
    .pipe($.plumber())
    .pipe(
      $.stylelint({
        // failAfterError: true,
        reporters: [
          {
            formatter: 'verbose',
            console: true
          }
        ],
        debug: true
      })
    );

const scripts = done => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new PluginError('webpack', err);
    }

    fancyLog(
      '[webpack]',
      stats.toString({
        all: false,
        // Output options
        // https://webpack.js.org/configuration/stats/
        assets: true,
        builtAt: true,
        // chunkGroups: true,
        // chunks: true,
        colors: true,
        entrypoints: true,
        errorDetails: true,
        errors: true,
        // modules: true,
        // modulesSort: 'size',
        performance: true,
        timings: true,
        version: true,
        warnings: true
      })
    );

    fancyLog('[webpack]', 'Packed successfully!');

    gulp.src('./src/scripts/main.min.js*').pipe(gulp.dest('./dist/scripts/'));
  });

  done();
};

const styles = () =>
  gulp
    .src(['src/styles/main.css'], {
      // read: false ,
      // since: gulp.lastRun(styles),
    })
    .pipe($.plumber())
    .pipe($.if(production === false, $.sourcemaps.init()))
    .pipe(
      $.postcss([
        postcssImport({
          // path: ['src/styles/**/*'],
          // from: 'src/styles/main.css',
        }),
        postcssUrl({
          url: 'inline'
        }),
        postcssPresetEnv({
          stage: 0 // default is 3
        }),
        cssnano({
          safe: true
        }),
        postcssBrowserReporter(),
        postcssReporter()
      ])
    )
    .pipe(
      $.rename({
        suffix: '.min'
      })
    )
    .pipe($.if(production === false, $.sourcemaps.write('./')))
    .pipe(gulp.dest('src/styles/'))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(
      $.size({
        title: 'styles'
      })
    );

const images = () =>
  Promise.resolve(importDynamicModules()).then(() =>
    gulp
      .src(['src/images/**/*'], {
        // since: gulp.lastRun(images),
      })
      .pipe($.plumber())
      .pipe(
        imagemin({
          progressive: true,
          interlaced: true
        })
      )
      .pipe(gulp.dest('dist/images/'))
      .pipe(
        $.size({
          title: 'images'
        })
      )
  );

const copy = () =>
  gulp
    .src(
      [
        // 'src/**/*.{html,ico}',
        'src/**/*.{txt,ico}',
        '!src/test',
        '!src/precache.json'
      ],
      {
        dot: true
        // since: gulp.lastRun(copy),
      }
    )
    .pipe($.plumber())
    .pipe(gulp.dest('dist'))
    .pipe(
      $.size({
        title: 'copy'
      })
    );

const html = () =>
  gulp
    .src(['src/**/*.html'], {
      // since: gulp.lastRun(html),
    })
    .pipe($.plumber())
    .pipe(
      $.htmlmin({
        collapseWhitespace: true
        // minifyCSS: true,
        // minifyJS: true,
        // removeComments: false
      })
    )
    .pipe(gulp.dest('dist/'))
    .pipe(
      $.size({
        title: 'html'
      })
    );

const reload = done => {
  server.reload();
  done();
};

const watch = () => {
  server.init({
    notify: false,
    logPrefix: 'gg',
    server: production === true ? 'dist' : 'src',
    https: true
    // port: 443,
    // scrollElementMapping: ['main', '.mdl-layout'],
    // browser: 'chrome',
  });

  gulp.watch(['src/**/*.html'], gulp.series(html, reload));
  gulp.watch(
    ['src/styles/**/*.css', '!src/styles/**/*.min.css'],
    gulp.series(lintStyles, styles, reload)
  );
  gulp.watch(
    ['src/scripts/**/*.js', '!src/scripts/**/*.min.js'],
    gulp.series(lintScripts, scripts, reload)
  );
  gulp.watch(['src/images/**/*'], gulp.series(images, reload));
};

const serve = () =>
  gulp.series(
    clean,
    gulp.parallel(
      gulp.series(lintScripts, scripts),
      gulp.series(lintStyles, styles),
      images,
      copy
    ),
    html,
    watch
  )();

// Build production files, the default task
const build = cb => {
  gulp.series(
    clean,
    gulp.parallel(
      gulp.series(lintScripts, scripts),
      gulp.series(lintStyles, styles),
      images,
      copy,
      html
    )
  )(cb);
};

exports.lintScripts = lintScripts;
exports.lintStyles = lintStyles;
exports.serve = serve;
exports.build = build;

exports.default = build;

// export { build, serve, lintScripts, lintStyles };
// export default build;
