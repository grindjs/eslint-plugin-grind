const test = require('ava')
const RuleTester = require('eslint-ava-rule-tester')
const rule = require('../../lib/rules/empty-object')

const ruleTester = new RuleTester(test, {
	env: {
		es6: true
	}
})

ruleTester.run('empty-object', rule, {
	valid: [
		{ code: 'const value = { }' },
		{ code: 'const value = { a }' },
		{ code: 'const value = { a: { } }' },
		{ code: 'const value = { a, b, c }' },
		{ code: 'const value = { a: "b" }' },
		{ code: 'function f(val = { }) { }' },
		{ code: 'function f(val = { a: { } }) { }' },
		{ code: 'function f({ a = { } } = { }) { }' }
	],

	invalid: [
		{
			code: 'const value = {}',
			errors: [{
				message: 'Braces for empty objects should be separated by a single space.',
				type: 'ObjectExpression'
			}]
		}, {
			code: 'const value = {  }',
			errors: [{
				message: 'Braces for empty objects should be separated by a single space.',
				type: 'ObjectExpression'
			}]
		}, {
			code: 'const value = {\n}',
			errors: [{
				message: 'Braces for empty objects should appear on the same line.',
				type: 'ObjectExpression'
			}]
		}, {
			code: 'function f(val = {}) { }',
			errors: [{
				message: 'Braces for empty objects should be separated by a single space.',
				type: 'ObjectExpression'
			}]
		}, {
			code: 'function f(val = { a: {} }) { }',
			errors: [{
				message: 'Braces for empty objects should be separated by a single space.',
				type: 'ObjectExpression'
			}]
		}, {
			code: 'function f({ a = {} } = {}) { }',
			errors: [
				{
					message: 'Braces for empty objects should be separated by a single space.',
					type: 'ObjectExpression'
				}, {
					message: 'Braces for empty objects should be separated by a single space.',
					type: 'ObjectExpression'
				}
			]
		}
	]
})
