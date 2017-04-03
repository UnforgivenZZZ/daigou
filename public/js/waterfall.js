    window.onload=function(){
 
      if(screen.width >= 500){
        // fixHeight();
        waterfall('itemGrids','halfgrid box');
      }
    }

      var num = document.getElementById("count_item").getElementsByTagName("*");
      // console.log(num.innerHTML);
      for(var i = 0; i < num.length; i++){
        if(num[i].id == "numItem"){
          num[i].innerHTML = grid.length + " items";
          break;
        }
      }


function waterfall(parent,pin){
    var oParent=document.getElementById(parent);// 父级对象
    var aPin=getChildren(oParent,pin);// 获取存储块框pin的数组aPin
    var iPinW=aPin[0].offsetWidth;// 一个块框pin的宽
    var num=2;//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    // oParent.style.cssText=2width:'+iPinW*num+'px;ma rgin:0 auto;';//设置父级居中样式：定宽+自动水平外边距
    console.log(aPin.length);
    var pinHArr=[];//用于存储 每列中的所有块框相加的高度。
    for(var i=0;i<aPin.length;i++){//遍历数组aPin的每个块框元素
        var pinH=aPin[i].offsetHeight;
        if(i<num){
            pinHArr[i]=pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        }else{
            var minH=Math.min.apply(null,pinHArr);//数组pinHArr中的最小值minH
            console.log("minh:",minH);
            var minHIndex=getMinIndex(pinHArr,minH);
            aPin[i].style.position='absolute';//设置绝对位移
            aPin[i].style.top=minH+'px';
            aPin[i].style.left=aPin[minHIndex].offsetLeft+'px';
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[minHIndex] += aPin[i].offsetHeight;//更新添加了块框后的列高
            console.log(aPin[i].style.top);
        }
        console.log(i," updated, ",pinHArr);
    }
    console.log(document.getElementById('itemGrids').offsetHeight);
    document.getElementById('itemGrids').style.height = Math.max.apply(null, pinHArr)+'px';
    // var bot = document.getElementById("fooo");
    // var maxh = Math.max.apply(null, aPin);
    // bot.style.position = 'relative';
    // bot.style.top = maxh + 'px';
}

function getMinIndex(arr, val){
  console.log(arr);
  for(var i in arr){
    if(arr[i] == val){
      console.log(i);
      return i;
    }
  }
}

function getChildren(parent, child){
    var obj=parent.getElementsByTagName('*');//获取 父级的所有子集
    var pinS=[];//创建一个数组 用于收集子元素
    for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、压入数组
        if (obj[i].className==child){
            pinS.push(obj[i]);
        }
    }
    return pinS;
}