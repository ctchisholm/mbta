var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('js', function () {
	gulp.src(['_public/src/**/module.js', '_public/src/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		//.pipe(ngAnnotate())
		//.pipe(uglify())
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest('_public/'))
});

gulp.task('watch', ['js'], function () {
	gulp.watch('_public/src/**/*.js', ['js'])
});
