const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ball, player, grass;
var ball_con, ball_con_2
var rope;
var field_img;
var balloon_1, balloon_2;
var ball_img, player_img;

var air;

var cut_btn_1, cut_btn_2;
var catch_sound, cut_sound;
var music;
var hit;
var mute_btn;

function preload() {

  ball_img = loadImage("Baseball.png");
  field_img = loadImage("Baseball_Field.jpeg");
  player_img = loadImage("Player.png");

  music = loadSound("sound1.mp3");
  hit = loadSound("martinimeniscus_sport_baseball_catch_glove_003.mp3");
  cut_sound = loadSound("rope_cut.mp3");
  air = loadSound("air.wav");
}

function setup() {
  createCanvas(600, 700);
  frameRate(80);

  music.play();
  music.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  cut_btn_1 = createImg("cut_button.png");
  cut_btn_1.position(100, 90);
  cut_btn_1.size(50, 50);
  cut_btn_1.mouseClicked(drop);

  cut_btn_2 = createImg("cut_button.png");
  cut_btn_2.position(450, 90);
  cut_btn_2.size(50, 50);
  cut_btn_2.mouseClicked(drop2);

  rope = new Rope(7, {
    x: 120,
    y: 90
  });
  rope2 = new Rope(7, {
    x: 490,
    y: 90
  });

  mute_btn = createImg("mute.png");
  mute_btn.position(width - 50, 20);
  mute_btn.size(50, 50);
  mute_btn.mouseClicked(mute);

  grass = new Ground(300, height, width, 20);

  player = createSprite(150, height - 200, 100, 100);
  player.scale = 0.2;
  player.addImage(player_img);

  ball = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body, ball);

  ball_con = new Link(rope, ball);
  ball_con_2 = new Link(rope2, ball);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(59);
}

function draw() {
  background(51);
  image(field_img, 0, 0, width, height);

  push();
  imageMode(CENTER);
  if(ball !=null){
    image(ball_img, ball.position.x, ball.position.y, 70, 70);
  }
  pop();

  rope.show();
  rope2.show();

  
  Engine.update(engine);
  grass.show();

  drawSprites();

  if(collide(ball, player, 80)==true)
  {
    World.remove(engine.world, ball);
    ball = null;
    hit.play();
  }

  if(ball!=null && ball.position.y >=650)
  {
    music.stop();
    ball = null;
  }
}

function drop() {
  cut_sound.play();
  rope.break();
  ball_con.dettach();
  ball_con = null;
}

function drop2() {
  cut_sound.play();
  rope2.break();
  ball_con_2.dettach();
  ball_con_2 = null;
}

function collide(body, sprite, x) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= x) {
      return true;
    } else {
      return false;
    }
  }
}



function mute() {
  if (music.isPlaying()) {
    music.stop();
  } else {
    music.play();
  }
}
