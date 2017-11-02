/*事件绑定 兼容browser*/
function each(arr, fn){
    for(var cur = 0; cur < arr.length; cur++){
        fn(arr[cur], cur);
    }
}
window.onload = function() {//onload事件 在页面或图像加载完成后立即发生。
    var container = document.getElementById('container');
    var text = document.getElementById('text-input');
    var buttonList = document.getElementsByTagName('input');
    addEvent(buttonList[0], "click", function() {
        // var input = buttonList[0].value;
        var text_Arr = (text.value).split(/,|，| |、|\r/);
        // if ((/^[1-9][0-9]$|^100$/).test(input)) {//正则表达式
        //     if(queue.gtSixty()){
        //      }
           queue.leftPush(text_Arr);
        // }

    });

    addEvent(buttonList[1],"click",function(){
        var text_Arr = (text.value).split(/,|，| |、|\r/);
        // if ((/^[1-9][0-9]$|^100$/).test(input)) {
        //     if(queue.gtSixty()){
        //         alert("这是第"+(queue.str.length+1)+"个元素，已经超过60个");
        //     }
          queue.rightPush(text_Arr);
        // }
        });
    addEvent(buttonList[2], "click", function(){queue.leftPop()});
    addEvent(buttonList[3], "click", function(){queue.rightPop()});
    addEvent(buttonList[4], "click", function(){queue.sortQueue()});
    addEvent(buttonList[6], "click", function(){
        var search_str = buttonList[5].value;
        queue.searchStr(search_str)});

}


    var queue = {//定义一个队列，
        str: [],//队列名

        leftPush: function(num){//用数组左边添加元素
            // this.str.unshift(num);
            for(var i=0;i<num.length;i++){
                // this.str.push(num[i]);
                this.str.unshift(num[i]);
            }
            this.paint();
        },

        rightPush: function(num){//用数组右边添加元素
           for(var i=0;i<num.length;i++){
            this.str.push(num[i]);
           }
            this.paint();
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
            each(this.str, function(item){str += ('<div>'+item+'</div>')});
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

        },
        searchStr: function (search_str) {
            var patt =new RegExp(search_str,"gim");
            alert(patt);
            var str = "";
            each(this.str,function(item){
                if(patt.test(item)){
                    str += ('<div style="background-color: blue">'+item+'</div>');
                }else{
                    str += ('<div>'+item+'</div>');
                }


            });
            container.innerHTML = str;//更新页面内容

            addDivDelEvent();

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

