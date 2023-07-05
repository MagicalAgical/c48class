

let engine;
let world;
var ground;


var mainPlayer,mainPlayerImage,goldCoin,goldCoinImage,bricks,brickImage,brickGroup,brickSound;
var backgoundImage;
var back;
var dogAnimation;
var dogStanding;
var wrongImg;
var coin,coinGroup, coinSound;
var backgroundMusic;

var PLAY,END

var gameState = "PLAY";

var score = 0;


function preload(){
  mainPlayerImage = loadImage("./assests/player.jpeg")
  goldCoinImage = loadImage("./assests/goldCoin.png")
  brickImage = loadImage("./assests/bricks.jpeg")
  backgoundImage = loadImage("./assests/background.jpeg")
  dogStanding = loadImage("./assests/dog3.png")


  wrongImg = loadImage("./assests/wrong.png")


  dogAnimation = loadAnimation("./assests/dog1.png","./assests/dog2.png","./assests/dog3.png")


  coinSound = loadSound("./assests/coinsound.mp3")
  brickSound = loadSound("./assests/bricksound.mp3")
  backgroundMusic = loadSound("./assests/bgdsound.mp3")

}

function setup() 
{


  createCanvas(windowWidth,windowHeight);
  back = createSprite(displayWidth/2-10,displayHeight/2-40,displayWidth,displayHeight)
  back.addImage("background",backgoundImage);
  back.scale = 13

  
  

  ground = createSprite(displayWidth-800,displayHeight+200,3000,20)
  ground.visible = true;


  dog = createSprite(300,height-70,180,920)
  dog.addAnimation("running",dogAnimation)
  dog.scale = 3.5

  


  

  coinGroup = createGroup();
  brickGroup = createGroup();




  
  


  
  

  

  

}



function draw() 
{


  

  
  background(221);
  


  
   
  
  

  if(gameState === "PLAY"){
    backgroundMusic.play();
    back.velocityX = 1

    if(back.x > displayWidth){
   back.x=back.width/2
   console.log("work")
  }
  

  if(keyIsDown(UP_ARROW) && dog.y > 900){
    dog.velocityY = -20
    dog.addImage(dogStanding);

    

  }

  dog.velocityY = dog.velocityY + 0.8
   dog.collide(ground);



  


  // if(dog.collide(coin)){
  //   coin.remove();
  //   dog.velocityX=0.2
  // }

  // brick.velocityX = -5 

  


  
  if(coinGroup.collide(dog)){
    coinGroup[0].destroy();
    dog.velocityX=0.1
    score = score+2
    coinSound.play();

  }


  if(brickGroup.collide(dog)){
    gameState = "END";
    brickSound.play();
    
  }


  

  
  
  spawnCoins();
  spawnBricks();
  
  drawSprites();

  fill("red")
  stroke(200)
  textSize(30)
  text("score:" + score , windowWidth-300, 200 )

  }

  else if(gameState === "END"){
    dog.velocityX = 0
    dog.velocityY = 0
  
    coinGroup.setVelocityXEach(0);
    brickGroup.setVelocityXEach(0);


    background(0)

    fill("red")
    stroke(200)
    textSize(100)
    textAlign(CENTER)
    text("Game Over",600,400)
   
    
    
  }

  if(score === 20){
    dog.velocityX = 0
    dog.velocityY = 0
  
    coinGroup.setVelocityXEach(0);
    brickGroup.setVelocityXEach(0);


    background(0);

    fill("red");
    stroke(200);
    textSize(100);
    textAlign(CENTER);
    text("You Win!",600,400);
  }
  


  

 
   
}


function spawnCoins(){
  if(frameCount % 100 === 0){
  coin = createSprite(2000,800,180,920)
  coin.addImage("coin",goldCoinImage)
  coin.scale = 0.5

  coin.velocityX = -5

   coin.y = Math.round(random(700,900))


  coin.lifetime = 1000


  coinGroup.add(coin)

  




  




    
  }
}

function spawnBricks(){
  if(frameCount % 150 === 0){
    brick = createSprite(3000,height-70,130,920)
    brick.addImage("brick",brickImage)
    brick.scale = 0.4
  

  brick.velocityX = -6

  brick.x = Math.round(random(windowWidth+300,windowHeight))

  brick.lifetime = 1000


  brickGroup.add(brick)




  




    
  }
}
