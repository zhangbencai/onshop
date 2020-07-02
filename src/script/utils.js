// 设置cookie
function setCookie(options){
    if (!options.key || !options.val){
        throw new Error('设置失败，key和val是必填参数！');
    }
    options.domain = options.domain || '';
    options.path = options.path || '';
    options.days = options.days || 0;

    if (options.days !== 0) {
        var d = new Date();
        d.setDate(d.getDate()+options.days);
        document.cookie = options.key+'='+escape(options.val)+'; domain='+options.domain+'; path='+options.path+'; expires='+d;
    } else {
        document.cookie = options.key+'='+escape(options.val)+'; domain='+options.domain+'; path='+options.path;
    }
}

// 获取cookie
function getCookie(key){
    var arr1 = document.cookie.split('; ');//所有cookie分割出来的数组
    var arr2 = [];//每一个cookie分割出来的key和value
    for (var i = 0, len = arr1.length; i < len; i++){
        arr2 = arr1[i].split('=');
        if (arr2[0] === key) {
            return unescape(arr2[1]);
        }
    }
    return null;
}

// 删除cookie
function removeCookie(key){
    setCookie({
        key: key,
        val: '1234',
        days: -2
    });
}

// 判断是否为对象{}
function isObject(obj){
    if(typeof obj === 'object' && obj !== null && obj.constructor === Object){
        return true;
    }
    return false;
}

function ajax(options){
    // 1.创建XMLHttpRequest对象（数据交互对象）
    var xhr = new XMLHttpRequest();//w3c标准
    // var xhr = new ActiveXObject('Microsoft.XMLHTTP');//IE 5 6

    var data = '';
    if (typeof options.data === 'string'){
        data = options.data;
    }
    if (isObject(options.data)){
        // 把{abc:123,ddd:777} 转成 'abc=123&ddd=777'
        for (var key in options.data){
            data += key+'='+options.data[key]+'&';
        }
        // data = 'abc=123&ddd=777&';
        data = data.substring(0,data.length-1);
        // console.log(data);
    }
    // return;

    // 判断请求方式
    if (options.type.toLowerCase() === 'get'){
        xhr.open(options.type,options.url+'?'+data+'&_='+Date.now(),true);
        xhr.send(null);// get请求
    } else if (options.type.toLowerCase() === 'post'){
        xhr.open(options.type,options.url,true);
        // 作用是模拟表单post来传递参数
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(data);// post请求发送数据 
    } else {
        alert('目前只支持 get和post 请求！')
    }

    // 4.请求-响应 状态
    xhr.onreadystatechange = function (){
        // console.log(xhr.readyState);
        if (xhr.readyState == 4){//请求完成 （请求状态）
            if(xhr.status >= 200 && xhr.status < 300){// 得到响应数据 （响应状态）
                options.success(xhr.responseText);
            } else{
                options.error(xhr.status);
            }
        }
    }
}

function jsonp(options){
    // 把options.success函数声明为全局函数 'mycallback'
    window[options.callbackName] = options.success;

    // 判断参数，如果是字符串，直接赋值给data
    var data = '';
    if (typeof options.data === 'string'){
        data = options.data;
    }
    // 判断参数，如果是对象，把对象格式化成参数序列的字符串再赋值给data
    if (typeof options.data === 'object' && options.data !== null && options.data.constructor === Object){
        // 把{abc:123,ddd:777} 转成 'abc=123&ddd=777'
        for (var key in options.data){
            data += key+'='+options.data[key]+'&';
        }
        // data = 'abc=123&ddd=777&';
        data = data.substring(0,data.length-1);
    }

    // 创建script标签，并且给src属性赋值（数据地址、参数、参数值）
    var Script = document.createElement('script');
    Script.src = options.url+'?'+ options.cb +'='+options.callbackName+'&'+data;
    document.body.appendChild(Script);

    // script标签加载完成时，删除该标签
    Script.onload = function (){
        document.body.removeChild(Script);
    }
}

// 使用Promise封装ajax
function promiseAjax(options){
    return new Promise(function(resolve,reject){
        // 1.创建XMLHttpRequest对象（数据交互对象）
        var xhr = new XMLHttpRequest();//w3c标准
        // var xhr = new ActiveXObject('Microsoft.XMLHTTP');//IE 5 6

        var data = '';
        if (typeof options.data === 'string'){
            data = options.data;
        }
        if (typeof options.data === 'object' && options.data !== null && options.data.constructor === Object){
            // 把{abc:123,ddd:777} 转成 'abc=123&ddd=777'
            for (var key in options.data){
                data += key+'='+options.data[key]+'&';
            }
            // data = 'abc=123&ddd=777&';
            data = data.substring(0,data.length-1);
            // console.log(data);
        }
        // return;

        // 判断请求方式
        if (options.type.toLowerCase() === 'get'){
            xhr.open(options.type,options.url+'?'+data+'&_='+Date.now(),true);
            xhr.send(null);// get请求
        } else if (options.type.toLowerCase() === 'post'){
            xhr.open(options.type,options.url,true);
            // 作用是模拟表单post来传递参数
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.send(data);// post请求发送数据 
        } else {
            alert('目前只支持 get和post 请求！')
        }

        // 4.请求-响应 状态
        xhr.onreadystatechange = function (){
            // console.log(xhr.readyState);
            if (xhr.readyState == 4){//请求完成 （请求状态）
                if(xhr.status >= 200 && xhr.status < 300){// 得到响应数据 （响应状态）
                    resolve(xhr.responseText);
                } else{
                    reject(xhr.status);
                }
            }
        }
    });
}
