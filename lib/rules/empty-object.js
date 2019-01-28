module.exports = {

	meta: {

		type: 'layout',

		docs: {
			description: 'Enforce a single space between empty object braces',
			category: 'Stylistic Issues'
		},

		fixable: 'whitespace',

		schema: [
			{ enum: [ 'always', 'never' ] }
		],

		messages: {
			singleSpace: 'Braces for empty objects should be separated by a single space.',
			singleLine: 'Braces for empty objects should appear on the same line.'
		}

	},

	create(context) {
		const sourceCode = context.getSourceCode()

		function reportInvalidLines(node, token) {
			context.report({
				node,
				loc: token.loc.start,
				messageId: 'singleLine',
				data: {
					tokenValue: token.value
				},
				fix(fixer) {
					const nextToken = sourceCode.getTokenAfter(token)

					return fixer.removeRange([ token.range[1], nextToken.range[0] ])
				}
			})
		}

		function reportInvalidSpacing(node, token) {
			context.report({
				node,
				loc: token.loc.start,
				messageId: 'singleSpace',
				data: {
					tokenValue: token.value
				},
				fix(fixer) {
					const previousToken = sourceCode.getTokenBefore(token)

					return fixer.removeRange([ previousToken.range[1], token.range[0] ])
				}
			})
		}

		function validateObjectSpacing(node) {
			// console.log('testing', node)
			if(node.properties.length !== 0) {
				return
			}

			const first = sourceCode.getFirstToken(node)
			const last = node.typeAnnotation
				? sourceCode.getTokenBefore(node.typeAnnotation)
				: sourceCode.getLastToken(node)

			if(first.loc.start.line !== last.loc.end.line) {
				reportInvalidLines(node, first)
			}

			if(first.end + 1 !== last.start) {
				reportInvalidSpacing(node, last)
			}
		}

		return {
			ObjectPattern: validateObjectSpacing,
			ObjectExpression: validateObjectSpacing
		}
	}

}
