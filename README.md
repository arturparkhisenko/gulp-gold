# gulp-gold :wrench:, [npm link](https://www.npmjs.org/package/gulp-gold)
[![devDependency Status](https://david-dm.org/arturparkhisenko/gulp-gold/dev-status.svg)](https://david-dm.org/arturparkhisenko/gulp-gold#info=devDependencies) [![GitHub release](https://img.shields.io/github/release/arturparkhisenko/gulp-gold.svg)](https://github.com/arturparkhisenko/gulp-gold/releases) [![GitHub license](https://img.shields.io/github/license/arturparkhisenko/gulp-gold.svg)](https://github.com/arturparkhisenko/gulp-gold/blob/master/LICENSE.md)
> custom Gulp pack

## TL;DR
Used latest tools: Gulp4, Babel6, Webpack2, PostCSS
- Styles (css4) - [stylelint](http://stylelint.io/) -> [postCSS](https://www.npmjs.org/package/gulp-postcss)([postcss-import](https://www.npmjs.org/package/postcss-import), [postcss-url](https://www.npmjs.org/package/postcss-url), [cssnext](https://www.npmjs.org/package/postcss-cssnext)(autoprefixed), [cssnano](https://www.npmjs.org/package/cssnano))
- Scripts (es2015) - [eslint](https://www.npmjs.org/package/eslint) -> [webpack](https://webpack.github.io/)([babel-loader](https://www.npmjs.org/package/babel-loader), [uglify-js](https://www.npmjs.org/package/gulp-uglify))
- Images - minified/optimized([imagemin](https://www.npmjs.org/package/gulp-imagemin))
- [Browsersync](https://www.npmjs.com/package/browser-sync)
- Errors output improved by [plumber](https://www.npmjs.org/package/gulp-plumber)
- I hope You enjoy :)

## Installing
- You must have [nodejs](http://nodejs.org/) (includes [npm](https://www.npmjs.org/)) installed

```sh
$ sudo
$ npm i
```

This project uses Gulp4 so we have to use npm scripts using local gulp. You can add `./node_modules/.bin` to PATH, to use local gulp.

To install Gulp4 globally:

```sh
$ npm i -g gulpjs/gulp.git#4.0
```

## Usage
### npm scripts (using local gulp)
- `npm run build` just build with `NODE_ENV=production`
- `npm run dev` serving from `src`
- `npm run prod` serving from `dist`
- `npm run lint:styles`
- `npm run lint:scripts`

### gulp tasks (require gulp4 installed globally)
- `gulp serve` clean->lint->build->browsersync->watch in `src`
- `gulp` clean->lint->build
- `gulp lint:styles`
- `gulp lint:scripts`
- other tasks you can find in the [gulpfile](gulpfile.babel.js)

## Optional
- [normalize.css](https://github.com/necolas/normalize.css)

## [MIT License](LICENSE.md)
