(function($,root){

    function Control(len){
        this.index = 0;
        this.len = len;
    }
    Control.prototype={
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);
        },
        getIndex:function(flag){
            // 计算点击按钮后的索引值
            var curIndex = (this.index + flag + this.len) % this.len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlIndex = Control;
}(window.Zepto,window.player||(window.player={})))