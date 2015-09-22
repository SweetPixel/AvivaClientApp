module.exports = function(grunt) {
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			scripts: {
				files: ['css/*.*', 'js/*.*', '!js/*.min.js', '!css/*.min.css', 'templates/*.html', 'templates/**/*.html', '*.html'],
				tasks: ['concat', 'uglify'],
				options: {
					interrupt: true,
					livereload: {
						port: 1337
					}
				}
			}
		},
		uglify: {
			my_target: {
				options: {
					beautify: true
				},
				files: {
					'js/packages.min.js': [
						'js/plugins/jquery.min.js',
						'node_modules/angular/angular.min.js',
						'js/plugins/angular-router/angular-router.min.js'
					],
				}
			}
		},
		 concat: {
		 	basic_and_extras: {
		 		files: {
		 			'index.html': ['entry-point.html', 'templates/*.html', 'templates/*/*.html', 'templates/*/*/*.html' , 'entry-point-end.html'],
		 			'js/app/controllers.js': ['js/app/controllers/*.ctrl.js'],
		 			'js/app/services.js': ['js/app/services/*.service.js']
		 		}
		 	}
		 }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat', 'watch']);
};