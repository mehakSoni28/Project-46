//declaring variables
var bg,backgroundImg;
var score = 0;
var gameState="start";



function preload(){
   //loading Images,animation and sounds

 crowdImg=loadImage("crowd.png");
 virusImg=loadImage("virus.png");
 highfiveImg=loadImage("high_five.png");
 maskImg=loadImage("mask.png");
 sanitizerImg=loadImage("sanitizer.png");
 womanImg=loadImage("Opening.png");
 woman_runningImg=loadAnimation("Running_1.png","Running_2.png");
 startImg=loadImage("Start.png");
backgroundImg=loadImage("Day_bg.PNG")
 lifeImg=loadImage("life.png");
 dieSound=loadSound("Game_over_music.wav");
 Collecting=loadSound("Collecting_lifeline.wav");
 restartImg=loadImage("Restart.jpg");


}

function setup(){
   //creating canvas
   createCanvas (650,500);
   //creating groups
   crowdGroup= new Group();
   sanitizerGroup= new Group();
   maskGroup= new Group();
   highfiveGroup= new Group();

   //creating background

bg=createSprite(450,150);
bg.addImage(backgroundImg);
bg.scale=2;


    
 //creating player
  woman=createSprite(100,250);
  woman.addImage("bg",womanImg);
  woman.scale=3;
 
  woman_running=createSprite(150,270);
   woman_running.addAnimation("bg",woman_runningImg);
   woman_running.scale=2.3;
   woman_running.x=150
   woman_running.setCollider("circle",0,0,20);
  woman_running.debug = false
   
 //create virus
   virus=createSprite(30,275);
   virus.addImage("bg",virusImg);
   virus.scale=0.55;
  
    //creating start and restart button
   start=createSprite(260,260);
   start.addImage("bg",startImg)
   start.scale=0.2;

   restart=createSprite(260,260);
   restart.addImage("bg",restartImg)
   restart.scale=0.5;

   score = 0;
   //creating invisible grounds
  invisibleGround=createSprite(150,340,40,40)
   invisibleGround.visible=false;
  invisibleGround2=createSprite(150,30,40,40)
   invisibleGround2.visible=false;


}

function draw(){
   background(255)
  
  if(gameState==="start"){
   textSize(16)
   fill ("black")
   text("Press the up arrow key to make player jump.",20,360);
  
     bg.visible =true
     woman.visible=true;
     start.visible=true;
     woman_running.visible=false;
     virus.visible=false;
     restart.visible=false;
     

     if(mousePressedOver(start)){
     woman.visible=false;
     start.visible=false;
     gameState="play";
   }
     
}

  if(gameState==="play"){
 
   bg.velocityX=-4;
   if(bg.x<-1){
    bg.x=bg.width/2
  }
  //making player jump
  if(keyWentDown("UP_arrow")){
   woman_running.velocityY = -12;
  }  
  
  woman_running.velocityY = woman_running.velocityY +0.5;
  woman_running.collide(invisibleGround);
  woman_running.collide(invisibleGround2);
  
  
  restart.visible=false;

  virus.visible=true;
  woman_running.visible=true;
  
   
   
   var select_object = Math.round(random(1,4));
   if (World.frameCount % 85 == 0) {
      if (select_object == 1) {
        spawnMask();
      } else if (select_object == 2) {
        spawnSanitizer();
      } else if (select_object == 3) {
          spawnCrowd();
      } else {
        spawnHighFive();
      }
    } 
     
if(maskGroup.isTouching(woman_running)){
  maskGroup.destroyEach();
   score=score+30;
  Collecting.play();
}
if(sanitizerGroup.isTouching(woman_running)){
  sanitizerGroup.destroyEach();
   score=score+30;
  Collecting.play();
}
  if(highfiveGroup.isTouching(woman_running)){
    highfiveGroup.destroyEach();
    crowdGroup.destroyEach();
    dieSound.play();
    gameState="end"
 } 
 if(crowdGroup.isTouching(woman_running)){
 crowdGroup.destroyEach();
 dieSound.play();
 gameState="end"
} 
  }

 if(gameState==="end"){
   bg.velocityX=0;
   woman_running.velocityY=0;
   maskGroup.setVelocityXEach(0);
   sanitizerGroup.setVelocityXEach(0);
   highfiveGroup.setVelocityXEach(0)
   crowdGroup.setVelocityXEach(0);
   maskGroup.setLifetimeEach(0);
   crowdGroup.setLifetimeEach(0);
   sanitizerGroup.setLifetimeEach(0);
   highfiveGroup.setLifetimeEach(0);


   score = 0;
   bg.visible=true;
   woman.visible=false;
   woman_running.visible=false;
   virus.visible=false;
  restart.visible=true;
  


}
if (mousePressedOver(restart)){
   gameState="play"
  
  bg.visible=true;
  bg.velocityX=-3;

  if (bg.x < 0){
   bg.x = bg.width/2;
 }
     
     woman_running.visible=true;
     virus.visible=true;
    
  
    }
drawSprites();
text("Score: "+ score, 300,70);
  
}


function spawnMask() {
   var mask = createSprite(600,260);
   mask.y=Math.round(random(260,280))
   mask.addImage(maskImg);
   mask.velocityX = -1.5;
   mask.lifetime =280;
   mask.scale = 0.2;
   maskGroup.add(mask);
   
  
  
  }
   
  

  function spawnSanitizer() {
   var sanitizer = createSprite(600,260);
   sanitizer.y=Math.round(random(260,280))
   sanitizer.addImage(sanitizerImg);
   sanitizer.velocityX = -1.5;
   sanitizer.lifetime = 280;
   sanitizer.scale = 0.2;
   sanitizerGroup.add(sanitizer);
   

  }

  function spawnHighFive() {
   var highFive = createSprite(600,260);
   highFive.y=Math.round(random(260,280))
   highFive.addImage(highfiveImg);
   highFive.velocityX = -1.9;
   highFive.lifetime = 280;
   highFive.scale = 0.09;
   highfiveGroup.add(highFive);
  }

  function spawnCrowd() {
   var crowd = createSprite(600,260);
   crowd.y=Math.round(random(260,280))
   crowd.addImage(crowdImg);
   crowd.velocityX = - 1.9;
   crowd.lifetime = 280;
   crowd.scale = 0.045;
  crowdGroup.add(crowd);
  }
