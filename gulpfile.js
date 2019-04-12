let gulp = require("gulp")
let sass = require("gulp-sass")
let babel = require("gulp-babel")
let server = require("gulp-webserver")
let devjs = require("gulp-uglify")
let devcss = require("gulp-clean-css")

//编译时sass
gulp.task("sass", () => {
        return gulp.src("./src/scss/**/*.scss")
            .pipe(sass())
            .pipe(gulp.dest("./src/css"))
    })
    //监听
gulp.task("watch", () => {
        return gulp.watch(['./src/scss/**/*.scss', './src/js/**/*.js'], gulp.series('sass', 'devBabel'))
    })
    //ES6-ES5
gulp.task('devBabel', () => {
        return gulp.src("./src/js/**/*.js")
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(gulp.dest("./dist/babel"))
    })
    //服务
gulp.task("devServer", () => {
        return gulp.src("./src")
            .pipe(server({
                port: 9960,
                livereload: true,
                open: true
            }))
    })
    //管理开发
gulp.task("default", gulp.series('sass', "devBabel", "devServer", "watch"))

//压缩js

gulp.task('devJs', () => {
        return gulp.src("./dist/**/*.js")
            .pipe(devjs())
            .pipe(gulp.dest("./dist/js"))
    })
    //压缩css
gulp.task('devCss', () => {
        return gulp.src("./src/css/**/*.css")
            .pipe(devcss())
            .pipe(gulp.dest("./dist/css"))
    })
    //管理上线
gulp.task("bulid", gulp.parallel('devJs', 'devCss'))