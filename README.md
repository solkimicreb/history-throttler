# History Throttler

[![Build](https://img.shields.io/circleci/project/github/solkimicreb/history-throttler/master.svg)](https://circleci.com/gh/solkimicreb/history-throttler/tree/master) [![Package size](http://img.badgesize.io/https://unpkg.com/history-throttler/dist/umd.es6.min.js?compression=gzip)](https://unpkg.com/history-throttler/dist/umd.es6.min.js) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Version](https://img.shields.io/npm/v/history-throttler.svg)](https://www.npmjs.com/package/history-throttler) [![Dependencies Status](https://david-dm.org/solkimicreb/history-throttler/status.svg)](https://david-dm.org/solkimicreb/history-throttler) [![License](https://img.shields.io/npm/l/history-throttler.svg)](https://www.npmjs.com/package/history-throttler)

*Accidentally pushing multiple new history items in quick succession is a common error in web apps. It breaks the history navigation and leads to frustrated users. History Throttler provides a simple fix for this issue.*

<details>
<summary><strong>Table of Contents</strong></summary>
<!-- Do not edit the Table of Contents, instead regenerate with `npm run build-toc` -->

<!-- toc -->

* [Installation](#installation)
* [Usage](#usage)
  + [Quick fixing broken apps](#quick-fixing-broken-apps)
* [Platform support](#platform-support)
* [Alternative builds](#alternative-builds)
* [Contributing](#contributing)

<!-- tocstop -->

</details>

## Installation

`npm install history-throttler`

## Usage

History Throttler exposes an alternative to the native `history.pushState`, that does the following.

- It has the exact same arguments as [history.pushState](https://developer.mozilla.org/en/docs/Web/API/History).

- It calls `history.pushState`, if no new history item was added since the last repaint and the document is fully loaded.

- It calls `history.replaceState` otherwise.

As a result it never pushes more than one history item between two repaints, but it keeps the history fresh all the time.

```js
import pushState from 'history-throttler'

// this adds a new history item
pushState({ historyProp: 'value' }, 'title', 'url')
// this replaces the above item, instead of adding a new
pushState({ historyProp: 'otherValue' }, 'title2', 'url/2')
```

### Quick fixing broken apps

Simply overwrite `history.pushState` to fix unwanted double-history-entry issues in your app.

```js
import pushState from 'history-throttler'

history.pushState = pushState
```

**This only works if your routing solution uses the HTML5 History API, it does not work with older hashbang based solutions.**

## Platform support

- Chrome: 23 and above
- Firefox: 24 and above
- Safari: 7 and above
- Opera: 15 and above
- Edge: 12 and above
- IE: 10 and above

## Alternative builds

This library detects if you use ES6 or commonJS modules and serve the right format to you. The exposed bundles are transpiled to ES5 to support common tools - like UglifyJS minifying. If you would like a finer control over the provided build, you can specify them in your imports.

- `history-throttler/dist/es.es6.js` exposes an ES6 build with ES6 modules.
- `history-throttler/dist/es.es5.js` exposes an ES5 build with ES6 modules.
- `history-throttler/dist/cjs.es6.js` exposes an ES6 build with commonJS modules.
- `history-throttler/dist/cjs.es5.js` exposes an ES5 build with commonJS modules.

If you use a bundler, set up an alias for `history-throttler` to point to your desired build. You can learn how to do it with webpack [here](https://webpack.js.org/configuration/resolve/#resolve-alias) and with rollup [here](https://github.com/rollup/rollup-plugin-alias#usage).

## Contributing

Contributions are always welcome. Just send a PR against the master branch or open a new issue. Please make sure that the tests and the linter pass. Thanks!
