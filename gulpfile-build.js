const {task,src,dest,watch,series,parallel} = require('gulp');
const load = require('gulp-load-plugins')();
const del = require('del');

// gulp-rev 生成带哈希值的版本号的文件，解决缓存问题
// gulp-rev-colletor 用哈希路径替换原路径

// 删除dist目录
async function delDist(){
    await del('./dist');
}

// 处理图片
async function img(){
    src('./src/imgs/*.*')
    .pipe(dest('./dist/imgs'))
}

// 处理js(ESx -> ES5，压缩)
async function script(){
    src('./src/script/*.js')
    .pipe(load.babel({ presets: ['@babel/preset-env']}))//转成ES5
    .pipe(load.uglify())//压缩
    .pipe(load.rev())//给文件名后面添加哈希值
    .pipe(dest('./dist/script'))
    .pipe(load.rev.manifest())//生成记录版本号的json文件
    .pipe(dest('./rev/js'))
}

// 处理sass(编译成css，压缩)
async function sass(){
    src('./src/sass/*.scss')
    .pipe(load.sassChina())//转成css
    .pipe(load.minifyCss())//压缩
    .pipe(load.rev())//给文件名后面添加哈希值
    .pipe(dest('./dist/css'))
    .pipe(load.rev.manifest())//生成记录版本号的json文件
    .pipe(dest('./rev/css'))
}

// 处理html(压缩，把原文件替换为有哈希值的文件)
async function html(){
    return new Promise((resovle,reject)=>{
        setTimeout(()=>{//延后执行这个任务
            resovle();
            src(['./rev/**/*.json','./src/html/*.html'])
            .pipe(load.revCollector({
                replaceReved: true //根据之前生成的json配置，替换原来路径为哈希路径
            }))
            .pipe(load.minifyHtml())//压缩
            .pipe(dest('./dist/html'))
        },2000);
    })
}

// 构建生成环境的代码
task('build',async ()=>{
    await delDist();
    await img();
    await script();
    await sass();
    await html();
})
