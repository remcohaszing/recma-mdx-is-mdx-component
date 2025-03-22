import assert from 'node:assert/strict'
import { test } from 'node:test'

import { compile, evaluate } from '@mdx-js/mdx'
import recmaPluginIsMdxComponent from 'recma-mdx-is-mdx-component'

// eslint-disable-next-line no-empty-function
function noop() {}

test('define isMDXComponent', async () => {
  const { value } = await compile('', { recmaPlugins: [recmaPluginIsMdxComponent] })

  assert.equal(
    value,
    [
      'import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";',
      '(MDXContent.isMDXComponent = true);',
      'function _createMdxContent(props) {',
      '  return _jsx(_Fragment, {});',
      '}',
      'export default function MDXContent(props = {}) {',
      '  const {wrapper: MDXLayout} = props.components || ({});',
      '  return MDXLayout ? _jsx(MDXLayout, {',
      '    ...props,',
      '    children: _jsx(_createMdxContent, {',
      '      ...props',
      '    })',
      '  }) : _createMdxContent(props);',
      '}',
      ''
    ].join('\n')
  )
})

test('Can be evaluated', async () => {
  const module = await evaluate('', {
    recmaPlugins: [recmaPluginIsMdxComponent],
    Fragment: noop,
    jsx: noop,
    jsxs: noop
  })

  // @ts-expect-error The type definitions don’t understand this property.
  assert.equal(module.default.isMDXComponent, true)
})
