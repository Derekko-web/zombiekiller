var bg, bgImg;
var player, shooterImg, shooter_shooting;
var bullet, bulletImg;
var edges;
var zombie, zombieImg;
var zombieGroup,
  bulletGroup,
  heart1,
  heart2,
  heart3,
  heart1Img,
  heart2Img,
  heart3Img;
var life = 3;
var explosionSound;
var winSound;
var zombiecount = 0;
var gameState = "play";
var zombie2, zombie2Img, zombie3, zombie3Img;
function preload() {
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  bulletImg = loadImage("assets/download-bullet-image-old-10.png");
  bgImg = loadImage("assets/bg.jpeg");
  zombieImg = loadImage("assets/zombie.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  explosionSound = loadSound("assets/explosion.mp3");
  winSound = loadSound("assets/win.mp3");
  zombie2Img = loadImage("assets/monster1.png");
  zombie3Img = loadImage("assets/monster2.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 1.1;

  //creating the player sprite
  player = createSprite(displayWidth - 1500, displayHeight - 300, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3;

  player.debug = true;
  zombieGroup = new Group();
  zombie2Group = new Group();
  zombie3Group = new Group();

  bulletGroup = new Group();

  heart1 = createSprite(300, 50);
  heart1.addImage("h1", heart1Img);
  heart1.scale = 0.5;

  heart2 = createSprite(350, 50);
  heart2.addImage("h2", heart2Img);
  heart2.scale = 0.5;

  heart3 = createSprite(400, 50);
  heart3.addImage("h3", heart3Img);
  heart3.scale = 0.5;

  // player.debug = false
  // player.Debug =false
  // Player.debug = true

  //player.Collider("rectagle",0,0,300,300)
  //player.setcollider("rectangle",0,0)
  player.setCollider("rectangle", 0, 0, 300, 300);
  // player.Setcollider("rectangle",0,0,300,300)
}

function draw() {
  background(0);

  edges = createEdgeSprites();
  player.collide(edges);
  if (gameState === "play") {
    //moving the player up and down and making the game mobile compatible using touches
    if (keyDown("UP_ARROW") || touches.length > 0) {
      player.y = player.y - 30;
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
      player.y = player.y + 30;
    }

    //release bullets and change the image of shooter to shooting position when space is pressed
    if (keyWentDown("space")) {
      player.addImage(shooter_shooting);
      bullet = createSprite(player.x + 20, player.y);
      bullet.addImage("bullet", bulletImg);
      bullet.scale = 0.05;
      bullet.velocityX = 4;
      bulletGroup.add(bullet);
    }

    //player goes back to original standing image once we stop pressing the space bar
    else if (keyDown("space")) {
      player.addImage(shooter_shooting);
      // player.addImage()
      // player.addImage(shooterImg)
      //player.addImage(shooter_1.png)
    }
    spawnZombies();
    spawnZombies2();
    spawnZombies3();
    if (player.y < 80) {
      player.y = 80;
    }
    if (player.y > 630) {
      player.y = 630;
    }
    for (var i = 0; i < zombieGroup.length; i += 1) {
      if (zombieGroup.get(i).isTouching(player)) {
        zombieGroup.get(i).destroy();
        life -= 1;
      }
    }
    for (var i = 0; i < zombieGroup.length; i += 1) {
      if (bulletGroup.isTouching(zombieGroup.get(i))) {
        zombieGroup.get(i).destroy();
        bulletGroup.destroyEach();
        explosionSound.play();
        zombiecount += 1;
      }
    }
    for (var i = 0; i < zombie2Group.length; i += 1) {
      if (zombie2Group.get(i).isTouching(player)) {
        zombie2Group.get(i).destroy();
        life -= 1;
      }
    }
    for (var i = 0; i < zombie2Group.length; i += 1) {
      if (bulletGroup.isTouching(zombie2Group.get(i))) {
        zombie2Group.get(i).destroy();
        bulletGroup.destroyEach();
        explosionSound.play();
        zombiecount += 5;
      }
    }
    for (var i = 0; i < zombie3Group.length; i += 1) {
      if (zombie3Group.get(i).isTouching(player)) {
        zombie3Group.get(i).destroy();
        life -= 1;
      }
    }
    for (var i = 0; i < zombie3Group.length; i += 1) {
      if (bulletGroup.isTouching(zombie3Group.get(i))) {
        zombie3Group.get(i).destroy();
        bulletGroup.destroyEach();
        explosionSound.play();
        zombiecount += 10;
     
      }
    }
    if (life === 2) {
      heart3.destroy();
    }
    if (life === 1) {
      heart2.destroy();
    }
    if (life === 0) {
      gameState = "end";
      heart1.destroy();
    }
     else if (gameState === "end") {
      winSound.play();
      zombiegroup.setLifetimeEach(0);
      zombiegroup.setVelocityXEach(0);
      zombie2group.setLifetimeEach(0);
      zombie2group.setVelocityXEach(0);
      zombie3group.setLifetimeEach(0);
      zombie3group.setVelocityXEach(0);
    }
  }

  drawSprites();

  fill("White");
  textSize(40);
  text("zombie count:" + zombiecount, width - 400, 50);
}
function spawnZombies() {
  if (frameCount % 60 === 0) {
    zombie = createSprite(width - 20, random(300, 1000));
    zombie.addImage("zombie", zombieImg);
    zombie.scale = 0.1;
    zombie.velocityX = -8;
    zombie.debug = true;
    zombie.setCollider("rectangle", 0, 0, 1000, 1000);
    zombie.lifetime = 200;
    zombieGroup.add(zombie);
    //fix player ypositon when it is touching the bottom edge
  }
}
function spawnZombies2() {
  if (frameCount % 100 === 0) {
    zombie2 = createSprite(width - 20, random(300, 1000));
    zombie2.addImage("zombie2", zombie2Img);
    zombie2.scale = 0.1;
    zombie2.velocityX = -8;
    zombie2.debug = true;
    zombie2.setCollider("rectangle", 0, 0, 1000, 1000);
    zombie2.lifetime = 200;
    zombie2Group.add(zombie2);
  }
}
function spawnZombies3() {
  if (frameCount % 200 === 0) {
    zombie3 = createSprite(width - 20, random(300, 1000));
    zombie3.addImage("zombie3", zombie3Img);
    zombie3.scale = 0.1;
    zombie3.velocityX = -8;
    zombie3.debug = true;
    zombie3.setCollider("rectangle", 0, 0, 1000, 1000);
    zombie3.lifetime = 200;
    zombie3Group.add(zombie3);
  }
}
