var gulp = require('gulp'),
    minifycss = require('gulp-clean-css'),
    compass = require('gulp-compass'),
    ext_replace = require('gulp-ext-replace'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript'),
    jsuglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    precss = require('precss');

var assetsDev = 'assets/',
    assetsProd = 'src/',
    appDev = 'dev/',
    appProd = 'app/';

var tsProject = typescript.createProject('tsconfig.json');

gulp.task('build-css', function () {
    return gulp.src(assetsDev + 'scss/*.scss')
        .pipe(compass({
            sass: 'assets/scss',
            style: 'expanded'
        })
            .on('error', gutil.log))
        .pipe(minifycss())
        .pipe(gulp.dest(assetsProd + 'css/'))
});

gulp.task('build-ts', function () {
    return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        //.pipe(jsuglify())
        .pipe(gulp.dest(appProd));
});

gulp.task('build-img', function () {
    return gulp.src(assetsDev + 'img/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(assetsProd + 'img/'));
});

gulp.task('build-html', function () {
    return gulp.src(appDev + '**/*.html')
        .pipe(gulp.dest(appProd));
});

gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['build-ts']);
    gulp.watch(assetsDev + 'scss/**/*.scss', ['build-css']);
    gulp.watch(assetsDev + 'img/*', ['build-img']);
});

gulp.task('default', ['watch', 'build-ts', 'build-css']);