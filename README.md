# recma-mdx-is-mdx-component

[![github actions](https://github.com/remcohaszing/recma-mdx-is-mdx-component/actions/workflows/ci.yaml/badge.svg)](https://github.com/remcohaszing/recma-mdx-is-mdx-component/actions/workflows/ci.yaml)
[![npm version](https://img.shields.io/npm/v/recma-mdx-is-mdx-component)](https://www.npmjs.com/package/recma-mdx-is-mdx-component)
[![npm downloads](https://img.shields.io/npm/dm/recma-mdx-is-mdx-component)](https://www.npmjs.com/package/recma-mdx-is-mdx-component)
[![codecov](https://codecov.io/gh/remcohaszing/recma-mdx-is-mdx-component/branch/main/graph/badge.svg)](https://codecov.io/gh/remcohaszing/recma-mdx-is-mdx-component)

A recma plugin to define the `isMDXComponent` property on MDX components.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Compatibility](#compatibility)
- [License](#license)

## Installation

```sh
npm install recma-mdx-is-mdx-component
```

## Usage

This recma plugin assigns `true` to the property `MDXContent.isMDXComponent`.

For example, given a file named `example.mdx` with the following contents:

```mdx
Some MDX content
```

The following script:

```js
import { readFile } from 'node:fs/promises'

import { compile } from '@mdx-js/mdx'
import recmaPluginInjectisMDXComponent from 'recma-mdx-is-mdx-component'

const { contents } = await compile(await readFile('example.mdx'), {
  jsx: true,
  recmaPlugins: [recmaPluginInjectisMDXComponent]
})
console.log(contents)
```

Roughly yields:

```jsx
MDXContent.isMDXComponent = true
export default function MDXContent() {
  return <p>Some MDX content</p>
}
```

## API

The default export is a recma plugin. It takes no options.

## Compatibility

This project is compatible with Node.js 20 or greater.

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)
