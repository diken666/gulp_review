let gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let less = require('gulp-less');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let htmlMin = require('gulp-htmlmin');
let liveReload = require('gulp-livereload');
let connect = require('gulp-connect'); // 热加载

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
        .pipe(liveReload()) // 实时刷新
        .pipe(connect.reload())  // 配合热更新
});


// 注册转化less的任务
gulp.task('less', function () {
    return gulp.src('src/less/*.less')
        .pipe(less())     // 编译less为css
        .pipe(gulp.dest('./src/css/'))
});

// 注册转化scss的任务
gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())     // 编译less为css
        .pipe(gulp.dest('./src/css/'))
});

// 注册转化多个scss的任务
gulp.task('moreSass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())     // 编译less为css
        .pipe(gulp.dest('./dist/css/'))
});

// 注册合并css
gulp.task('css', function () {
    return gulp.src('./src/css/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(rename({suffixes: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(liveReload())
        .pipe(connect.reload())  // 配合热更新
});

// 注册压缩html
gulp.task('html', function () {
    return gulp.src('./index.html')
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
        .pipe(liveReload())
        .pipe(connect.reload())  // 配合热更新
});

// 当过程中出现依赖时
gulp.task('allCssCompile', gulp.series('sass', 'less', 'css', 'html', function (done) {
    console.log("ok");
    done();
}));

// 注册监视任务 半自动
gulp.task('watch', function () {
    liveReload.listen();
    // series 或者 parallel
    gulp.watch('./index.html', gulp.parallel('html'));
    gulp.watch('./src/js/*.js', gulp.parallel('js'));
    gulp.watch('./src/css/*.css', gulp.parallel('css'));
});

// 注册监视任务 全自动
gulp.task('autoWatch', function () {
    // 配置服务器选项
    connect.server({
        root: 'dist/',
        livereload: true,
        port: 5000
    });

    // series 或者 parallel
    gulp.watch('./index.html', gulp.parallel('html'));
    gulp.watch('./src/js/*.js', gulp.parallel('js'));
    gulp.watch('./src/css/*.css', gulp.parallel('css'));
});

