(function($,root){
    var duration;
    var frameId;
    var startTime,lastPer = 0;
    function renderAllTime(allTime){
        var time  = formatTime(allTime)
        duration = allTime;
        $(".all-time").html(time)
    }
    function formatTime(t){
        t = Math.round(t);
        var m = Math.floor(t / 60);
        var s = t - m *60;
        if(m < 10){
            m = "0" + m;
        }
        if(s < 10){
            s = "0" + s;
        }
        return m + ":" + s;
    }
    // 进度条开始运动
    function start(precentage){
        lastPer = precentage === undefined ? lastPer : precentage;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime)/(duration*1000);
            if(per<=1){
                // 更新进度条
                update(per);
                frameId = requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(frameId);
            }
            
        }
        frame();
    }
    function update(per){
        var time = formatTime(per * duration);
        $(".cur-time").html(time);
        var x = (per - 1)*100;
        $(".pro-top").css({
            transform:"translateX(" + x + "%)"
        }) 
    }
    function stop(){
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime)/(duration*1000);
        cancelAnimationFrame(frameId);
    }
 
    root.pro={
        renderAllTime:renderAllTime,
        start:start,
        stop:stop,
        update:update
    }
}(window.Zepto,window.player||(window.player={})))