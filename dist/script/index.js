//轮播图
var list,lunbo_img,prevDot;
var category_title,category_list;
var targetTime,ids,hours1,minutes1,seconds1;
var pos =0;
//实现下拉菜单
category_title = document.querySelector(".category-list-root");
category_list = document.querySelector(".category-list");
//鼠标进入下拉菜单显示
category_title.onmousemove=function(){
   category_list.style.display="block";
}
//鼠标离开下拉菜单隐藏
category_title.onmouseout=function(){
   category_list.style.display="none";
}
init();
function init(){
    //头部右边显示 <span class="show_time">下午好，请</span>
    var show_time = document.querySelector('.show_time');
        var element  = document.querySelector('.hd_topbar_home_ul');
        var vt = new Date();
        var a = vt.getHours();
        var show = '早上好';
        if (a >= 18 || a < 5) {
            show = "晚上好"
        } else {
            if (a < 11) {
                show = "早上好"
            } else {
                if (a < 14) {
                    show = "中午好"
                } else {
                    if (a < 18) {
                        show = "下午好"
                    }
                }
            }
        }
    show_time.innerHTML = show + ",请";
    //轮播图
    lunbo_img=document.querySelector(".lunbo_img");
    list =Array.from(document.querySelectorAll(".lb_tab_ol li"));
    list.forEach(function(item){
        item.onclick =clickHandler;
    });
    changeDot();
    //倒计时
    hours1= document.querySelector('.time_hour');
    minutes1= document.querySelector('.time_minit');
    seconds1= document.querySelector('.time_second');
    ids = setInterval(enterFrame,16);
}
//点击小长方形切换图片
function clickHandler(){
    pos=list.indexOf(this);
    lunbo_img.style.left=pos*-1519.2+"px";
    changeDot();
}
//改变小长方形的颜色
function changeDot(){
    if(prevDot){
        prevDot.style.backgroundColor="#fff";
        prevDot.style.color="#333";
    }
    prevDot=list[pos];
    prevDot.style.backgroundColor="#333";
    prevDot.style.color="#fff";
}
//倒计时 setInterval函数
function enterFrame(){
    //设置以后的时间
    var endtime = new Date("2020/7/2/,20:25:00");
    var date = new Date();
    var time = parseInt((endtime.getTime()-date.getTime())/1000);
    var hours=parseInt((time/3600)%24);
    var minutes=parseInt((time/60)%60);
    var seconds=parseInt(time%60);
     hours1.innerHTML=(hours<10 ? "0"+hours : hours);
     minutes1.innerHTML=(minutes<10 ? "0"+minutes : minutes);
     seconds1.innerHTML=(seconds<10 ? "0"+seconds : seconds);
    if(hours+minutes+seconds===0){
        clearInterval(ids);
    }
}
$(function (){
    // 进入页面加载数据
    $.ajax({
        url: '../json/seckill.json',
        type: 'get',
        dataType: 'json',
        success: function (json){
            $.each(json,function (index,item){
                var goods ='<li>'+
                '<a href="">'+
                   ' <div class="single_top">'+
                        '<div class="s_bz">'+'</div>'+
                        '<img src="'+item.imgurl+'"class="single_top_img">'+
                    '</div>'+
                    '<div class="single_bottom">'+
                        '<div class="s_title">'
                            +item.title+
                        '</div>'+
                        '<div class="s_bar">'+
                            '<div class="s_progress" style="width:'+item.soldOut+'">'+'</div>'+
                        '</div>'+
                        '<div class="s_con">'+
                            '<div class="s_num">'+
                                '<span class="s_num_unit">'+'￥'+'</span>'+
                                '<span class="s_num_act">'+item.currentPrice+'</span>'+
                                '<span class="s_num_underline">'+
                                    '<span class="s_num_unit">'+'￥'+'</span>'+
                                    '<span class="s_num_line">'+item.originalPrice+'</span>'+
                                '</span>'+
                            '</div>'+
                       ' </div>'+
                    '</div>'+
                '</a>'+
            '</li>'
            // $('.s_progress').css('width',item.soldOut);
            $('.single_one').after(goods)
            })
        }
    })
    $.ajax({
        url: '../json/commodity.json',
        type: 'get',
        dataType: 'json',
        success: function (json){
            $.each(json,function (index,item){
                var googes =
                '<li class="under_list_single">'+
                    '<div class="under_pro_pic">'+
                        '<img src="'+item.imgurl+'" class="sin_img sin_img_big">'+
                    '</div>'+
                    '<p class="single_tit text_limit_limp">'
                        +item.title+
                    '</p>'+
                    '<p class="single_money">'+
                        '￥'+
                        '<span>'+item.currentPrice+'</span>'+
                    '</p>'+
                    '<div class="pro_tag">'+
                        '<div class="goods_icon off_icon">'+item.discount+'</div>'+
                    '</div>'+
                    '<div class="sing_btn_con">'+
                        '<div class="sin_hove_btn sin_gw">'+
                            '<a href="" class="sin_hove_btn_a item-cart">'+
                                '<i class="icon iconfont">&#xe612;</i>'+
                            '</a>'+
                        '</div>'+
                        '<div class="sin_hove_btn sin_xs">'+
                            '<a href="" class="sin_hove_btn_a">找相似</a>'+
                        '</div>'+
                    '</div>'+
                    '<a href="" class="border_line">'+'</a>'+
                '</li>'
            // $('.s_progress').css('width',item.soldOut);
            $('.under_sp_list').append(googes);
            $(".under_sp_list").mouseenter(function(){
                $('.sing_btn_con').css('opacity','1');
            })
            $(".under_sp_list").mouseleave(function(){
                $('.sing_btn_con').css('opacity','0');
            })
            })
        }
    })
})