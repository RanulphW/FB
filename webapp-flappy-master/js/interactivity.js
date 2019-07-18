var hscore = 0;
var scoreEntryContents = "";

jQuery("#scoresbtn").on("click", function(){
  jQuery("#content").empty();
  jQuery("#content").append(
    scoreEntryContents
  );
});

jQuery("#creditsbtn").on("click", function(){
  jQuery("#content").empty();
  jQuery("#content").append(
    "<p>"+"This was made by Ranulph Wheway"+"</p>"
  )
})

jQuery("#helpbtn").on("click", function(){
  jQuery("#content").empty();
  jQuery("#content").append(
    "<p>"+"For help email ranulphfb@gmail.com"+"</p>"
  )
})

function registerScore(score){
  // jQuery("#content").append(score + " " + playerName + " ");
  var playerName = prompt("What's your name?");
  var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";
  if(score > hscore) {
      hscore = score;
      scoreEntryContents = scoreEntry;
    }
}
