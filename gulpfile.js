'use strict';


var gulp		= require('gulp'),
	connect		= require('gulp-connect');


gulp.task('default', function () {
  
});


gulp.task('server', function () {
	connect.server({
		root: 'www',
		livereload: true
	});
});