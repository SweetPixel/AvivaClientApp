'use strict';


var gulp        = require('gulp'),
	useref		= require('gulp-useref'),
	gulpif		= require('gulp-if'),
	uglify		= require('gulp-uglify'),
	minifyCss	= require('gulp-minify-css'),
	googleWebFonts = require('gulp-google-webfonts'),
    connect     = require('gulp-connect');


gulp.task('default', function () {
	var assets = useref.assets();

	return gulp.src('www/*.html')
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'));

});


gulp.task('fonts', function () {
	return gulp.src('fonts.list')
		.pipe(googleWebFonts())
		.pipe(gulp.dest('www/font'))
		;
});


gulp.task('server', function () {
    connect.server({
        root: 'www',
        livereload: true
    });
});