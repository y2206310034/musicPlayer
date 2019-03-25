

const gulp = require("gulp");

// 压缩html
// gulp插件应用    下载-->获取插件-->应用插件
const htmlClean = require("gulp-htmlclean");
// 压缩图片
const imageMin = require("gulp-imageMin");
// 压缩js
const uglify = require("gulp-uglify");
// 去掉js中的调试语句
const debug = require("gulp-strip-debug");

// 将less转会成为css
const less = require("gulp-less");
// 压缩css
const cleanCss =require("gulp-clean-css");

// gulp-postcss autoprefixer
// 后处理器   给css自动加前缀
const postCss = require("gulp-postcss");
const autoprefixer = require("autoprefixer")


// 开启服务器
const connect = require("gulp-connect");

//  判断当前环境变量  无默认的环境  需要在shell中用 export NODE_ENV=development设置环境变量
const devMod = process.env.NODE_ENV == "development";

const folder = {
    src:"src/",
    dist:"dist/"
}

gulp.task("html",function(){
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(htmlClean())
        }
        return page.pipe(gulp.dest(folder.dist+"html/"));
        // pipe将文件放入管道中
        // dest将文件写入当前路径
})
gulp.task("css",function(){
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
        if(!devMod){
            page.pipe(cleanCss())
        }
        return   page.pipe(gulp.dest(folder.dist+"css/"));
})
gulp.task("js",function(){
    // connect.reload()自动刷新
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(debug())
            .pipe(uglify())
        } 
        return   page.pipe(gulp.dest(folder.dist+"js/"));
})
gulp.task("image",function(){
    return gulp.src(folder.src + "image/*")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist+"image/"));
})
gulp.task("serve",function(){
    connect.server({
        port:"8888",
        // 自动刷新
        livereload:true
    })
})

//监听文件变化
gulp.task("watch",function(){
    gulp.watch(folder.src+"html/*",gulp.series("html"));
    gulp.watch(folder.src+"css/*",gulp.series("css"));
    gulp.watch(folder.src+"js/*",gulp.series("js"));
})






// 创建任务
// series按顺序执行
// parallel并行执行
gulp.task("default",gulp.series(gulp.parallel("serve","watch","html","css","js","image")))

// gulp.src
// gulp.watch
// gulp.task
// gulp.dest