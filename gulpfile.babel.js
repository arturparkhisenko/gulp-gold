// note: ignored path 'src/**.min.**'

import gulp from 'gulp';
import del from 'del';
// import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import gulpStylelint from 'gulp-stylelint';
import cssnano from 'cssnano';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';
import postcssCssnext from 'postcss-cssnext';
import postcssBrowserReporter from 'postcss-browser-reporter';
import postcssReporter from 'postcss-reporter';
import webpackConfig from './webpack.config';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

// console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);

gulp.task('clean', () => del(['.tmp', 'dist'], {
  dot: true,
}));

gulp.task('lint:scripts', () =>
  gulp.src([
    'src/scripts/**/*.js',
    // 'src/**/*.html',
    'gulpfile.babel.js',
    '!src/scripts/**/*.min.js',
    '!node_modules/**',
  ])
  .pipe($.eslint())
  .pipe($.eslint.format())
  // .pipe($.eslint.failAfterError())
  // .pipe($.if(!browserSync.active, $.eslint.failOnError()));
);

// consoleReporter(),
gulp.task('lint:styles', () =>
  gulp.src([
    'src/styles/**/*.css',
    '!src/styles/**/*.min.css',
  ])
  // .pipe($.stylelint({
  .pipe(gulpStylelint({
    // failAfterError: true,
    reporters: [{
      formatter: 'verbose',
      console: true,
    }],
    debug: true,
  }))
);

// entry is './src/scripts/main.js'
gulp.task('scripts', (done) => {
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
});

gulp.task('styles', () =>
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
  }))
);

gulp.task('images', () =>
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
  }))
);

gulp.task('copy', () =>
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
  }))
);

gulp.task('html', () =>
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
  }))
);

const watch = () => {
  browserSync({
    notify: false,
    logPrefix: 'gg',
    https: true,
    server: isDev ? 'src' : 'dist',
    // scrollElementMapping: ['main', '.mdl-layout'],
    // port: 3000,
    // browser: 'chrome',
  });

  gulp.watch(['src/**/*.html'], gulp.series('html', reload));
  gulp.watch([
    'src/styles/**/*.css', '!src/styles/**/*.min.css',
  ], gulp.series('lint:styles', 'styles', reload));
  gulp.watch([
    'src/scripts/**/*.js', '!src/scripts/**/*.min.js',
  ], gulp.series('lint:scripts', 'scripts', reload));
  gulp.watch(['src/images/**/*'], gulp.series('images', reload));
};

gulp.task('serve',
  gulp.series('clean',
    gulp.parallel(
      gulp.series('lint:scripts', 'scripts'),
      gulp.series('lint:styles', 'styles'),
      'images', 'copy'
    ),
    'html',
    watch
  )
);

// Build production files, the default task
gulp.task('default', gulp.series('clean',
  gulp.parallel(
    gulp.series('lint:scripts', 'scripts'),
    gulp.series('lint:styles', 'styles'),
    'images', 'copy', 'html'
  )
));