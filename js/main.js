;(function ($) {
    var Dialog=function (config) {
        var _this_=this;
        //默认参数配置
        this.config={
            //对话框的宽度、高度
            width:"auto",
            height:"auto",
            //对话框提示信息
            message:"null",
            //对话框的类型
            sp:"null",
            //按钮组配置
            buttons:"null",
            //弹出框关闭时间
            delay:"null",
            //透明度
            maskOpacity:"null",
            //动画参数
            effect:"null"
        };
        //默认参数扩展
    if(config && $.isPlainObject(config)){
        $.extend(this.config,config);
    }else {
        this.isConfig=true;
    };
        //创建基本的DOM
        this.body=$("body");
        //创建遮罩层
        this.mask=$('<div class="g-dialog-container">');
        //创建弹出框
        this.win=$('<div class="dialog-window"></div>');
        //创建弹出框头部
        this.winHeader=$('<div class="dialog-header"></div>');
        this.sp=$('<span></span>');
        //创建弹出框主体
        this.winBody=$('<div class="dialog-body">');
        //创建弹出框主体
        this.winFooter=$('<div class="dialog-footer">');
        //渲染
        this.creat();
    };
    Dialog.prototype={
        //创建弹出框
        creat:function () {
            var _this_=this,
                 config=this.config,
                 mask=this.mask,
                 win=this.win,
                 winHeader=this.winHeader,
                 sp=this.sp,
                 winBody=this.winBody,
                 winFooter=this.winFooter,
                 body=this.body;
                //判断是否有传参数
                 if(this.isConfig){
                     winHeader.append(sp.addClass("icon-spinner2"));
                     win.append(winHeader);
                     mask.append(win);
                     body.append(mask);
                 } else {
                     var icon=config.sp;
                     winHeader.append(sp.addClass(icon));
                     win.append(winHeader);
                     //动画参数
                     if(config.effect!="null"){
                         this.animate();
                     }
                     //如果传了文本
                     if(config.message!="null"){
                         win.append(winBody.html(config.message));
                     };
                     //如果传按钮
                     if(config.buttons){
                         this.creatButtons(winFooter,config.buttons)
                         win.append(winFooter)
                     };
                     mask.append(win);
                     body.append(mask);
                     //传的宽高
                     if(config.width!="auto"){
                         win.width(config.width);
                     };
                     if(config.height!="auto"){
                         win.height(config.height)
                     };
                     //如果透明度
                     if(config.maskOpacity){
                         mask.css("backgroundColor","rgba(0,0,0,"+config.maskOpacity+")")
                     };
                     //延迟时间
                     if(config.delay&&config.delay!="null"){
                        window.setTimeout(function () {
                            _this_.close();
                        },config.delay);
                     };
                     if(config.effect!="null"){
                         this.animate();
                     }
                 };
        },
        //根据buttons参数创建button
    creatButtons:function (winFooter,buttons) {
        var _this_=this;
        $(buttons).each(function (i) {
            var type=this.type?" class='"+this.type+"'":"";
            var btnText=this.text?this.text:"按钮"+(++i);
            var callback=this.callback?this.callback:null;
            var button=$("<button "+type+">"+btnText+"</button>");
            if(callback){
                button.tap(function () {
                    var isClose=callback();
                    if(isClose!=false) {
                        _this_.close()
                    }
                })
            }else {
                button.tap(function () {
                    _this_.close()
                })
            }
            winFooter.append(button);

        })
    },
        //关闭函数
    close:function () {
        this.mask.remove();
    },
        //动画函数
    animate:function () {
            var _this_=this;
            this.win.css("transform","scale(0,0)");
            window.setTimeout(function () {
                _this_.win.css("transform","scale(1,1)");
            },100)
        }
    },
    window.Dialog=Dialog;
    $.dialog=function (config) {
        return new Dialog(config)
    };
})(Zepto);
