var table;
var headTilte = ["全选", "", "商品", "", "单价", "数量", "小计", "操作"];
var data = [];
function ce(type, style) {
    var elem = document.createElement(type);
    Object.assign(elem.style, style);
    return elem;
}
init();
function init() {
  // document.addEventListener("add_goods_event",addGoodsHandler);
  document.addEventListener("step_change",stepChangeHandler)
  goodsList.forEach((item) => {
    let goods = new GoodsItem(item);
    goods.appendTo(".divs");
    goods.addEventListener(GoodsItem.ADD_GOODS_EVENT, addGoodsHandler);
  });
}

function addGoodsHandler(e) {
  // console.log(e);
  var o = this.data;
  var arr = data.filter((item) => {
    return item.id === o.id;
  });
  if (arr.length === 0) {
    var obj = {
      id: o.id,
      selected: false,
      icon: o.icon,
      title: o.title,
      info: o.info,
      price: Number(o.price),
      num: 1,
      sum: Number(o.price),
      del: false,
    };
    data.push(obj);
  }else{
      arr[0].num++;
      arr[0].sum=arr[0].num*arr[0].price;
  }
  createTable();
}

function createTable() {
  if (table) {
    table.remove();
    table = null;
  }
  table = ce("table");
  table.className = "tables";
  createHead(table);
  createContent(table);
  createTableFoot(table);
  document.body.appendChild(table);
}

function createHead(parent) {
  var tr =ce("tr");
  for (var i = 0; i < headTilte.length; i++) {
  //   if(i===1 || i===3) continue;
    var th =ce("th");
  //   if (i === 0 || i === 2) th.setAttribute("colspan","2");
    th.textContent = headTilte[i];
    if (headTilte[i] === "全选") {
      var ck =ce("input");
      ck.type = "checkbox";
      ck.checked=data.every(item=>item.selected);
      ck.addEventListener("click",selectHandler);
      th.insertBefore(ck, th.firstChild);
    }
    tr.appendChild(th);
  }
  tr.className = "thr";
  parent.appendChild(tr);
}

function createContent(parent) {
  for (var i = 0; i < data.length; i++) {
    var obj = data[i];
    var tr =ce("tr");
    tr.style.height = "100px";
    for (var prop in obj) {
      if (prop === "id") continue;
      var td =ce("td");
      // td.textContent=obj[prop];
      createTdContent(td, obj, prop);
      tr.appendChild(td);
    }
    parent.appendChild(tr);
  }
}
function createTdContent(td, obj, prop) {
  switch (prop) {
    case "selected":
      var ck =ce("input");
      ck.type = "checkbox";
      td.appendChild(ck);
      ck.obj=obj;
      ck.checked=obj[prop]
      ck.addEventListener("click",selectHandler);
      td.style.paddingLeft = "10px";
      break;
    case "icon":
      var img = new Image();
      img.src = obj[prop];
      img.style.width = "80px";
      img.style.height = "80px";
      td.appendChild(img);
      break;
    case "price":
    case "sum":
      td.textContent = "￥" + Number(obj[prop]).toFixed(2);
      td.style.textAlign = "right";
      if (prop === "sum") td.style.paddingRight = "40px";
      break;
    case "del":
      var a =ce("a");
      a.href = "javascript:void(0)";
      a.textContent = "删除";
      a.obj=obj;
      a.addEventListener("click",delClickHandler);
      td.appendChild(a);
      td.style.textAlign = "center";
      break;
    case "num":
      let step = new StepNumber(obj);
      step.appendTo(td);
      step.setStep(obj[prop]);
      break;
    default:
      td.textContent = obj[prop];
      td.style.textAlign = "center";
  }
}

function createTableFoot(parent){
      var tr=ce("tr");
      tr.style.height="80px";
     for(var i=0;i<5;i++){
          var td=ce("td");
         if(i===0)createDelShopping(td);
         if(i===2)createShoppingCount(td);
         if(i===3) createSum(td);
         if(i===4) createSubmit(td);
          tr.appendChild(td);
     }
      parent.appendChild(tr);
}
function createDelShopping(td){
      var ck=ce("input");
      ck.type="checkbox";
      ck.style.marginLeft="12px";
      ck.checked=data.every(item=>item.selected);
      ck.addEventListener("click",selectHandler);
      td.appendChild(ck);
      td.setAttribute("colspan","4");
      var span=ce("span");
      span.textContent="全选";
      td.appendChild(span);
      var a=ce("a");
      a.textContent="删除选中商品";
      a.style.marginLeft="5px";
      a.href="javascript:void(0)";
      a.addEventListener("click",deleteClickHandler);
      td.appendChild(a);
      var a=ce("a");
      a.textContent="清理购物车";
      a.style.marginLeft="5px";
      a.href="javascript:void(0)";
      a.addEventListener("click",deleteClickHandler);
      td.appendChild(a);
}

function createShoppingCount(td){
      var span1=ce("span");
      span1.textContent="已选择";
      var span2=ce("span",{
          color:"red"
      });
      span2.textContent=data.filter(item=>item.selected).length;
      var span3=ce("span");
      span3.textContent="件商品";
      td.appendChild(span1);
      td.appendChild(span2);
      td.appendChild(span3);
}

function createSum(td){
      var span=ce("span");
      span.textContent="总价:";
      var span1=ce("span",{
          fontSize:"24px",
          color:"red",
          marginLeft:"5px"
      });
      span1.textContent="￥"+data.reduce((value,item)=>{
          if(item.selected) return value+item.sum;
          return value;
      },0).toFixed(2);
      td.appendChild(span);
      td.appendChild(span1);
}

function createSubmit(){

}

function delClickHandler(e){
    var a=e.currentTarget;
    var id=a.obj.id;
  data=data.filter(item=>{
      return id!==item.id;
  });
  createTable();
}

function selectHandler(e){
    var ck=e.currentTarget;
  if(ck.obj){
      ck.obj.selected=ck.checked;
  }else{
      data.forEach(item=>{
          item.selected=ck.checked;
      });
  }
  createTable();

}

function stepChangeHandler(e){
    var id=e.obj.id;
    var num=e.step;
   data.forEach(item=>{
       if(item.id===id){
           item.num=num;
           item.sum=num*item.price;
       }
   });
   createTable();
}

function deleteClickHandler(e){
      if(e.currentTarget.textContent==="删除选中商品"){
          data=data.filter(item=>{
              return !item.selected;
          });
      }else{
          data.length=0;
      }
      createTable();
}