# gulp-gold :wrench:, [npm link](https://www.npmjs.org/package/gulp-gold)

[![GitHub license](https://img.shields.io/github/license/arturparkhisenko/gulp-gold.svg)](https://github.com/arturparkhisenko/gulp-gold/blob/master/LICENSE.md) [![GitHub release](https://img.shields.io/github/release/arturparkhisenko/gulp-gold.svg)](https://github.com/arturparkhisenko/gulp-gold/releases) [![dependencies Status](https://david-dm.org/arturparkhisenko/gulp-gold/status.svg)](https://david-dm.org/arturparkhisenko/gulp-gold) [![Known Vulnerabilities](https://snyk.io/test/github/arturparkhisenko/gulp-gold/badge.svg)](https://snyk.io/test/github/arturparkhisenko/gulp-gold)

> custom Gulp pack

## TL;DR

Used latest tools: Gulp, Babel, Webpack, PostCSS

- Styles (css4) - [stylelint](http://stylelint.io/) -> [postCSS](https://www.npmjs.org/package/gulp-postcss)([postcss-import](https://www.npmjs.org/package/postcss-import), [postcss-url](https://www.npmjs.org/package/postcss-url), [cssnext](https://www.npmjs.org/package/postcss-cssnext)(autoprefixed), [cssnano](https://www.npmjs.org/package/cssnano))
- Scripts (es2015+) - [eslint](https://www.npmjs.org/package/eslint) -> [webpack](https://webpack.js.org)([babel-loader](https://www.npmjs.org/package/babel-loader), [babel-preset-env](https://www.npmjs.com/package/babel-preset-env), [uglify-js](https://www.npmjs.org/package/gulp-uglify))
- Images - minified/optimized([imagemin](https://www.npmjs.org/package/gulp-imagemin))
- [Browsersync](https://www.npmjs.com/package/browser-sync)
- Errors output improved by [plumber](https://www.npmjs.org/package/gulp-plumber)
- I hope You enjoy :)

## Installing

- You must have [nodejs](https://nodejs.org/) (includes [npm](https://www.npmjs.org/)) installed

```sh
$ sudo
$ npm i
```

This project uses Gulp4 so we should have `gulp-cli` or `npx` (goes with npm v5.3.0+) installed globally to use npm scripts using local gulp:

```sh
$ npm i -g gulp-cli
```

## Usage

### npm scripts (using local gulp)

- `npm run build` just build with `NODE_ENV=production`
- `npm run dev` or `npm start` serving from `src`
- `npm run prod` serving from `dist`
- `npm run lintStyles`
- `npm run lintScripts`

### gulp tasks (require gulp-cli installed globally)

- `gulp serve` clean->lint->build->browsersync->watch in `src`
- `gulp` clean->lint->build
- `gulp lintStyles`
- `gulp lintScripts`
- other tasks you can find in the [gulpfile](gulpfile.js)

## Optional

- [normalize.css](https://github.com/necolas/normalize.css)

## [MIT License](LICENSE.md)
