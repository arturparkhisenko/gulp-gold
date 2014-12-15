// list:
//     - css,js inject using https://www.npmjs.org/package/gulp-inject
//     - auto bower files injection and concatenation like:

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    filter = require('gulp-filter'),
    order = require('gulp-order'),
    mainBowerFiles = require('main-bower-files');

gulp.task('scripts:vendor', function() {
    var vendors = mainBowerFiles();

    return gulp.src(vendors)
        .pipe(filter('**.js'))
        .pipe(order(vendors))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/'));
});

//list to future:
// https://github.com/jonkemp/gulp-inline-css
// https://github.com/Kagami/gulp-ng-annotate
// https://github.com/aslansky/gulp-sprite
// https://github.com/ben-eb/gulp-svgmin
// https://github.com/jonschlinkert/gulp-htmlmin
// https://github.com/sindresorhus/gulp-google-cdn
// https://github.com/sindresorhus/gulp-size
// https://github.com/sindresorhus/gulp-webp
// https://github.com/sindresorhus/gulp-zip
// https://github.com/konitter/gulp-combine-media-queries

// gulp file sample ->

var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    fileinclude = require('gulp-file-include'),
    plumber = require('gulp-plumber'),
    sftp = require('gulp-sftp'),
    prettify = require('gulp-html-prettify'),
    csso = require('gulp-csso'),
    csscomb = require('gulp-csscomb'),
    watch = require('gulp-watch'),
    filter = require('gulp-filter');

//server connect
gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});

//paths
var paths = {
    js: 'build/js/*',
    css: 'build/less/*.css',
    less: 'build/less/all.less',
    html: 'build/*.html',
    fileinclude: 'build/include/*.html',
    images: 'build/images/*',

    src: 'build/',
    dest: 'public/'
};

//js
gulp.task('js', function() {
    gulp.src(paths.js)
        .pipe(gulp.dest(paths.dest + 'js/'))
        .pipe(connect.reload());
});

//css
gulp.task('css', function() {
    gulp.src(paths.css)
        .pipe(gulp.dest(paths.dest + '/css'))
        .pipe(notify('Done!'))
        .pipe(connect.reload());
});

//less
gulp.task('less', function() {
    gulp.src(paths.less)
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 10 versions']
        }))
        .pipe(csscomb())
        .pipe(csso())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(notify('Done!'))
        .pipe(connect.reload());
});

//fileinclude
gulp.task('fileinclude', function() {
    gulp.src(paths.html)
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(prettify({
            indent_char: ' ',
            indent_size: 2
        }))
        .pipe(gulp.dest(paths.dest))
        .pipe(connect.reload());
});

//images
gulp.task('img', function() {
    watch(paths.images, function() {
            gulp.start('clean');
        })
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist/img'));
});

//sftp
gulp.task('sftp', function() {
    return gulp.src('public/*')
        .pipe(sftp({
            host: '',
            user: '',
            pass: '',
            remotePath: ''
        }));
});

//watch
gulp.task('watch', function() {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.html, ['fileinclude']);
    gulp.watch(paths.fileinclude, ['fileinclude']);
});

//default
gulp.task('default', ['connect', 'watch', 'fileinclude', 'js', 'css', 'less']);
