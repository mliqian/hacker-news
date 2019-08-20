# Hacker News

Build a project from very scratch.

## Init
Create a directory for this project.

I'm going to use [React](https://reactjs.org/). Using `<script>` is an option, but [npm](https://www.npmjs.com/) seems to be a more popular choice. So ...

In order to use npm:

```shell
npm init -y
```

Install React:

```shell
npm install react react-dom
```

Create `src/index.html` and `src/index.js`.

Add `<script>` tag to load `index.js`, and a root element as container:

```html
<div id="root"></div>
<script src="index.js"></script>
```

To use React, import it in `index.js`

```js
import React from 'react';
```

In the browser, an error occur: 

```error
Uncaught SyntaxError: Unexpected identifier
```

Seems like the browser doesn't support import syntax yet.

Use [webpack](https://webpack.js.org/) to fix this. But before that, dealing with code format manually is a little annoying, and I don't have a strong bias of which format to use.

### Prettier

[Prettier](https://prettier.io/) is a nice solution. Since this is my own project, there is no need to force somebody to use it. So I'm going to use [Visual Studio Code](https://code.visualstudio.com/)'s  [prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), instead of installing prettier package locally.

In editor's setting panel, turn on `Prettier: Require Config` and `Editor: Format On Save`. This way, only project with `.prettierrc` or [other configuration file](https://prettier.io/docs/en/configuration.html) will "format on save".

Create `.prettierrc` file and add following:

```json
{}
```

Just an empty object. Default setting is fine.

At this point, it's probably a good idea to install [ESLint](https://eslint.org/) as well.

### ESLint

Install

```shell
npm install eslint --save-dev
```

Add configuration file:

```shell
npx eslint --init
```

Follow the instructions. Notice that webpack uses node, so under the question "Where does your code run?" Select both "Browser" and "Node".

Install VSCode [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Restart  to enable plugin (show the red underline).

I don't have a code style now. Maybe use a extension is a good choice, like [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb). Will see if needed along the way.

Now back to the syntax error.

### Webpack

Install

```shell
npm install webpack webpack-cli --save-dev
```

`webpack` is the core. `webpack-cli` is for running commands.

To run those commands, add scripts in `package.json`

```json
"scripts": {
  "build": "webpack"
}
```

Just run this script, see what happened.

```shell
npm run build
```

No Error! A filed is generated at `dist/main.js`. It's a complex minified js file.

Since webpack 4, no config is needed. The default behavior is to find file at `src/index.js`(entry), and bundle everything into `dist/main.js`(output).

But more complex config will be needed, so a config file is fine.

Create config file `webpack.config.js`. Add entry and output config

```js
module.exports = {
  entry: './src/index.js',
  output: './dist/main.js' // wrong, see below
}
```

Same as default, but explicit.

Webpack use the entry file as a starting point. Then find all the dependencies based on statements like `import`.

After `npm run build` and some modification, two errors were found:

```
1. configuration.output should be an object.
2. The output directory as **absolute path** (required)
```

Fix it.

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

Use `path` package to generate absolute path. 

No error now but a warning.

```
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
```

This is why the generated `main.js` file is minified.

Add mode config.

```js
{
	mode: "development"
}
```

Everything works fine now.







```shell
npm install --save-dev --save-exact prettier
```

According to the [guide](https://prettier.io/docs/en/install.html):

> We recommend pinning an exact version of prettier in your `package.json` as we introduce stylistic changes in patch releases.







