module.exports = function (grunt) {

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-jsinspect');

	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-ngmin');

	var usrConfig = require('./config.js');

	var taskConfig = {
		pkg: grunt.file.readJSON("package.json"),

		meta: {
			bannerjs:
			'/**\n' +
			' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' */\n',
			bannercss:
			'/** <%= pkg.name %> */'
		},

		// changelog
		// grunt.loadNpmTasks('grunt-changelog');
		/*
		changelog: {
			sample: {
				options: {
					dest: 'CHANGELOG.md',
					template: '{{date}} {{pkg.version}} \n\n{{> features}}{{> fixes}}',
					partials: {
						features: '{{#each features}}{{> feature}}{{/each}}',
						feature: '[NEW] {{this}}\n',
						fixes: '{{#each fixes}}{{> fix}}{{/each}}',
						fix: '[FIX] {{this}}\n'
					}
				}
			}
		},
		*/

		// clean work dir
		clean: [
			'<%= build_dir %>',
			'<%= compile_dir %>'
		],

		// concat
		concat: {
			build_css: {
				src: [
					'<%= vendor_files.css %>',
					'<%= build_dir %>/src/css/*.css'
				],
				dest: '<%= build_dir %>/src/assets/style.css'
			}
		},

		// copy
		copy: {
			build_appjs: {
				files: [
					{
						src: [ '<%= app_files.js %>' ],
						dest: '<%= build_dir %>/',
						//cwd: '.',
						expand: true
					}
				]
			},
			build_views: {
				files: [
					{
						src: [ '<%= app_files.views %>' ],
						dest: '<%= build_dir %>/',
						expand: true
					}
				]
			}
		},

		// sass
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/styles',
					src: ['*.scss'],
					dest: 'dist/src/css',
					ext: '.css'
				}]
			}
		},


		// uglify
		uglify: {
			compile_js: {
				options: {
					//banner: '<%= meta.bannerjs %>',
					mangle:false
				},
				files: {
					'<%= build_dir %>/src/js/app.min.js': [ '<%= build_dir %>/src/app/**/*.js' ]
				}
			}
		},

		// cssmin
		cssmin: {
			compile_css: {
				options: {
					banner: '<%= meta.bannercss %>'
				},
				files: {
					'<%= concat.build_css.dest %>': '<%= concat.build_css.dest %>'
				}
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

        jsinspect: {
            examples: {
                options: {
                    threshold:   30,
                    diff:        true,
                    identifiers: false,
                    failOnMatch: true,
                    suppress:    100,
                    reporter:    'default'
                },
                src: [
                    'src/**/*.js',
                    '!**/node_modules/**'
                ]
            }
        },

		// delta watch
		delta: {
			options: { livereload: true },
			jssrc: {
				files: [
					'<%= app_files.js %>'
				],
				tasks: [ 'jshint:src', 'copy:build_appjs', 'uglify' ]
			},
			csssrc: {
				files: [
					'<%= app_files.css %>'
				],
				tasks: [ 'sass', 'concat:build_css', 'cssmin:compile_css' ]
			}
		}

		// -- out
	};

	grunt.initConfig( grunt.util._.extend( taskConfig, usrConfig ) );

	grunt.renameTask( 'watch', 'delta' );
	grunt.registerTask( 'watch', [ 'build', 'delta' ] );

	grunt.registerTask( 'build', [
		'clean', 'copy:build_views',
		'jshint', 'jsinspect', 'copy:build_appjs', 'uglify',
		'sass', 'concat', 'cssmin'
	]);
	grunt.registerTask( 'default', [ 'build' ] );
};
