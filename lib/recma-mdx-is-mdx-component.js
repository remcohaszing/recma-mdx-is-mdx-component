/**
 * @import { Program } from 'estree'
 * @import { Plugin, Transformer } from 'unified'
 */

import { define } from 'unist-util-mdx-define'

/**
 * @type {Transformer<Program>}
 */
const transformer = (ast, file) => {
  define(ast, file, { isMDXComponent: { type: 'Literal', value: true } }, { export: 'namespace' })
}

/**
 * @type {Plugin<[], Program>}
 *
 * A recma plugin to define the `isMDXComponent` property on MDX components.
 */
const recmaMdxIsMdxComponent = () => transformer

export default recmaMdxIsMdxComponent
