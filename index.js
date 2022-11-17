var letter;
var point = 0;
var highscore = 0;
var box = document;
var total=0;
var ttime=getid('timerbox').innerHTML;
var gamestate='stop'
var level=3;
var alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
initgame();
function initgame() {
       highscore = localStorage.getItem('keygame/highscore');
       level=localStorage.getItem('keygame/level');
         if(level==null){
              level=3;
         }
         getid('levelindicatior').innerHTML="Difficulty :"+level;
            getid('levelslider').value=level;
    if (highscore == null) {
        highscore = 0;
    }
    getid('Hscore').innerHTML = highscore;
    letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    getid("parapart").innerHTML = letter;
    addlistner();
    showlevel();
}
function  addlistner(){
    box.addEventListener('keydown', function (event) {
        keypress(event);
    });
}
function keypress(event) {
    if (event.key == ' ' && gamestate == 'stop') {
        total = 0;
        getid('timerbox').innerHTML=100;
        point = 0;
        runtimer();
        startgame();
    }
    else if (alphabets.indexOf(event.key) > -1 && gamestate == 'play') {
        if(event.key==letter) {
              //set a random color as parapart background
              getid('parapart').style.backgroundColor = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
              getid('timerbox').innerHTML=100;
              letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
              getid("parapart").innerHTML = letter;
              point = point + 1;
            }
        else {
            getid('parapart').style.backgroundColor='rgb(255,0,0)';
                point = point - 1;
                if (point == -1) { endgame(); }
            }
            getid('score').innerHTML = point;
            total++;
    }
} 
function startgame(){
    gamestate = 'play';
    getid('score').innerHTML =point;
    showparapart();
}
function endgame() {
    gamestate = 'stop';
    setendinfo(point,total);
    showendscreen();
    if (point > getid('Hscore').innerHTML) {
        getid('Hscore').innerHTML = point;
         localStorage.setItem('keygame/highscore',point)
    }
}
function getid(id) {
    return document.getElementById(id);
}
function setendinfo() {
    getid('pscore').innerHTML =point*level;
    getid('paccuracy').innerHTML ='Accuracy :'+ Math.round((point/ total)*100);+'%';
    getid('ptotal').innerHTML ='Total :'+ total;
    getid('pwrong').innerHTML ='wrong :'+ ((total-point)/2);
}  
function showparapart(){
    getid('parapart').style.display = "block";
    getid('gamestartintro').style.display='none';
    getid('gamestate').style.display = "none";
}
function showendscreen(){
    getid('parapart').style.display = "none";
    getid("gamestartintro").style.display = "none";
    getid('gamestate').style.display = "block";
    getid('gamerestartintro').style.display = "block";
}
function runtimer(){
    var speedlev=40/level;
    const timetimer=setInterval(gametimer,speedlev);
    function gametimer(){
        ttime=getid('timerbox').innerHTML;
        if(ttime<=0){
          console.log('game ended');
          clearInterval(timetimer);
            endgame();
        }
        if(ttime>0){
            ttime=ttime-1;
            getid('timeline').style.width=ttime+'%';
            getid('timeline').style.backgroundColor='rgb('+(100-ttime)*2.55+','+ttime*2.55+',0)';
        }
        getid('timerbox').innerHTML=ttime;
    }
}
function showlevel(){
   getid('levelslider').addEventListener('change',function(){
   getid('levelindicatior').innerHTML="Difficulty :"+this.value;
   level=this.value;
   localStorage.setItem('keygame/level',this.value);
});
}

