//帮助中心下拉菜单
var regist_header_right = document.querySelector(".regist_header_right");
var hd_menu_list = document.querySelector(".hd_menu_list");
//鼠标进入下拉菜单显示
regist_header_right.onmousemove=function(){
    hd_menu_list.style.display="block";
}
//鼠标离开下拉菜单隐藏
regist_header_right.onmouseout=function(){
    hd_menu_list.style.display="none";
}
