/**
 * @import { Program } from 'estree'
 * @import { Plugin } from 'unified'
 */

/**
 * Inserty a conditional assignment of `MDXContent.isMDXComponent = true` in the AST.
 *
 * @param {Program} ast
 *   The AST to transform.
 * @returns {undefined}
 */
function transformer(ast) {
  // This needs to be defined before the return statement if the user uses evaluate()
  ast.body.unshift({
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: {
        type: 'MemberExpression',
        object: { type: 'Identifier', name: 'MDXContent' },
        property: { type: 'Identifier', name: 'isMDXComponent' },
        computed: false,
        optional: false
      },
      right: { type: 'Literal', value: true }
    }
  })
}

/**
 * @type {Plugin<[], Program>}
 *
 * A recma plugin to define the `isMDXComponent` property on MDX components.
 */
const recmaMdxIsMdxComponent = () => transformer

export default recmaMdxIsMdxComponent
