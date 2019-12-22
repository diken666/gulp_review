let gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');

// 组册任务
// gulp.task('taskName', function() {})
// 启动 gulp taskName
// 注册默认任务
// gulp.task('default',[])

// gulp.series：按照顺序执行
// gulp.paralle：可以并行计算

// 因为任务可能包含异步代码，所以必须在任务完成执行时发出信号（“异步完成”）。
// 在“Gulp3.x”中，你可以不做这个就离开。如果您没有显式地发出异步完成的信号，那么Gulp只会假定您的任务是同步的，并且一旦您的任务函数返回，它就完成了。Gulp4.x在这方面更严格。你必须明确地发出任务完成的信号。

// 合并压缩js
gulp.task('js', function () {
    return gulp.src('./src/js/**/*.js')  // 找到目标源文件，将数据读取到gulp的内存中
        .pipe(concat('build.js'))    // 临时合并文件
        .pipe(gulp.dest('./dist/js/'))    // 输出文件到本地
        .pipe(uglify())                  // 压缩文件
        .pipe(rename({suffixes: '.min'}))  // 重命名
        .pipe(gulp.dest('./dist/js/'))    // 输出文件
});

gulp.task('test', function (done) {
    console.log("test");
    done()
});
gulp.task('default',gulp.series('test', function (done) {
    done()
}));
