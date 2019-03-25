(function($,root){
    // play pause getAudio
    function AudioManger(){
        this.audio = new Audio();
        // 将参数挂载到实例上
        // this.src = src;
        // 默认状态
        this.status ="pause";
    }
    AudioManger.prototype={
        play:function(){
            this.audio.play();
            this.status = "play";
        },
        pause:function(){
            this.audio.pause();
            this.status = "pause";
        },
        getAudio:function(src){
            this.audio.src = src;
            this.audio.load();
        },
        playTo:function(t){
            this.audio.currentTime = t;
        }
    }
    root.audioManger = new AudioManger();
    

}(window.Zepto,window.player||(window.player={})))