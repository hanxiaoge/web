/*事件绑定 兼容browser*/
function each(arr, fn){
    for(var cur = 0; cur < arr.length; cur++){
        fn(arr[cur], cur);
    }
}
window.onload = function() {//onload事件 在页面或图像加载完成后立即发生。
    var container = document.getElementById('container');
    var buttonList = document.getElementsByTagName('input');
    addEvent(buttonList[1], "click", function() {
        var input = buttonList[0].value;
        if ((/^[1-9][0-9]$|^100$/).test(input)) {//正则表达式
            if(queue.gtSixty()){
                 alert("这是第"+(queue.str.length+1)+"个元素，已经超过60个");
             }
           queue.leftPush(input);
        }

    });

    addEvent(buttonList[2],"click",function(){
        var input = buttonList[0].value;
        if ((/^[1-9][0-9]$|^100$/).test(input)) {
            if(queue.gtSixty()){
                alert("这是第"+(queue.str.length+1)+"个元素，已经超过60个");
            }
           queue.rightPush(input);
        }});
    addEvent(buttonList[3], "click", function(){queue.leftPop()});
    addEvent(buttonList[4], "click", function(){queue.rightPop()});
    addEvent(buttonList[5], "click", function(){queue.sortQueue()});


}


    var queue = {//定义一个队列，
        str: [],//队列名

        leftPush: function(num){//用数组左边添加元素
            this.str.unshift(num);
            this.paint();
        },

        rightPush: function(num){//用数组右边添加元素
            this.str.push(num);
            this.paint();
        },
        gtSixty: function(){//判断数组是否为空
            return (this.str.length > 60);

        },
        isEmpty: function(){//判断队列是否为空
            return (this.str.length == 0);

        },

        leftPop: function(){
            if(!this.isEmpty()){//用数组左边弹出元素
                alert(this.str.shift());
                this.paint();
            }
            else{
                alert("队列以空");
            }
        },

        rightPop: function(){//用数组右边弹出元素
            if (!this.isEmpty()) {
                alert(this.str.pop());
                this.paint();
            }
            else {
                alert("队列以空");
            }
        },

        paint: function(){//更新页面内容
            var str = "";
            each(this.str, function(item){str += ('<div style="height: '+item+'px"></div>')});
            container.innerHTML = str;//更新页面内容

            addDivDelEvent();


        },

        deleteID: function(id){
            console.log(id);
            this.str.splice(id, 1);//删除队列元素
            this.paint();
        },
        sortQueue: function(){
            this.str.sort();
            this.paint();

        }
    };

    function addEvent(element, event, listener) {//用于给元素添加监视事件
        if (element.addEventListener) {//Mozilla系列浏览器（火狐）
            element.addEventListener(event, listener, false);
        }
        else if (element.attachEvent) {//非Mozilla系列浏览器
            element.attachEvent('on' + event, listener, false);
        }
        else {
            element['on' + event] = listener;
        }
    }
function addDivDelEvent() {//为每个div标签添加删除点击事件监听
    for (var cur = 0; cur < container.childNodes.length; cur++) {

        //这里要使用闭包，否则永远绑定到指定div上的delete函数的参数永远等于跳出时的cur值(length);
        addEvent(container.childNodes[cur], "click", function(cur) {
            return function(){return queue.deleteID(cur)};
        }(cur));
    }
}

