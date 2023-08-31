/**
 * Inserty a conditional assignment of `MDXContent.isMdxComponent = true` in the AST.
 *
 * @param {import('estree').Program} ast
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
        property: { type: 'Identifier', name: 'isMdxComponent' },
        computed: false,
        optional: false
      },
      right: { type: 'Literal', value: true }
    }
  })
}

/**
 * @type {import('unified').Plugin<[], import('estree').Program>}
 *
 * A recma plugin to define the `isMdxComponent` property on MDX components.
 */
export const recmaPluginInjectIsMdxComponent = () => transformer
