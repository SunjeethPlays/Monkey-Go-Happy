var monkey, monkey_running;

var ground;

var banana, bananaImage, obstacle, obstacleImage;

var FoodGroup, obstacleGroup;

var score, bananas;

var gamestate = "PLAY";

function preload() {

  //adding animation for running monkey
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  //adding images for bananas and stones
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {

  createCanvas(600, 400);

  // creating monkey
  monkey = createSprite(50, 350);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  //creating ground
  ground = createSprite(300, 390, 600, 20);
  ground.shapeColor = "grey";

  //making groups for bananas and stones
  foodGroup = new Group();
  obstacleGroup = new Group();

  //score for distance and score for bananas eaten
  score = 0;
  bananas = 0;
}


function draw() {

  background(220);

  if (gamestate == "PLAY") {

    // creating score for distance
    score = score + (frameCount % 5 == 0);

    //functions of monkey
    monkey.collide(ground);
    //gravity for monkey so it does not fly off when pressed spacebar 
    monkey.velocityY = monkey.velocityY + 0.4;

    //for monkey to jump  
    if (keyDown("space") && monkey.y >= 349) {
      monkey.velocityY = -13;
    }

    //to add one point when monkey eats banana  
    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
      bananas = bananas + 1;
    }

    //to end the game when monkey hits the rock  
    if (monkey.isTouching(obstacleGroup)) {
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.destroy();
      gamestate = "END";
    }

    //calling food and obstacle spawning functions
    spawnFood();
    spawnObstacle();

    drawSprites();

    //text for distance score and food score  
    textSize(20);
    fill("black");
    text("Survival Time : " + score, 5, 20);
    text("Bananas : " + bananas, 475, 20);
  }

  // to end the game
  if (gamestate == "END") {
    end();
  }

}

function spawnFood() {

  //for banana to spawn every 150 frames
  if (frameCount % 150 == 0) {
    banana = createSprite(600, 200);
    banana.addImage(bananaImage);
    banana.scale = 0.1;

    // for increasing speed of bananas and also to give a moving ground effect
    banana.velocityX = -(5 + 2 * score / 50);

    //to prevent memory leak 
    banana.lifetime = 150;

    //random Y positions of the bananas
    banana.y = Math.round(random(120, 200));

    //to add banana to food group
    foodGroup.add(banana);
  }

}

function spawnObstacle() {

  //for obstacles to spawn every 150 frames
  if (frameCount % 150 == 0) {
    obstacle = createSprite(600, 350);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.3;

    // for increasing speed of obstacles and also to give a moving ground effect    
    obstacle.velocityX = -(5 + 2 * score / 50);

    //to prevent memory leak 
    banana.lifetime = 150;

    //to add obstacles to obstacles group
    obstacleGroup.add(obstacle);
  }

}


// to end the game
function end() {

  textSize(50);
  fill("black");
  text("Game Over !", 150, 200);

}