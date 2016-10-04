

var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var htmlmin=require('gulp-htmlmin');
var browserSync=require('browser-sync');


//任务1:less编译 压缩 合并
gulp.task('style',function(){
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())               //编译
        .pipe(cssnano())            //压缩
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({stream:true}))
});

//任务2:JS文件 合并 压缩 混淆
gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))     //合并
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({stream:true}))

});

//任务3:图片复制
gulp.task('image',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({stream:true}))
});

//任务4:html压缩
gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream:true}))
});

//创建服务器
gulp.task('serve',function(){
    browserSync({
        server: {baseDir:['dist']}

    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});