const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var gameState = "onSling";
var engine, world;
var box1, pig1;
var platform;
var backIMG;
var slingshot;
var chain;

function preload() 
{
   getBackgroundImage();
}
function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    
    ground = new Ground(600,height,1200,20)

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 200);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    platform = new Ground(150, 300, 500, 200);

    bird = new Bird(200,50);

    slingshot = new SlingShot(bird.body, {x:200, y:50});
}

function draw(){
    
    
    if(background(backIMG))
    {
        background(backIMG);
    }
    Engine.update(engine);

    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display(); 
    platform.display();
    bird.display();
    slingshot.display();
}

function mouseDragged()
{
    if(gameState !== "launched")
    {
    Matter.Body.setPosition(bird.body, {x:mouseX, y:mouseY});
    }
}

function mouseReleased()
{
    slingshot.fly();
    gameState = "launched";
}

function restart()
{
    if(keyCode == 114)
    {
        slingshot.attach(bird.body);
    }
}

async function getBackgroundImage()
{
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/kolkata");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11, 13);
    if(hour >= 06 && hour <= 19)
    {
        bg  = "sprites/bg.png";
    }
    else
    {
        bg = "sprites/bg2.jpg";
    }
    backIMG = loadImage(bg);
}