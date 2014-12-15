##Custom Gulp pack

###What this pack do:
* Styles (scss, sass, css) - linted([csslint](https://www.npmjs.org/package/gulp-csslint)), autoprefixed([myth](https://www.npmjs.org/package/gulp-myth)), minified([csso](https://www.npmjs.org/package/gulp-csso)), [concatenated](https://www.npmjs.org/package/gulp-concat), [gulp-sass](https://www.npmjs.org/package/gulp-sass)
* Scripts (js) - hinted([jshint](https://www.npmjs.org/package/gulp-jshint)), autofixed([fixmyjs](https://www.npmjs.org/package/gulp-fixmyjs)), minified([uglify](https://www.npmjs.org/package/gulp-uglify)), [concatenated](https://www.npmjs.org/package/gulp-concat), ES6 to ES5([gulp-6to5](https://www.npmjs.com/package/gulp-6to5))
* Images (img) - minified([imagemin](https://www.npmjs.org/package/gulp-imagemin))
* LiveReload - by [gulp-livereload](https://www.npmjs.com/package/gulp-livereload) and [gulp-connect](https://www.npmjs.com/package/gulp-connect)
* On error its shows error output by [plumber](https://www.npmjs.org/package/gulp-plumber)
I hope You enjoy :)

###Installing
* You must have installed [nodejs](http://nodejs.org/) and [npm](https://www.npmjs.org/)

```sh
$ sudo
$ npm install gulp -g
$ npm install gulp gulp-csso gulp-myth gulp-csslint gulp-jshint gulp-uglify gulp-imagemin gulp-rename gulp-concat gulp-plumber del gulp-sourcemaps gulp-fixmyjs gulp-livereload gulp-connect gulp-sass gulp-6to5 --save-dev
```
* gulp-imagemin require npm2+, so u can update this by changing directory to nodejs folder and call `$ npm install npm`

###Usage
* clean->build->watch+LR: `$ gulp`
* only clean: `$ gulp clean`

###Optional
* [normalize.css modified](https://github.com/ikeagold/normalize.css) (download latest)

###License
MIT
[gulp-gold npm package link](https://www.npmjs.org/package/gulp-gold)
