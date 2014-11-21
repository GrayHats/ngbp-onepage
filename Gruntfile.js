module.exports = function (grunt) {

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-conventional-changelog');
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-ngmin');
	grunt.loadNpmTasks('grunt-html2js');

	var usrConfig = require('./config.js');

	var taskConfig = {
		pkg: grunt.file.readJSON("package.json"),

		meta: {
			banner:
			'/**\n' +
			' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * <%= pkg.homepage %>\n' +
			' *\n' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
			' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
			' */\n'
		},

		// clean work dir
		clean: [
			'<%= build_dir %>',
			'<%= compile_dir %>'
		],

		// sass
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/styles',
					src: ['*.scss'],
					dest: 'dist/css',
					ext: '.css'
				}]
			}
		},

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
			},
			csssrc: {
				files: [
					'<%= app_files.css %>'
				],
				tasks: [ 'sass' ]
			}
		}
	};

	grunt.initConfig( grunt.util._.extend( taskConfig, usrConfig ) );

	grunt.renameTask( 'watch', 'delta' );
	grunt.registerTask( 'watch', [ 'build', 'delta' ] );

	grunt.registerTask( 'build', [
		'clean', 'jshint', 'sass'
	]);

};
