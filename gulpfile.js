// gulp dev
// gulp build
// 获取用户命令行输入的内容？
// console.log( process );//{...}
// console.log( process.argv[2] );// dev / build

const mode = process.argv[2];

switch(mode){
    case 'dev':
        require('./gulpfile-dev.js');
    case 'build':
        require('./gulpfile-build.js');
}
