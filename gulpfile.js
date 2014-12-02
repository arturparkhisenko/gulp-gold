/* jshint node:true */
'use strict';

// plugins & paths
var gulp = require('gulp'), // gulp
    csso = require('gulp-csso'), // css min
    myth = require('gulp-myth'), // css autoprefix
    csslint = require('gulp-csslint'), // css lint
    uglify = require('gulp-uglify'), // js min
    jshint = require('gulp-jshint'), // js lint
    imagemin = require('gulp-imagemin'), // img min
    rename = require('gulp-rename'), // rename
    concat = require('gulp-concat'), // concatenation
    plumber = require('gulp-plumber'), // for error handling
    del = require('del'), // for cleaning
    sourcemaps = require('gulp-sourcemaps'), // sourcemaps

    paths = {
        styles: ['src/{css,components}/**/*.css', '!src/css/notbowervendor/**/*.css'],
        scripts: ['src/{js,components}/**/*.js', '!src/js/notbowervendor/**/*.js'],
        images: 'src/img/**/*'
    };

gulp.task('clean', function(cb) {
    del(['dist'], cb);
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(concat('main.css'))
        .pipe(csslint())
        .pipe(myth())
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(csso())
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('misc', function() {
    return gulp.src('src/**/*.{html,ico}')
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('build', ['styles', 'scripts', 'images', 'misc']);

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
