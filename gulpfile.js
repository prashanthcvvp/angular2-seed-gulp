const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('clean',function(){
    return del(['dist/**/*','app/*.js','app/css','app/js','dist']);
});


gulp.task('compile',['clean','sass'],function(){
    return gulp
        .src('app/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest('app/js'));

});

gulp.task('sass', function () {
    return gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });
    gulp.watch("app/*.html").on('change', browserSync.reload);
});


gulp.task('build',['compile','serve']);
gulp.task('default',['build']);