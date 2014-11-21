module.exports = {
	build_dir: 'dist',
	compile_dir: 'bin',

	app_files: {
		js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
		views: [ 'src/**/*.html' ],
		css: [ 'src/**/*.scss' ]
	},

	vendor_files: {
		js: [
		],
		css: [
		],
		assets: [
		]
	},
}
