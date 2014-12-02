##Custom Gulp pack

### What this pack do:
* Styles (css) - linted([csslint](https://www.npmjs.org/package/gulp-csslint)), autoprefixed([myth](https://www.npmjs.org/package/gulp-myth)), minified([csso](https://www.npmjs.org/package/gulp-csso)), [concatenated](https://www.npmjs.org/package/gulp-concat)
* Scripts (js) - hinted([jshint](https://www.npmjs.org/package/gulp-jshint)), autofixed([fixmyjs](https://www.npmjs.org/package/gulp-fixmyjs)), minified([uglify](https://www.npmjs.org/package/gulp-uglify)), [concatenated](https://www.npmjs.org/package/gulp-concat)
* Images (img) - minified([imagemin](https://www.npmjs.org/package/gulp-imagemin))
* On error its shows error output by [plumber](https://www.npmjs.org/package/gulp-plumber)
I hope You enjoy :)

###Installing
* You must have installed [nodejs](http://nodejs.org/) and [npm](https://www.npmjs.org/)

```sh
$ sudo npm install gulp -g
$ npm install gulp gulp-csso gulp-myth gulp-csslint gulp-jshint gulp-uglify gulp-imagemin gulp-rename gulp-concat gulp-plumber del gulp-sourcemaps gulp-fixmyjs --save-dev
```

###Usage
* build: `$ gulp`
* watch: `$ gulp watch`
* clean: `$ gulp clean`

###Optional
* [normalize.css modified](https://github.com/ikeagold/normalize.css) (download latest)

###License
MIT
[gulp-gold npm package link](https://www.npmjs.org/package/gulp-gold)
