var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","33841f90-7a53-4346-b956-e51d1961959b","e5a1d31e-8ecc-481a-bdf0-34d700ce7de1","2f7731c0-0c1a-4cf8-847c-ce369a6d17a4"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":3,"version":"fJh2K_YAW1UgnNb_fC1wtvcH4lXpVoEM","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"stone","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":"pkztKV0xpQABVWQ8D7q2w1X1LmaK4riA","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png"},"e5a1d31e-8ecc-481a-bdf0-34d700ce7de1":{"name":"banana","sourceUrl":null,"frameSize":{"x":382,"y":310},"frameCount":1,"looping":true,"frameDelay":12,"version":"k2i2rpBqO4AFATiGokG.q.3tR4q2GEFl","loadedFromSource":true,"saved":true,"sourceSize":{"x":382,"y":310},"rootRelativePath":"assets/e5a1d31e-8ecc-481a-bdf0-34d700ce7de1.png"},"2f7731c0-0c1a-4cf8-847c-ce369a6d17a4":{"name":"jungle","sourceUrl":"assets/v3/animations/IfAMdW333_FkWSu73pAZ5CgLJszonNChV5YDy3BG5Fg/2f7731c0-0c1a-4cf8-847c-ce369a6d17a4.png","frameSize":{"x":590,"y":315},"frameCount":1,"looping":true,"frameDelay":4,"version":"upxKt9iIqYw.FQKC3aTETufGBa7L30sH","loadedFromSource":true,"saved":true,"sourceSize":{"x":590,"y":315},"rootRelativePath":"assets/v3/animations/IfAMdW333_FkWSu73pAZ5CgLJszonNChV5YDy3BG5Fg/2f7731c0-0c1a-4cf8-847c-ce369a6d17a4.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var background=createSprite(200,200,30,30);
background.setAnimation("jungle");
background.scale=1.3;

var play=1;
var end=0;
var gameState=play;

var monkey = createSprite(60,290,20,20);
monkey.setAnimation("monkey");
monkey.scale=0.2;

var invisibleGround = createSprite(200,360,400,5);
invisibleGround.visible = false;

var obstacleGroup=createGroup();

var bananaGroup=createGroup();

var score=0;



function draw() {
  drawSprites();
  background.velocityX = -6 ;
  
  createEdgeSprites();
  
  
  if(gameState===play){
    
    
    fill("blue");
  textSize(30);
  text("Score : " + score, 25, 50);
  
  
  
  obstacles();
  fruits();
  
   } 
  
  
  
  monkey.collide(invisibleGround);
  
 if (monkey.isTouching(bananaGroup)) {
       bananaGroup.destroyEach();
       score=score+1;
       monkey.scale = monkey.scale+0.005;
    }
  
  if (monkey.isTouching(obstacleGroup)) {
       monkey.scale = monkey.scale-0.005;
       obstacleGroup.destroyEach();
    }
    
    if (background.x < 0){
      background.x = background.width/2;
    }
    
    
  //monkey.debug=true;
  monkey.setCollider("circle",0,0,300);
    
   monkey.velocityY = monkey.velocityY + 0.8; 
  
  if(keyDown("space")&& monkey.y >= 269){
      monkey.velocityY = -16 ;
      //playSound("jump.mp3");
    }
  
  }
  

function obstacles(){
  if(World.frameCount % 90 === 0) {
    var stone = createSprite(400,330,10,40);
    stone.velocityX = -9;
    
    //generate random obstacles
      stone.setAnimation("stone");
    
    //assign scale and lifetime to the obstacle           
    stone.scale = 0.25;
    stone.lifetime = 70;
    //add each obstacle to the group
    obstacleGroup.add(stone);
  }
}


function fruits(){
  if (World.frameCount%90===0) {
    var banana=createSprite(0,0,20,200);
    banana.scale=0.2;
    banana.setAnimation("banana");
    banana.x=randomNumber(100,150);
    banana.y=randomNumber(0,0);
    
    banana.velocityY=8;
    banana.setLifetime=50;
    
    bananaGroup.add(banana);
    }
}
  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
