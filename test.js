import assert from 'node:assert/strict'
import { test } from 'node:test'

import { compile, evaluate } from '@mdx-js/mdx'
import { recmaPluginInjectisMDXComponent } from 'recma-mdx-is-mdx-component'

// eslint-disable-next-line no-empty-function
function noop() {}

test('define isMDXComponent', async () => {
  const { value } = await compile('', { recmaPlugins: [recmaPluginInjectisMDXComponent] })

  assert.equal(
    value,
    [
      '/*@jsxRuntime automatic @jsxImportSource react*/',
      'MDXContent.isMDXComponent = true;',
      'import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";',
      'function _createMdxContent(props) {',
      '  return _jsx(_Fragment, {});',
      '}',
      'function MDXContent(props = {}) {',
      '  const {wrapper: MDXLayout} = props.components || ({});',
      '  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {',
      '    children: _jsx(_createMdxContent, props)',
      '  })) : _createMdxContent(props);',
      '}',
      'export default MDXContent;',
      ''
    ].join('\n')
  )
})

test('Can be evaluated', async () => {
  const module = await evaluate('', {
    recmaPlugins: [recmaPluginInjectisMDXComponent],
    Fragment: noop,
    jsx: noop,
    jsxs: noop
  })

  // @ts-expect-error The type definitions don’t understand this property.
  assert.equal(module.default.isMDXComponent, true)
})
