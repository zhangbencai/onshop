init();
function init() {
    //头部右边显示 <span class="show_time">下午好，请</span>
    var show_time = document.querySelector('.show_time');
    var element = document.querySelector('.hd_topbar_home_ul');
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
}
//实现下拉菜单
var category_title = document.querySelector(".category-list-root");
var category_list = document.querySelector(".category-list");
//鼠标进入下拉菜单显示
category_title.onmousemove = function () {
    category_list.style.display = "block";
}
//鼠标离开下拉菜单隐藏
category_title.onmouseout = function () {
    category_list.style.display = "none";
}


// 放大镜部分
function ce(type, style) {
    var elem = document.createElement(type);
    Object.assign(elem.style, style);
    return elem;
}
var max, min, mask, imgCon, preImg, iconList;
var x = 0,
    y = 0,
    pos = 0,
    iconList = ["../imgs/a_ico.jpg", "../imgs/b_ico.jpg", "../imgs/c_ico.jpg", "../imgs/d_ico.jpg", "../imgs/e_ico.jpg", "../imgs/f_ico.jpg", "../imgs/g_ico.jpg", "../imgs/h_ico.jpg", "../imgs/i_ico.jpg", "../imgs/j_ico.jpg",],
    bnList = [];
const MASK_WIDTH = 303.75;
const MIN_WIDTH = 450;
const MAX_WIDTH = 540;
const IMAGE_MARGIN = 9;
const IMAGE_WIDTH = 58;
inits();
function inits() {
    var zoom = ce("div", {
        position: 'absolute',
        left: "160px",
        top: "280px"
    });
    createMin(zoom);
    createMax(zoom);
    createCarouserl(zoom);
    var main_left = document.querySelector(".main_left");
    main_left.appendChild(zoom);
}
function createMin(parent) {
    min = ce("div", {
        position: "absolute",
        width: MIN_WIDTH + "px",
        height: MIN_WIDTH + "px",
        backgroundImage: "url(../imgs/a.jpg)",
        backgroundSize: "100% 100%",
        border: "1px solid #CCCCCC"
    });
    mask = ce("div", {
        position: "absolute",
        width: MASK_WIDTH + "px",
        height: MASK_WIDTH + "px",
        display: "none",
        backgroundColor: "rgba(180,160,0,0.3)"
    })
    min.appendChild(mask);
    parent.appendChild(min);
    min.addEventListener("mouseenter", mouseHandler);
}

function createMax(parent) {
    max = ce("div", {
        position: "absolute",
        width: MAX_WIDTH + "px",
        height: MAX_WIDTH + "px",
        backgroundImage: "url(../imgs/a.jpg)",
        border: "1px solid #CCCCCC",
        display: "none",
        left: MIN_WIDTH + 1 + "px"
    });
    parent.appendChild(max);
}
function createCarouserl(parent) {
    var div = ce("div", {
        position: "absolute",
        width: MIN_WIDTH + 2 + "px",
        height: "58px",
        top: MIN_WIDTH + 2 + "px"
    });
    var left = ce("div", {
        width: "22px",
        height: "32px",
        top: "13px",
        backgroundImage: "url(../imgs/sprite.png)",
        backgroundPositionX: "0px",
        backgroundPositionY: "-54px",
        position: "absolute",
    });
    var right = left.cloneNode(false);
    left.style.left = "0px";
    Object.assign(right.style, {
        right: "0px",
        backgroundPositionX: "-78px",
        backgroundPositionY: "0px",
    })
    bnList.push(left);
    bnList.push(right);
    div.appendChild(left);
    div.appendChild(right);
    var con = ce("div", {
        position: "absolute",
        width: "380px",
        height: "58px",
        left: "36px",
        overflow: "hidden",
    })
    div.appendChild(con);
    createImageCon(con);
    parent.appendChild(div);
    div.addEventListener("click", clickHandler);
}
function createImageCon(parent) {
    var width = iconList.length * IMAGE_WIDTH + iconList.length * IMAGE_MARGIN * 2 - IMAGE_MARGIN;
    imgCon = ce("div", {
        position: "absolute",
        width: width + "px",
        height: "58px",
        left: 0,
        transition: "all 0.5s"
    });
    for (var i = 0; i < iconList.length; i++) {
        var img = ce("img", {
            width: IMAGE_WIDTH - 4 + "px",
            height: IMAGE_WIDTH - 4 + "px",
            float: "left",
            border: `2px solid rgba(255,0,0,${i == 0 ? 1 : 0})`,
            marginLeft: `${i === 0 ? '0px' : IMAGE_MARGIN + "px"}`,
            marginRight: IMAGE_MARGIN + "px"
        });
        img.src = iconList[i];
        if (i === 0) preImg = img;
        imgCon.appendChild(img);
    }
    imgCon.addEventListener("mouseover", iconMouseHandler);
    parent.appendChild(imgCon);
}
function iconMouseHandler(e) {
    if (e.target.nodeName !== "IMG") return;
    if (preImg) {
        preImg.style.border = "2px solid rgba(255,0,0,0)";
    }
    preImg = e.target;
    preImg.style.border = "2px solid rgba(255,0,0,1)";
    //var aa = `${e.target.src.replace(/_ico/, " ")}`;
    //var ulrs =`${e.target.src.replace(/_ico/, " ")}`.replace('http://localhost:3000', "..")
    min.style.backgroundImage = max.style.backgroundImage = `url(/${e.target.src.replace(/_ico/, " ")})`;
    //console.log(ulrs)
    //min.style.backgroundImage = max.style.backgroundImage=`url(${ulrs})`;
    //console.log(max.style.backgroundImage=`url(${ulrs})`)
}
function mouseHandler(e) {
    if (e.type === "mouseenter") {
        mask.style.display = max.style.display = "block"
        min.addEventListener("mouseleave", mouseHandler);
        min.addEventListener("mousemove", mouseHandler);
    } else if (e.type === "mousemove") {
        move(e.clientX, e.clientY);
    } else if (e.type === "mouseleave") {
        mask.style.display = max.style.display = "none"
        min.removeEventListener("mouseleave", mouseHandler);
        min.removeEventListener("mousemove", mouseHandler);
    }
}
function move(mouseX, mouseY) {
    var rect = min.getBoundingClientRect();
    x = mouseX - MASK_WIDTH / 2 - rect.x;
    y = mouseY - MASK_WIDTH / 2 - rect.y;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > MIN_WIDTH - MASK_WIDTH) x = MIN_WIDTH - MASK_WIDTH;
    if (y > MIN_WIDTH - MASK_WIDTH) y = MIN_WIDTH - MASK_WIDTH;
    mask.style.left = x + "px";
    mask.style.top = y + "px";
    max.style.backgroundPositionX = -x * (MAX_WIDTH / MASK_WIDTH) + "px";
    max.style.backgroundPositionY = -y * (MAX_WIDTH / MASK_WIDTH) + "px";
}
function clickHandler(e) {
    var index = bnList.indexOf(e.target)
    if (index < 0) return
    if (index === 0) {
        pos--;
        if (pos < 0) pos = 0;
        //    imgCon.style.left="0px";
    } else {
        // imgCon.style.left="-380px";
        pos++;
        if (pos > Math.floor(iconList.length / 5)) {
            pos = Math.floor(iconList.length / 5)
        }
    }

    if (pos === Math.floor(iconList.length / 5)) {
        imgCon.style.left = -(imgCon.offsetWidth - 380) + "px"
    } else {
        imgCon.style.left = pos * -380 + "px";
    }

}
$(function () {
    $.ajax({
        url: '../json/particulars.json',
        type: 'get',
        dataType: 'json',
        success: function (json) {
            $.each(json, function (index, item) {
                var Car = '<h1>' +
                    ' <span class="self_icon">' + "自营" + '</span>'
                    + item.title +
                    '</h1>' +
                    ' <div class="mod_detailInfo_priceSales ">' +
                    ' <div class="seckill_box">' +
                    ' <a href="">' +
                    ' <img src=" ' + item.imgurl + '" alt="">' +
                    ' </a>' +
                    '<span class="countdown_box">' + item.tims + '</span>' +
                    ' </div>' +
                    ' <div class="price ">' +
                    '<span class="tag">抢购价</span>' +
                    '<span class="current_price">' + "￥" + item.currentPrice + '</span>' +
                    ' </div>' +
                    '</div>' +
                    '<div class="choose-attrs">' +
                    '<div class="dt">选择颜色</div>' +
                    '<div class="dd">' +
                    ' <div class="item">' +
                    ' <img src="' + item.color1 + '" alt="">' +
                    '<i>' + item.text1 + '</i>' +
                    '</div>' +
                    ' <div class="item">' +
                    ' <img src="' + item.color2 + '" alt="">' +
                    '<i>' + item.text2 + '</i>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    ' <div class="mod_cuputing">' +
                    ' <div class="computing_item">' +
                    '<div class="computing_num">' +
                    ' <input type="text" name="" id="" value="1" class="num">' +
                    '</div>' +
                    '<div class="computing_act">' +
                    '<input type="button" class="add" value="+">' +
                    '<input type="button" class="no_reduce" value="-">' +
                    '</div>' +
                    ' </div>' +
                    ' <div class="addCart ">' +
                    '<em class="icon iconfont ico">&#xe612;</em>' +
                    '<span>加入购物车</span>' +
                    '</div>' +
                    ' </div> '
                $('.main_content').append(Car)
                //输入数量
                var step = 1,ids;
                var num = document.querySelector(".num");
                var add = document.querySelector(".add");
                var no_reduce = document.querySelector(".no_reduce");
                num.addEventListener("input", inputHandle);
                add.addEventListener("click", clickHandler);
                no_reduce.addEventListener("click", clickHandler);
                function inputHandle(e) {
                    this.value = this.value.replace(/\D/g, "");
                    if (ids) return;
                    ids = setTimeout(function (input) {
                        clearTimeout(ids);
                        ids = 0;
                        setStep(input.value);
                    }, 500, this);
                }
                var step = 1;
                function clickHandler(e) {
                    if (this.value==="+") {
                        setStep(step + 1);
                    } else {
                        setStep(step - 1);
                    }
                }
                
                function setStep(value) {
                    value = Number(value);
                    if (value < 1) value = 1;
                    if (value > 999) value = 999;
                    step = value;
                    num.value = step;
                }
            })
        }
    })
})