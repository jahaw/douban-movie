let gulp = require('gulp');
let server = require('gulp-express');
let mocha = require('gulp-mocha');
let gutil = require('gulp-util')
let nodemon = require('gulp-nodemon')
let jshint = require('gulp-jshint')
let browserSync = require('browser-sync')
let reload = browserSync.reload()

/*
//运行所有的测试用例
gulp.task('default', function() {
    return gulp.src(['test/!**!/!*.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should')
            }
        }));
});
*/
gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: 'http://localhost:8100',
        files: ['**'],
        browser: 'chrome',
        notify: false,
        port: 3000
    })
})
gulp.task('js', function() {
    return gulp.src(['app.js', 'public/js/*.js', 'app/**/*.js', 'config/routes.js']) // 检查文件：js目录下所有的js文件
        .pipe(jshint()) // 进行检查
        .pipe(jshint.reporter('default')) // 对代码进行报错提示
});

gulp.task('nodemon', function(cb) {
    let called = false;
    return nodemon({
        script: 'app.js'
    }).on('start', function() {
        if (!called) {
            cb();
            called = true;
        }
    });
});
gulp.task('clean', function(cb) {
    del(['./dist'], cb)
});

gulp.task('dist', ['js']);

gulp.task('default', ['browser-sync']);


gulp.task('server', function() {
    server.run(['app.js']);

    // restart the server when app.js changes
    gulp.watch(['app.js', 'public/js/*.js', 'app/**/*.js', 'config/routes.js'], server.run)
    gulp.watch(['app/views/**/*.jade'], server.notify);
})

/*
//在文件改动时候运行 mocha 测试用例
gulp.task('mocha', function() {
    return gulp.src(['test/!*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(['lib/!**', 'test/!**'], ['mocha']);
});
*/

gulp.task('default', ['server'])