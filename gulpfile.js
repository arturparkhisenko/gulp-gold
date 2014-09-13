// plugins
var gulp = require('gulp'), // gulp
    csso = require('gulp-csso'), // css min
    myth = require('gulp-myth'), // css autoprefix
    uncss = require('gulp-uncss'), // css remunused
    csslint = require('gulp-csslint'), // css lint
    uglify = require('gulp-uglify'), // js min
    jshint = require('gulp-jshint'), // js lint
    imagemin = require('gulp-imagemin'), // img min
    rename = require('gulp-rename'), // rename
    concat = require('gulp-concat'); // concatenation
    
// css
gulp.task('css', function() {
    // !exclude vendor
    gulp.src(['./assets/css/**/*.css', '!./assets/css/vendor/**/*.css'])
        .pipe(concat('screen.css'))
        .pipe(csslint())
        .pipe(uncss({
            html: ['./dev/index.html'] //, 'etc.html'
        }))
        .pipe(myth())
        .pipe(gulp.dest('./dev/css'))
        .pipe(rename('screen.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('./dev/css'))
        .on('error', function(err){ console.log(err.message); });
});

// js
gulp.task('js', function() {
    // !exclude vendor
    gulp.src(['./assets/js/**/*.js', '!./assets/js/vendor/**/*.js'])
        .pipe(concat('index.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('./dev/js'))
        .pipe(rename('index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dev/js'))
        .on('error', function(err){ console.log(err.message); });
});

// img
gulp.task('images', function() {
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dev/img'));
});

// default
gulp.task('default', function() {
    gulp.start('css','js','images');
    console.log('default task end');
});

// build
gulp.task('build', function() {
    // css
    gulp.src(['./assets/css/**/*.css', '!./assets/css/vendor/**/*.css'])
        .pipe(concat('screen.css'))
        .pipe(csslint())
        .pipe(uncss({
            html: ['./build/index.html'] //, 'etc.html'
        }))
        .pipe(myth())
        .pipe(csso())
        .pipe(gulp.dest('./build/css'));
    // js
    gulp.src(['./assets/js/**/*.js', '!./assets/js/vendor/**/*.js'])
        .pipe(concat('index.js'))
        .pipe(jshint())
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));

    // img
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));

    console.log('build task end');
});

// watch
gulp.task('watch', function() {   
    gulp.watch('./assets/css/**/*', ['css']);
    gulp.watch('./assets/js/**/*', ['js']);
    gulp.watch('./assets/img/**/*', ['images']);
    
    console.log('watch task end');
});