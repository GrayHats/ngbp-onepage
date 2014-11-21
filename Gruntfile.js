module.exports = function (grunt) {

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-conventional-changelog');
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-ngmin');
	grunt.loadNpmTasks('grunt-html2js');

	var usrConfig = require('./config.js');

	var taskConfig = {
		pkg: grunt.file.readJSON("package.json"),

		// clean work dir
		clean: [
			'<%= build_dir %>',
			'<%= compile_dir %>'
		],

		// jshint
		jshint: {
			src: [
				'<%= app_files.js %>'
			],
			options: {
				curly: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true,
				boss: true,
				eqnull: true
			},
			globals: {}
		},

		// delta watch
		delta: {
			options: { livereload: true },
			jssrc: {
				files: [
					'<%= app_files.js %>'
				],
				tasks: [ 'jshint:src' ]
			}
		}
	};

	grunt.initConfig( grunt.util._.extend( taskConfig, usrConfig ) );

	grunt.renameTask( 'watch', 'delta' );
	grunt.registerTask( 'watch', [ 'build', 'delta' ] );

	grunt.registerTask( 'build', [
		'clean'
	]);
};
