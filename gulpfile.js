var gulp 		= require('gulp'),
	browserSync = require('browser-sync'),
	sass 		= require('gulp-sass'),
	concat		= require('gulp-concat'),
	uglify      = require('gulp-uglifyjs'),
	cssnano		= require('gulp-cssnano'),
	rename      = require('gulp-rename'),
	del 		= require('del'),
	imagemin    = require('gulp-imagemin'),
	pngquant 	= require('imagemin-pngquant'),
	cache		= require('gulp-cache'),
	autoprefix  = require('gulp-autoprefixer');



gulp.task('sass', function(){
	return gulp.src('app/sass/*.sass')
			   .pipe(sass())
			   .pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true}))
			   .pipe(gulp.dest('app/css'))
			   .pipe(browserSync.reload({stream: true}));
});

gulp.task('css-libs',['sass'], function(){
	return gulp.src('app/css/libs.css')
				.pipe(cssnano())
				.pipe(rename({suffix:'.min'}))
				.pipe(gulp.dest('app/css'))
});

gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/scrits.js'
		])
		.pipe(concat('lib.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app',
		},
		browser: 'chrome'
	});

});

gulp.task('clean', function(){
	return del.sync('dist')
});

gulp.task('cache', function(){
	return cache.clearAll()
})

gulp.task('img', function(){
	return gulp.src('img')
		.pipe(cache({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'))
});

gulp.task('default', ['browser-sync','css-libs','scripts'], function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html',browserSync.reload);
	gulp.watch('app/js/*.js',browserSync.reload);
});

gulp.task('build', ['clean','sass','css-libs','img','scripts'], function(){
	
	gulp.src(['app/css/*'])
			.pipe(gulp.dest('dist/css'))

	gulp.src(['app/*.html'])
			.pipe(gulp.dest('dist'))

	gulp.src(['app/fonts'])
			.pipe(gulp.dest('dist'))

	gulp.src('app/js/**/*')
			.pipe(gulp.dest('dist/js'))		
		

});
