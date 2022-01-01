# gulp-gold :wrench:, [npm link](https://www.npmjs.org/package/gulp-gold)

[![GitHub release](https://img.shields.io/github/release/arturparkhisenko/gulp-gold.svg)](https://github.com/arturparkhisenko/gulp-gold/releases) [![dependencies Status](https://david-dm.org/arturparkhisenko/gulp-gold/dev-status.svg)](https://david-dm.org/arturparkhisenko/gulp-gold?type=dev) [![Known Vulnerabilities](https://snyk.io/test/github/arturparkhisenko/gulp-gold/badge.svg)](https://snyk.io/test/github/arturparkhisenko/gulp-gold) [![GitHub license](https://img.shields.io/github/license/arturparkhisenko/gulp-gold.svg)](https://github.com/arturparkhisenko/gulp-gold/blob/master/LICENSE.md)

> custom Gulp pack

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [TL;DR](#tldr)
- [Installing](#installing)
- [Usage](#usage)
  - [npm scripts](#npm-scripts)
  - [gulp tasks](#gulp-tasks)
- [Optional](#optional)
- [MIT License](#mit-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## TL;DR

Used latest tools: Gulp, Babel, Webpack, PostCSS, Prettier

- Styles - [stylelint](https://stylelint.io/) -> [postCSS](https://postcss.org/)([postcss-import](https://www.npmjs.com/package/postcss-import), [postcss-url](https://www.npmjs.com/package/postcss-url), [postcss-preset-env](https://www.npmjs.com/package/postcss-preset-env)(autoprefixed&cssnext), [cssnano](https://cssnano.co/))
- Scripts - [eslint](https://www.npmjs.com/package/eslint) -> [webpack](https://webpack.js.org)([babel-preset-env](https://www.npmjs.com/package/@babel/preset-env)) -> [prettier](https://prettier.io/)
- Images - [imagemin](https://www.npmjs.com/package/gulp-imagemin)
- [Browsersync](https://www.browsersync.io/)
- Errors output improved by [plumber](https://www.npmjs.com/package/gulp-plumber)
- I hope You will enjoy it :)

## Installing

- You must have [NodeJS](https://nodejs.org/en/) (includes [NPM](https://www.npmjs.com/)) installed

```shell
npm install --legacy-peer-deps
```

> "--legacy-peer-deps" is required because of Stylelint, it'll be resolved later

This project uses Gulp v.4 so we should have `gulp-cli` or `npx` (goes with NPM v5.3.0+) installed globally to use npm scripts using local Gulp:

```shell
npm install -g gulp-cli
```

## Usage

### npm scripts

- `npm run build` just build with `NODE_ENV=production`
- `npm run dev` or `npm start` serving from `src`
- `npm run prod` serving from `dist`
- `npm run lint`
- `npm run format`

### gulp tasks

> requires `gulp-cli` to be installed globally

- `gulp serve` clean->lint->build->browsersync->watch in `src`
- `gulp` clean->lint->build
- `gulp lintStyles`
- `gulp lintScripts`
- other tasks you can find in the [gulpfile](gulpfile.js)

## Optional

- [normalize.css](https://github.com/necolas/normalize.css)
- [sanitize.css](https://github.com/csstools/sanitize.css)
  - [Marx, on top of sanitize.css](https://github.com/mblode/marx)
- [Cleanslate](https://github.com/premasagar/cleanslate)
- [Typeset.css](https://github.com/joshuarudd/typeset.css)
- [CSS Mini Reset](https://github.com/vladocar/CSS-Mini-Reset)

## [MIT License](LICENSE.md)
