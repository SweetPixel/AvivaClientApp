'use strict';


var gulp		= require('gulp'),
	webserver	= require('gulp-webserver'),
	connect		= require('gulp-connect');


gulp.task('default', function () {
  // place code for your default task here
});

gulp.task('serve', function () {
	gulp.src('www')
		.pipe(webserver({
			livereload: true,
			directoryListing: true,
			open: true
		}));
});

gulp.task('server', function () {
	connect.server({
		root: 'www',
		livereload: true
	});
});