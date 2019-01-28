module.exports = {

	environments: {
		grind: {
			globals: require('./globals')
		}
	},

	rules: {
		'empty-array': require('./rules/empty-array'),
		'empty-object': require('./rules/empty-object')
	}

}
