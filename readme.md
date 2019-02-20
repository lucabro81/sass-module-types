# SASS MODULE TYPES
## A package for extract TypeScript Definition files from Sass files

This package was developed out of a need to extract classes from 
Sass `CSS Module` files. Specifically, to actually parse SASS code
and make available the classes that might be interpolated or 
partials included. For example:

```scss
$sections: 10;
@for $i from 1 to $sections {
  .section-#{$i} {
    transform: rotate(#{$i * 360 / $sections});
  }
}
```

yields 10 different classes. All these classes should be extracted.

The benefit of this is that you get IntelliSense code-completion
when you import a SCSS file.

Your tool chain will need to support importing Sass files. For example
Create React App supports this from version 2 onward.

## How it works

By default this package exposes a cli watcher that will compile
SASS files with the pattern `*.module.sass` anywhere in the `src`
directory. You can change this behavior using the cli options.

Here is the help menu

```
Usage: sass-module-types [options]

Options:
  -V, --version               output the version number
  -b, --base <path>           default base is ./src/**
  -i, --sass-include <paths>  list of paths to includedefault is src/
  -p, --pattern <pattern>     default pattern is *.module.scss
  -h, --help                  output usage information
```

## Installation

First add this package using npm

```bash
npm install @babakness/sass-modules-types --save-dev 
```

or yarn

```bash
yarn add  @babakness/sass-modules-types --dev
```

You can run the watcher from the commandline as follows

`node_modules/.bin/sass-module-types`

or

`npx sass-module-types`

## Configure package.json

If you want this watcher to run automatically when you start 
your project. You can use change your start up script to do so
for example in `package.json` you can replace

```json
"scripts": {
  "start": "react-scripts"
}
```

with the following on Linux, Unix, and MacOS platforms 

```json
"scripts": {
  "start": "(sass-module-types & react-scripts)"
}
```

Or you can use packages like `npm-run-all` or`concurrently` 
which offer better platform support.

```json
"scripts": {
  "start": "npm-run-all sass-module-types react-scripts"
}
```

## Hiding .scss.d.ts files in VS Code

You can hide the litter of TypeScript Definition Files on
`VS Code` by adding the following to the `settings.json`
file located under the `.vscode` and adding the following
to the `files.exclude` section:

```json
"files.exclude": {
  "src/**/*.module.scss.d.ts": true,
},
```