const test = require('ava')
const RuleTester = require('eslint-ava-rule-tester')
const rule = require('../../lib/rules/empty-array')

const ruleTester = new RuleTester(test)

ruleTester.run('empty-array', rule, {
    valid: [
        {
            code: '[ ]'
        }, {
            code: '[ 1 ]'
        }, {
            code: '[ 1, 2, 3 ]'
        }
    ],

    invalid: [
        {
            code: '[]',
            errors: [{
                message: 'Brackets for empty arrays should be separated by a single space.',
                type: 'ArrayExpression'
            }]
        }, {
            code: '[  ]',
            errors: [{
                message: 'Brackets for empty arrays should be separated by a single space.',
                type: 'ArrayExpression'
            }]
        }, {
            code: '[\n]',
            errors: [{
                message: 'Brackets for empty arrays should appear on the same line.',
                type: 'ArrayExpression'
            }]
        }
    ]
})
