module.exports = {
	build_dir: 'build',
	compile_dir: 'bin',

	app_files: {
		js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
		css: [ 'src/**/*.scss' ]
	}
}
