/**
 * Created by liuchen on 2016/4/11.
 */
var game=null;
//小方块类
function Block(num,dir){
    this.dir=dir;
    this.num=num;
}
//游戏类
function Game(container) {
    //未开始
    this.gameStart = false;
    //格子数量
    this.size = 16;
    //方块容器
    this.arr = [];
    //方块容器 由参数提供
    this.container = container;
}
Game.prototype.createBlock=function(){
    if(this.checkLose()){return;}
    var num=(Math.random()>0.2)?2:4;
    var block=new Block(num);
    var point=randomInt(this.size);
    while(this.arr[point]!=0){
        point=randomInt(this.size);
    }
    this.arr[point]=block;
}
Game.prototype.start=function(){
    for(var i=0;i<this.size;i++){this.arr.push(0);}
    this.gameStart=true;
    for(var i=0;i<2;i++)this.createBlock();
    zyrender(this.arr,this.size);

}
Game.prototype.lose=function(){
    this.gameStart=false;
}
Game.prototype.checkLose=function(){
        for(var i=0;i<this.size;i++){if(this.arr[i]==0)return 0;}
        return 1;
}
Game.prototype.turnLeft=function(){
    for(var i = 1, len = this.size; i < len; i++){
        var j = i;
        while(j % 4 != 0){
            this.merge(this.arr,j - 1, j,'right');
            j -= 1;
        }
    }
}
Game.prototype.turnRight=function(){
    for(var i = 14; i >= 0; i--){
        var j = i;
        while(j % 4 != 3){
            this.merge(this.arr,j + 1, j,'left');
            j += 1;
        }
    }
}
Game.prototype.turnUp=function(){
    for(var i = 4, len = this.size; i < len; i++){
        var j = i;
        while(j >= 4){
            this.merge(this.arr,j - 4, j,'down');
            j -= 4;
        }
    }
}
Game.prototype.turnDown=function(){
    for(var i = 11; i >= 0; i--){
        var j = i;
        while(j <= 11){
            this.merge(this.arr,j + 4, j,'up');
            j += 4;
        }
    }
}
//交换
Game.prototype.merge=function(arr,pre, cur,dir){

    var prevVal = arr[pre];
    var currVal = arr[cur];
    if(currVal != 0){
        if(prevVal == 0){
            arr[pre]=arr[cur];
            arr[cur]=0;
            arr[pre].dir=dir;
        }
        else if(prevVal.num == currVal.num){
            arr[pre].num=arr[cur].num*2;
            arr[cur]=0;
            arr[pre].dir=dir;

        }
    }

}
//////util/////
function randomInt(num){
    return parseInt(Math.random()*num);
}
function z$(id){
    return document.getElementById(id);
}
/////UI渲染/////////////
function zyloading(){
    var img=['n2.png','n4.png','n8.png','n16.png','n32.png','n64.png','n128.png',
             'n256.png','n512.png','n1024.png','n2048.png','n4096.png','n8192.png',
             'n16384.png','n32768.png','n65536.png','n131072.png','play_btn.png','playfield.png',
             'background1.jpg','game_fh.png'];
    function preload(arr){
        for (var i = 0; i < arr.length; i++) {
            var IMG = new Image();
            IMG.src = "./img/"+arr[i];
        }
    }
    preload(img);
    zybegin();
}
function zymenu(){

    z$('startbtn').addEventListener('click',function(){
        z$('button').className="hidden";
        z$('start').className="hidden";
        z$('container').className="";
        game=new Game($('wrap'));
        game.start();
    });
}
function zybegin(){

        z$('loading').className="hidden";
        z$('game').className='';
        zymenu();
}
function zyend(){

    setTimeout(function(){
        z$('container').className="hidden";
        z$('button').className="";
        z$('lose').className="";
        z$('losebtn').addEventListener('click',function(){
            z$('lose').className="hidden";
            z$('button').className="hidden";
            z$('container').className="";
            game=new Game($('wrap'));
            game.start();
        });
    },500);

}
function zyrender(arr,size){
    var wrap=document.getElementById('wrap');
    for(var i=0;i<size;i++){
        if(arr[i]!=0){
            if(arr[i].dir!=undefined){
                wrap.children[i].className='n'+arr[i].num+" "+arr[i].dir+"In";
                //console.log(wrap.children[i]);
            }else {
                wrap.children[i].className='n'+arr[i].num;
            }
        }else{
            wrap.children[i].className='';
        }
        arr[i].dir=undefined;
    }
}

////////////
zyloading();



