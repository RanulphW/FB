
var stateActions = { preload: preload, create: create, update: update };


var width = 790;
var height = 400;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var pipes;
var pipes = [];
var gapSize = 100;
var gapMargin = 20;
var blockHeight = 50;
var pipes = [];
var gameGravity = 200;
var gameSpeed = 200;
var jumpPower = 200;
var pipeInterval = 1.75;
var pipeGap = 100;



function preload() {

  game.load.image("playerimg","../assets/flappy-cropped.png")
  game.load.audio("score3", "../assets/system-fault.ogg");
  game.load.audio("score2", "../assets/score.ogg");
  game.load.audio("score", "../assets/Soviet_Anthem_Instrumental_1955.ogg");
  game.load.image("pipeBlock","../assets/pipe_red.png")
  game.load.image("pipe","../assets/pipe.png");
game.load.image("pipeEnd","../assets/pipe‐end.png");


}

function create() {

  game.sound.play("score");

  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.stage.setBackgroundColor("#84e3e1");

  player = game.add.sprite(30 , 30, "playerimg");
  game.physics.arcade.enable(player);
  player.body.gravity.y = 150;
  player.anchor.setTo(0.5, 0.5);
  player.rotation = Math.atan(player.body.velocity.y / 200);


}

   game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(spaceHandler);



  labelScore = game.add.text(20, 20, " ");

  var pipeInterval = 4 * Phaser.Timer.SECOND;
  game.time.events.loop(
   pipeInterval,
   generatePipe
 );
}



function update() {
  game.physics.arcade.overlap(
            player,
            pipes,
          gameOver);

  if(player.body.y < 0){
    gameOver();
  }

  if(player.body.y > 400-20){
    gameOver();
  }
}



function clickHandler(event) {
  game.sound.play("score");
}

function spaceHandler(){
  player.body.velocity.y = -110
  game.sound.play("score2");

}

function ChangeScore() {
  score = score + 1
  labelScore.setText(score.toString());

}


function addPipeBlock(x, y){
  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -100;
}

function generatePipe(){
  var gapStart = game.rnd.integerInRange(gapMargin,height - gapSize - gapMargin);
  for(var y = gapStart; y > 0; y -= blockHeight) {
    addPipeBlock(width, y - blockHeight)
  }
  for(var y = gapStart + gapSize; y < height; y += blockHeight){
    addPipeBlock(width, y);
  }
  ChangeScore();
}

function playerJump(){
  player.body.velocity.y = -150;
}

function gameOver(){
 registerScore(score);
 game.state.restart();
 score = 0
}
