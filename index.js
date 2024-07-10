var pattern=[];
var userpattern=[];
starter=0;
var level=1;
var user=0;
var highscore=0;
var randomchoice=0;
$(document).on("keydown",function(event){
    if(event.key==="Enter" && starter==0){
    starter=1;
    level=1;
    $("h1").css("fontSize","2.5rem");
    sequence(); 
} 
});
function sequence(){
    randomchoice=colors[(Math.ceil(Math.random()*4))-1];
    $("h1").text("Level " + level);
    pattern.push(randomchoice);
    var button="#"+ randomchoice;
    $(button).fadeIn(100).fadeOut(100).fadeIn(100);
    sound(randomchoice);
    userpattern=[];
}
var colors=['red','green','blue','yellow'];
$(".btn").click(function(){
    user=$(this).attr("id");
    userpattern.push(user);
    sound(user);
    whenpressed(user);
    if(starter==1){
    result(userpattern.length - 1);
    }
});
function sound(audio1){
    var audio1=new Audio("sounds/"+audio1+".mp3");
    audio1.play();
}
function whenpressed(chosencolor){
        $("#"+chosencolor).addClass("pressed");
setTimeout(function(){
        $("#"+chosencolor).removeClass("pressed");
},130);
}
function result(currentLevel){
    if (pattern[currentLevel] === userpattern[currentLevel]) {
        if (userpattern.length === pattern.length) {
            level++;
            $("h1").text("Level " + level);
            setTimeout(function(){
                sequence();
            }, 1000);
        }
    }
    else{
        $("body").addClass("game-over");
        var audioloss= new Audio("sounds/wrong.mp3");
        $("h1").text("Game Over!");
        audioloss.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        setTimeout(function(){
        restart();
        },1000);
        
    }
}
function restart(){
    pattern = [];
    starter = 0;
    if((level-1)>highscore){
        highscore=level-1;
    }
    $("h1").css("fontSize","1.32rem");
    $("h1").html("Final score: "+(level-1)+" High Score: "+highscore+"<br><br>Press Enter to restart.");
    $(document).on("keydown",function(event){
        if(event.key==="Enter" && starter==0){
        starter=1;
        level=1;
        sequence();
    }});
}


