var actions = { preload: preload, create: create, update: update };
var width = 790;
var height = 400;
var game = new Phaser.Game(width, height, Phaser.AUTO, "game", actions);
var score = 0;
var labelScore;
var player;
var pipes = [];
var gameGravity = 240;
var gameSpeed = 200;
var jumpPower = 130;
var pipeInterval = 1.75;
var pipeGap = 150;


function preload() {
  game.load.image("playerImg","../assets/flappy-cropped.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipe","../assets/pipe.png");
  game.load.image("pipeEnd","../assets/pipe-end.png");
}


function create() {
 game.stage.setBackgroundColor("#4fdaf0");
 labelScore = game.add.text(20, 60, "0",
 {font: "30px Arial", fill: "#FFFFFF"});
 player = game.add.sprite(80, 200, "playerImg");
 player.anchor.setTo(0.5, 0.5);
 game.physics.startSystem(Phaser.Physics.ARCADE);
 game.physics.arcade.enable(player);
 player.body.gravity.y = gameGravity;
 game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
 game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);


}
function update() {
 game.physics.arcade.overlap(player, pipes, gameOver);
 if(0>player.body.y || player.body.y>width){
 gameOver();
 }
 player.rotation = Math.atan(player.body.velocity.y/gameSpeed);
}

function addPipeBlock(x, y) {
 var block = game.add.sprite(x, y, "pipe");
 pipes.push(block);
 game.physics.arcade.enable(block);
 block.body.velocity.x = -gameSpeed;
}



function addPipeEnd(x, y) {
 var block = game.add.sprite(x, y, "pipeEnd");
 pipes.push(block);
 game.physics.arcade.enable(block);
 block.body.velocity.x = - gameSpeed;
}

function generatePipe() {
 var gapStart = game.rnd.integerInRange(50, height - 50 - pipeGap);
 addPipeEnd(width - 5,gapStart - 25);
 for(var y = gapStart - 75; y>-50; y -= 50){
 addPipeBlock(width,y);
 }
 addPipeEnd(width-5,gapStart+pipeGap);
 for(var y=gapStart + pipeGap + 25; y<height; y += 50){
 addPipeBlock(width,y);
 }
 changeScore();
}

function playerJump() {
 player.body.velocity.y = - jumpPower;
}

function changeScore() {
 score+=1;
 labelScore.setText(score.toString());
}

function gameOver(){
 registerScore(score);
 game.state.restart();
 score = 0
}
