module.exports = function(grunt) {
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			scripts: {
				files: ['css/*.*', 'js/*.*', '!js/*.min.js', '!css/*.min.css', 'templates/*.html', 'templates/**/*.html', '*.html'],
				tasks: ['concat'],
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
				files: {
					'js/packages.min.js': [
						'js/plugins/jquery.min.js',
						'node_modules/angular/angular.min.js',
						'js/plugins/angular-router/angular-router.min.js'
					]
				}
			}
		},
		concat: {
		    dist: {
		    	src: ['entry-point.html', 'templates/*.html', 'templates/*/*.html', 'entry-point-end.html'],
		    	dest: 'index.html',
		    },
		 }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat', 'watch']);
};