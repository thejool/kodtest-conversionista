var gulp 	 	 = require('gulp');
var babel 		 = require('babel-core');
var sass 	 	 = require('gulp-sass');
var browserSync  = require('browser-sync').create();
var useref	 	 = require('gulp-useref');
var gulpif 		 = require('gulp-if');
var uglify 		 = require('gulp-uglify');
var concat 		 = require('gulp-concat');
var imagemin	 = require('gulp-imagemin');
var cache	 	 = require('gulp-cache');
var del		 	 = require('del');
var runSequence  = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
// var sourcemaps	 = require('gulp-sourcemaps');
var concat	 	 = require('gulp-concat');
gutil = require('gulp-util')

gulp.task('scripts', function() {
  return gulp.src(['app/js/*.js'])
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({
		stream: true
	}))
})


gulp.task('sass', function(){
	return gulp.src('app/scss/*.scss')
		// .pipe(sourcemaps.init())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sass())
		// .pipe(sourcemaps.write('.'))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	})
});

gulp.task('js', function(){
// gulp.task('useref', function(){
	return gulp.src('app/*.html')
		.pipe(useref())
	// return gulp.src("app/js/**/*.js")
		// .pipe(sourcemaps.init())
		// .pipe(babel())
		.pipe(gulpif('*.js', uglify()))
		// .pipe(concat("main.js"))
		// .pipe(sourcemaps.write("."))
		.pipe(gulp.dest("dist/js"));
});

gulp.task('images', function(){
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function(){
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function(){
	return del.sync('dist');
});

gulp.task('cache:clear', function(callback){
	return cache.clearAll(callback);
});

gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', function(callback){
	runSequence(['sass', 'scripts', 'browserSync', 'watch'],
		callback
	)
});

gulp.task('build', function(callback){
	runSequence('clean:dist',
		['sass', 'scripts', 'images', 'fonts'],
		callback
	)
});
