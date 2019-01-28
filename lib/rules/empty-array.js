module.exports = {

	meta: {

		type: 'layout',

		docs: {
			description: 'Enforce a single space between empty array brackets',
			category: 'Stylistic Issues'
		},

		fixable: 'whitespace',

		schema: [
			{ enum: [ 'always', 'never' ] }
		],

		messages: {
			singleSpace: 'Brackets for empty arrays should be separated by a single space.',
			singleLine: 'Brackets for empty arrays should appear on the same line.'
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

		function validateArraySpacing(node) {
			if(node.elements.length !== 0) {
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
			ArrayPattern: validateArraySpacing,
			ArrayExpression: validateArraySpacing
		}
	}

}
