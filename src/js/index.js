
var root = window.player;

// 音乐数据列表
var dataList;
// 数据长度
var len;
// 用来接受音频播放模块
var audio = root.audioManger;
// 定时器
var timer;

// 用来接受控制索引的接口
var control;


function getData(url){
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
            dataList = data;
            len = dataList.length;
            // root.render(dataList[0]);
            // audio.getAudio(dataList[0].audio)
            control = new root.controlIndex(len);
            // root.pro.renderAllTime(dataList[0].duration);
            bindEvent();
            $("body").trigger("play:change",0);
            bindTouch();
        },
        error:function(){
            console.log("error");
        }
    })
}

function bindEvent(){
    // 通过设定自定义事件将共同的操作放到一个事件中
    $("body").on("play:change",function(e,index){
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        // 获取渲染总时间
        root.pro.renderAllTime(dataList[index].duration);
        if(audio.status=="play"){
            audio.play();
            root.pro.start();
            rotated(0);
        }
        $(".img-box").attr("data-deg",0);
        $(".img-box").css({
            "transform":"rotateZ("+0+"deg)",
            "transition":"none"
        })
    })


    $(".prev").on('click',function(){
        var i = control.prev();
        $("body").trigger("play:change",i);
        root.pro.start(0);
        if(audio.status =="pause"){
            root.pro.stop();
        }
    })
    $(".next").on('click',function(){
        var i = control.next();
        $("body").trigger("play:change",i);
        root.pro.start(0);
        if(audio.status =="pause"){
            root.pro.stop();
        }
    })
    $(".play").on("click",function(){
        if(audio.status == "pause"){
            audio.play();
            root.pro.start();
            var deg = +$('.img-box').attr("data-deg")
            rotated(deg)
        }else{
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $(".play").toggleClass("playing");
    })
}
function bindTouch(){
    var $spot = $(".spot");
    var bottom = $(".pro-bottom").offset();
    var l = bottom.left;
    var w = bottom.width;
    $spot.on("touchstart",function(){
        root.pro.stop();
    }).on("touchmove",function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if(per>= 0 && per <=1){
            root.pro.update(per);
        }
    }).on("touchend",function(e){
        var x = e.changedTouches[0].clientX;
        var per =( x - l)/w;
        if(per >= 0 && per<= 1){
            var time  = per * dataList[control.index].duration;
            root.pro.start(per);
            audio.playTo(time);
            audio.play();
            audio.status = "play";
            $(".play").addClass("playing");
        }
    }) 
}
function rotated(deg){
    clearInterval(timer);
    timer = setInterval(function(){
        deg+=2;
        $(".img-box").attr("data-deg",deg);
        $(".img-box").css({
            "transform":"rotateZ("+deg+"deg)",
            "transition":"all 0.2s ease-out"
        })
    },100)
}

getData("../mock/data.json");