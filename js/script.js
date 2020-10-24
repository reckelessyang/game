"use strict"
		var stage = {
			w:1280,
			h:720
		}

		//剩余时间
		var time = 60;
		//开启ai时当前时间和结束ai的时间
		var nowtime,overtime;

		//得到AI功能的次数
		var openAItimes = 0;

		//是否结束
		var isOver = false;
		var _pexcanvas = document.getElementById("canvas");
		_pexcanvas.width = stage.w;
		_pexcanvas.height = stage.h;
		var ctx = _pexcanvas.getContext("2d");

		//获取整个分数元素和计时元素
		var left = document.getElementsByClassName("left")[0];
		var right = document.getElementsByClassName("right")[0];


		//获取分数元素
		var score_text = document.getElementById("score");
		score_text.innerHTML = "0";

		//获取时间
		var timer_text = document.getElementById("timer");
		timer_text.innerHTML = time;

		//获取body
		var body = document.getElementsByTagName("body")[0];
		//获取menu菜单
		var menu = $('#menu');

		//菜单按钮的按钮
		var btn1 = document.getElementsByClassName("btn1")[0];

		//获取整个界面
		var container = document.getElementById("container");
		//获取游戏结束界面
		var $over = $('#over');

		//获得ai功能
		var $AIlist = $(".AIlist");
		//获取开启ai提示
		var $startAI = $(".startAI");

		//能使用的ai次数
		var $AItimes = $('.AItimes');		
		var $AItimer = $('#AItimer');
		$AItimer.html(openAItimes);

		//AI功能消失
		var $AIover = $('.AIover');

		//防止在当前分数时无限次生成ai功能
		var flag = true;
		var flag1 = true;
		var isclick = false;

		//当点击第一个按钮时
		//游戏玩法
		btn1.onclick = function(){
			_pexcanvas.style.display = "block";
			menu.fadeOut();
			left.style.display = "block";
			right.style.display = "block";
			body.style.backgroundImage = "none";
			$AItimes.show();
			
			//定时器
			var timer1 = setInterval(function(){
			time -=1;
			timer.innerHTML = time;
			if(time <= 0){
				clearInterval(timer1);
				clearInterval(setAI);
				isOver = true;
				//清空数据
				enemies = null;	
				bullets = null;	
				$over.fadeIn(1000);
				$('.overscore').html(score);
				}	
			},1000);

			//开始创建敌人
			//每12秒设置一个level			
			creatNemies();
			var enmy = setInterval(function(){
				creatNemies();
				if(enemies.length >= 15){
					clearInterval(enmy);
					//游戏结束时要将所有数据清空
				}
				
			},12000);

			//AI功能定时器
			//解决了到达分数时触发ai时间要等下一秒才能用
			var setAI = setInterval(function(){
				if(score === 10 &&flag === true){
					openAItimes += 1;
					$AIlist.fadeIn("low",function(){
						$AItimer.html(openAItimes);
						$AIlist.fadeOut(2000);
					});
					console.log("获得第一次次使用ai的机会"+openAItimes);
					flag = false;
					//记录当前时间
					var AInowtime = time;
				}


				if(score === 30 &&flag1 === true){
					openAItimes += 1;
					$AIlist.fadeIn("low",function(){
						$AItimer.html(openAItimes);
						$AIlist.fadeOut(2000);
					});
					console.log("获得第二次使用ai的机会"+openAItimes);
					flag1 = false;
				}
				if(isclick === true){
					window.onclick = null;
				}
				console.log(isclick);
				
				if(openAItimes >0 ){
					if(isclick === false){
						//触发ai功能事件
					window.onclick = function(e){
						//开启AI弹窗
						$startAI.fadeIn("low",function(){
							$startAI.fadeOut(2000);
						})
						//记录当前事件
						nowtime = time;
						window.onmousemove = null;
						ai = true;
						openAItimes--;
						//使用了一次AI功能，重新刷新ai功能次数
						$AItimer.html(openAItimes);
						console.log("使用了一次ai功能"+openAItimes);
						isclick = true;
						console.log(isclick);
						}
											
					}
				}
				//AI执行时间已到，鼠标可以移动
				overtime = time;
				if(nowtime-overtime === 5){
					$AIover.fadeIn("low",function(){

						isclick = false;
						$AIover.hide();
					});
					ai = false;
					window.onmousemove = function(e){
						motchmove(e);
					}
					window.onclick = null;
					console.log("AI功能结束");
				}
			},100);
		}


		var pointer = {
			x:0,
			y:0
		}

		var scale = 1;
		var portrait = true;
		var loffset = 0;
		var toffset = 0;
		var mxpos = 0;
		var mypos = 0;
		//得分
		var score = 0;
		

// ------------------------------------------------------------------------------- Gamy
//箭头的构造函数
function drawArrow(fromx, fromy, tox, toy,lw,hlen,color) {
	var dx = tox - fromx;
	var dy = toy - fromy;
	var angle = Math.atan2(dy, dx);
	ctx.fillStyle=color;
	ctx.strokeStyle=color;
	ctx.lineCap = "round";
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(fromx, fromy);
	ctx.lineTo(tox, toy);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(tox, toy);
	ctx.lineTo(tox - hlen * Math.cos(angle - Math.PI / 6), toy - hlen * Math.sin(angle - Math.PI / 6));
	ctx.lineTo(tox - hlen * Math.cos(angle)/2, toy - hlen * Math.sin(angle)/2);
	ctx.lineTo(tox - hlen * Math.cos(angle + Math.PI / 6), toy - hlen * Math.sin(angle + Math.PI / 6));
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
}




var colors = ['#1abc9c','#1abc9c','#3498db','#9b59b6','#34495e','#16a085','#27ae60','#2980b9','#8e44ad','#2c3e50','#f1c40f','#e67e22','#e74c3c','#95a5a6','#f39c12','#d35400','#c0392b','#bdc3c7','#7f8c8d'];

function canvasObject(){
	
}
ctx.clearRect(0,0,stage.w,stage.h);
for (var i =0;i<200;i++) {
	//敌方箭头爆炸效果
	var angle = Math.random()*Math.PI*2;
	var length = Math.random()*250+50;
	var myx=360+Math.sin(angle)*length;
	var myy=360-Math.cos(angle)*length;
	drawArrow(myx,myy,myx+length/6*Math.sin(angle),myy-length/6*Math.cos(angle),length/30,length/30,'#c0392b');
}
var explode = new Image();
explode.src = canvas.toDataURL("image/png");

ctx.clearRect(0,0,stage.w,stage.h);
for (var i =0;i<200;i++) {
	//控制的箭头的爆炸效果
	var angle = Math.random()*Math.PI-Math.PI/2;
	var length = Math.random()*480+50;
	var myx=stage.w/2+Math.sin(angle)*length;
	var myy=stage.h-Math.cos(angle)*length;
	drawArrow(myx,myy,myx+length/6*Math.sin(angle),myy-length/6*Math.cos(angle),length/30,length/30,'#2c3e50');
}
var explodeb = new Image();
explodeb.src = canvas.toDataURL("image/png");


ctx.clearRect(0,0,stage.w,stage.h);
ctx.fillStyle = "rgba(236,240,241,1)";
ctx.fillRect(0,0,stage.w,stage.h);
for (var i =0;i<200;i++) {
	//背景图
	var angle = Math.random()*Math.PI/Math.PI*180;
	var length = Math.random()*250+50;
	var myx=Math.random()*stage.w;
	var myy=Math.random()*stage.h;
	drawArrow(myx,myy,myx+length/6*Math.sin(angle),myy-length/6*Math.cos(angle),length/30,length/30,colors[Math.floor(Math.random()*colors.length)]);
}

ctx.fillStyle = "rgba(236,240,241,0.9)";
ctx.fillRect(0,0,stage.w,stage.h);
var back = new Image();
back.src = canvas.toDataURL("image/png");

var angle=0;
var ai = false;
var ait = 0;
var btm=0;
var bullets = [];

function Bullet() {
	this.x=stage.w/2-Math.sin(angle)*150;
	this.y=stage.h-Math.cos(angle)*150;
	this.r=angle;
}

var enemies = [];
function Enemy() {
	this.r = Math.random()*Math.PI/(2.5/2)-Math.PI/2.5;
	this.dis = Math.random()*1280+720;
	this.x=stage.w/2-Math.sin(this.r)*this.dis;
	this.y=stage.h-Math.cos(this.r)*this.dis;
}


//构造函数生成敌人放入数组中
//一开始创建10个敌人
function creatNemies(){
	//enemies = [];
	for(var i=0;i<3;i++) {
	enemies.push(new Enemy()); 
	enemies[i].x += Math.sin(enemies[i].r)*300;
	enemies[i].y += Math.cos(enemies[i].r)*300;
	}
}
//用事件去调用函数
//creatNemies(8)





var explosions = [];
function Explosion(x,y,ty) {
	this.x=x;
	this.y=y;
	this.t=30;
	this.ty=ty;
}

var eturn = 0;
var cold = [];

function enginestep() {

	ctx.drawImage(back,0,0);
	//当ai为flase 且不移动鼠标超过3秒
/* 	if (!ai&&ait<Date.now()-3000) {
		ai = true;
	} */

	if(!isOver){
		//btm子弹，
	btm++;
	if(btm>8){
		btm=0;
		bullets.push(new Bullet());
	}
	//子弹的发射
	for (var i=0;i<bullets.length;i++) {
		bullets[i].x -= Math.sin(bullets[i].r)*20;
		bullets[i].y -= Math.cos(bullets[i].r)*20;
		drawArrow(bullets[i].x+Math.sin(bullets[i].r)*50,bullets[i].y+Math.cos(bullets[i].r)*50,bullets[i].x,bullets[i].y,8,8,'#2980b9');
		if(bullets[i].x<-100||bullets[i].x>stage.w+100){
			bullets.splice(i,1);
		}
		if(bullets[i].y<-100||bullets[i].y>stage.h+100){
			bullets.splice(i,1);
		}
		
	}

	//敌人的生成
	for(var i=0;i<enemies.length;i++) {
		//向不同方向移动
		enemies[i].x += Math.sin(enemies[i].r)*3;
		enemies[i].y += Math.cos(enemies[i].r)*3;
		drawArrow(enemies[i].x-Math.sin(enemies[i].r)*100,enemies[i].y-Math.cos(enemies[i].r)*100,enemies[i].x,enemies[i].y,15,15,"#c0392b");

		//敌人碰到底部产生爆炸
		if (enemies[i].y>stage.h) {
			enemies[i] = new Enemy();
			explosions.push(new Explosion(stage.w/2,stage.h,2));
				shake = true;
				shaket=0;
		}
		//碰撞产生爆炸
		for (var b=0;b<bullets.length;b++) {
			var dx = enemies[i].x-bullets[b].x;
			var dy = enemies[i].y-bullets[b].y;
			var dis = dx*dx+dy*dy;
			//但距离小于20*20，即碰撞后消失
			if (dis<20*20) {
				explosions.push(new Explosion(enemies[i].x,enemies[i].y,1));
				enemies[i] = new Enemy();
				bullets.splice(b,1);

				score++;
				score_text.innerHTML = score;
			}
		}
	}
	//ai功能，当为true时执行
	if (ai) {
		for(var l=0;l<enemies.length;l++) {
			var dx = enemies[l].x-stage.w/2;
			var dy = enemies[l].y-stage.h;
			var dis = Math.floor(Math.sqrt(dx*dx+dy*dy));
			var val1 = 100000+dis;
			var val2 = 1000+l;
			cold[l]=val1+'x'+val2;
		}



		cold.sort();
		eturn = parseInt(cold[0].slice(8,11));
		if (parseInt(cold[0].slice(1,6))<800) {
			angle += (enemies[eturn].r-angle)/8;
		}
	} else {

		var dx = pointer.x-stage.w/2;
		var dy = pointer.y-stage.h;
		angle = Math.atan(dx/dy);
	}
	//控制箭头的draw
	drawArrow(stage.w/2,stage.h,stage.w/2-Math.sin(angle)*150,stage.h-Math.cos(angle)*150,30,20,'#2c3e50');


	//敌方箭头爆炸特特效
	for(var e=0;e<explosions.length;e++) {
		
		if (explosions[e].ty==1) {
			var myimg = explode;
			ctx.globalAlpha=1-(explosions[e].t/stage.h);
			ctx.drawImage(myimg,explosions[e].x-explosions[e].t/2,explosions[e].y-explosions[e].t/2,explosions[e].t*stage.w/stage.h,explosions[e].t);
			ctx.globalAlpha=1;
		} else {
			var myimg = explodeb;
			ctx.globalAlpha=1-(explosions[e].t/stage.h);
			ctx.drawImage(myimg,explosions[e].x-explosions[e].t*stage.w/stage.h/2,stage.h-explosions[e].t,explosions[e].t*stage.w/stage.h,explosions[e].t);
			ctx.globalAlpha=1;
		}

	}


	for(var e=0;e<explosions.length;e++) {
		explosions[e].t += 20;
		if (explosions[e].t>stage.h) {
			explosions.splice(e,1);
		}
	}
}else{
	back.style.display = "block";
}
	}
	


// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events

function toggleFullScreen() {
	var doc = window.document;
	var docEl = doc.documentElement;

	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);

	}
	else {
		cancelFullScreen.call(doc);

	}
}


function motchstart(e) {
	mxpos = (e.pageX-loffset)*scale;
	mypos = (e.pageY-toffset)*scale;




}

function motchmove(e) {
	mxpos = (e.pageX-loffset)*scale;
	mypos = (e.pageY-toffset)*scale;
	pointer.x = mxpos;
	pointer.y = mypos;
	ai = false;
	ait = Date.now();
}

function motchend(e) {

}






window.addEventListener('mousedown', function(e) {
	motchstart(e);
}, false);
//当鼠标移动时，调用motchmove()
/* window.addEventListener('mousemove', function(e) {
	motchmove(e);
}, false); */

window.onmousemove = function(e){
	motchmove(e);
}



window.addEventListener('mouseup', function(e) {
	motchend(e);
}, false);
window.addEventListener('touchstart', function(e) {
	e.preventDefault();
	motchstart(e.touches[0]);
}, false);
window.addEventListener('touchmove', function(e) {
	e.preventDefault();
	motchmove(e.touches[0]);
}, false);
window.addEventListener('touchend', function(e) {
	e.preventDefault();
	motchend(e.touches[0]);
}, false);



// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
function _pexresize() {
	var cw = window.innerWidth;
	var ch = window.innerHeight;
	if (cw<=ch*stage.w/stage.h) {
		portrait = true;
		scale = stage.w/cw;
		loffset = 0;
		toffset = Math.floor(ch-(cw*stage.h/stage.w))/2;
		_pexcanvas.style.width = cw + "px";
		_pexcanvas.style.height = Math.floor(cw*stage.h/stage.w) + "px";
		_pexcanvas.style.marginLeft = loffset +"px";
		_pexcanvas.style.marginTop = toffset +"px";
	} else {
		scale = stage.h/ch;
		portrait = false;
		loffset = Math.floor(cw-(ch*stage.w/stage.h))/2;
		toffset = 0;
		_pexcanvas.style.height = ch + "px";
		_pexcanvas.style.width = Math.floor(ch*stage.w/stage.h) + "px";
		_pexcanvas.style.marginLeft = loffset +"px";
		_pexcanvas.style.marginTop = toffset +"px";
	}
}

//刷新动画
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	window.oRequestAnimationFrame      ||
	window.msRequestAnimationFrame     ||
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};})();



	function sfps(iny) {
		return(Math.floor(smoothfps)/60*iny);
	}



	var timebomb=0;
	var lastCalledTime;
	var fpcount = 0;
	var fpall = 0;
	var smoothfps = 60;
	var thisfps = 60;
	function fpscounter() {
		timebomb ++;
		if (!lastCalledTime) {
			lastCalledTime = Date.now();
			return;
		}
		var delta = (Date.now()-lastCalledTime)/1000;
		lastCalledTime = Date.now();
		var fps = 1/delta;
		fpcount ++;
		fpall += fps;
		if (timebomb>30) {
			thisfps = parseInt(fpall/fpcount*10)/10;
			fpcount = 0;
			fpall = 0;
			timebomb = 0;
		}
	}

	var shake = false;
	var shaket = 0;
	//刷新动画
	function animated() {
		requestAnimFrame(animated);
		if (shake) {
			var trax = Math.random()*60-30;
			var tray = Math.random()*60-30;
			ctx.translate(trax,tray);
		}
		// fpscounter();
	//ctx.clearRect(0,0,_pexcanvas.width,_pexcanvas.height);

	//整个游戏界面
	if(menu.css("display") === "none"){
		 enginestep();
	}
	
	
    // ctx.fillStyle='#8e44ad';
    // ctx.font = "24px arial";

    // ctx.textAlign = "left"; 
    // ctx.fillText(thisfps,20,50);
    // smoothfps += (thisfps-smoothfps)/100;
    // ctx.fillText(cold[0].slice(1,6),20,80);
   //  ctx.beginPath();
   //  ctx.arc(pointer.x, pointer.y, 50, 0, Math.PI*2,false);
   // ctx.closePath();
   // ctx.fill();
   if (shake) {
   	ctx.translate(-trax,-tray);
   	shaket ++;
   	if (shaket>20) {
   		shaket=0;
   		shake=false;
   	}
   }
}
//窗口设置
_pexresize();

animated();