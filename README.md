
# webapp-exercise

![iOS Safari](https://github.com/alrra/browser-logos/raw/master/src/safari-ios/safari-ios_48x48.png) | ![Android WebView](https://github.com/alrra/browser-logos/raw/master/src/android/android_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- |
iOS 7+ ✔ | Android 4+ ✔ | 11+ ✔ |

A web app project based on [webcube](https://github.com/dexteryy/webcube)

## Structure

- **configs/** - Project-defined configuration files and build scripts
  - `env.sample.config` - Project-defined template file for [env.config](custom.env.sample.config)
- **app/** - All source code for web app (shared between client-side and server-side), including JS, CSS and assets
  - **common/** - Reusable code shared between entry points
    - **components/** - [Presentational components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.3o294zvoz) shared between entry points
    - ...
  - _**job-list/**_ - An entry point. See [Multiple entry points](#multiple-entry-points-optional)
    - **common/** - Reusable code shared between feature sets
      - **components/** - [Presentational components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.3o294zvoz) shared between feature sets
      - ...
    - **main/** - The default/global feature set
      - **components/** - [Presentational components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.3o294zvoz) only used by this feature set
      - **containers/** - [Container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.3o294zvoz) only used by this feature set
        - `App.jsx`
      - ...
    - ...
    - `index.js`
  - ...
- **staticweb/** - For static web deployment or testing
  - _**job-list/**_
    - `index.html`, `deploy.js`, `deploy.scss`
  - ...
- **build/**
  - **public/** - Generated by Gulp and Webpack, do not manually modify
- ...
- `index.js` - For single entry point, imported by other projects
- `package.json` - dependencies and npm scripts based on [webcube](https://github.com/dexteryy/webcube)
- `yarn.lock` - [yarn](https://yarnpkg.com)'s lockfile
- `env.config` - Project-defined configuration options for webcube and custom scripts. See [Getting Started](#getting-started)

## Getting Started

#### Step 1
First of all, you must create an `env.config` file in the root directory. [`configs/env.sample.config`][custom.env.sample.config] is a complete template file for `env.config`

```
cp ./configs/env.sample.config env.config
```

#### Step 2

Install dependencies:

<!-- > NOTE: Yarn is not recommended -->
```bash
yarn
```

#### Step 3

Follow [webcube's document](https://github.com/dexteryy/webcube#how-to-build-the-web-app) to install / build / test / deploy / ...

## Other Conventions

#### Code Style

Similiar to [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)

More detail:

* [`.eslintrc.yml`](https://github.com/dexteryy/webcube-example/blob/master/.eslintrc.yml)
* [`.flowconfig`](https://github.com/dexteryy/webcube-example/blob/master/.flowconfig)
* [`.stylelintrc`](https://github.com/dexteryy/webcube-example/blob/master/.stylelintrc)
* [`.csscomb.json`](https://github.com/dexteryy/webcube-example/blob/master/.csscomb.json)
* [`.htmlhintrc`](https://github.com/dexteryy/webcube-example/blob/master/.htmlhintrc)

#### Recommended Editor/IDE

* [Atom](atom.io/) + following plugins:
  * [language-babel](https://atom.io/packages/language-babel)
  * [linter](https://atom.io/packages/linter) + [linter-eslint](https://atom.io/packages/linter-eslint) + [linter-flow](https://atom.io/packages/linter-flow) + [linter-htmlhint](https://atom.io/packages/linter-htmlhint)
  * [editorconfig](https://atom.io/packages/editorconfig)
  * [toggle-quotes](https://atom.io/packages/toggle-quotes) + [vim-surround](https://atom.io/packages/vim-surround)
  * [auto-detect-indentation](https://atom.io/packages/auto-detect-indentation) + [resize-indent](https://atom.io/packages/resize-indent)
  * [atom-css-comb](https://atom.io/packages/atom-css-comb)

Recommended Settings for Atom (config.cson):

```json
"linter":
  ignoreVCSIgnoredFiles: false
  lintOnFly: false
"linter-stylelint":
  disableWhenNoConfig: true
"language-babel":
  transpileOnSave: false
"atom-css-comb":
  projectConfigs: ".csscomb"
  readyMadeConfigs: "csscomb"
"whitespace":
  ignoreWhitespaceOnCurrentLine: false
"trailing-spaces":
  enableForCursorLines: true
```

#### Git Hooks

* pre-commit: `npm run lint`
* pre-push: `npm run build`

#### Committing Changes with [Commitizen](https://www.npmjs.com/package/commitizen)

> NOTE: Need `npm install commitizen -g`

```
git add .
git cz
```

[package.json]: https://github.com/dexteryy/webcube-example/blob/master/package.json
[env.sample.config]: https://github.com/dexteryy/webcube/blob/master/src/configs/env.sample.config
[custom.env.sample.config]: https://github.com/dexteryy/webcube-example/blob/master/configs/env.sample.config
[webpack.config]: https://github.com/dexteryy/webcube/blob/master/src/configs/webpack.config.babel.js
[custom.webpack.config]: https://github.com/dexteryy/webcube-example/blob/master/configs/webpack.config.babel.js
[gulpfile]: https://github.com/dexteryy/webcube/blob/master/src/configs/gulpfile.babel.js
[custom.gulpfile]: https://github.com/dexteryy/webcube-example/blob/master/configs/gulpfile.babel.js
[plopfile]: https://github.com/dexteryy/webcube/blob/master/src/configs/plopfile.babel.js
[custom.plopfile]: https://github.com/dexteryy/webcube-example/blob/master/configs/plopfile.babel.js
[karmaconf]: https://github.com/dexteryy/webcube/blob/master/src/configs/karma.conf.babel.js
[gitignore]: https://github.com/dexteryy/webcube-example/blob/master/.gitignore