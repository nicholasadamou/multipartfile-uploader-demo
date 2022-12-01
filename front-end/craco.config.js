const path = require(`path`);

const webpack = require('webpack');

module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src/'),
		},
		plugins: {
			add: [
				new webpack.ProvidePlugin({
					Buffer: ['buffer', 'Buffer']
				})
			]
		}
	},
};
