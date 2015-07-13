var deck = [];
var hand = [];
var handVals = [];

//Fisher-Yates inside out shuffle
for (var i = 0; i < 52; i++){
  var j = Math.floor(Math.random() * i);
  if (j != i){deck[i] = deck[j];}
  deck[j] = i;
}

function deal(){
  var card = deck.pop();
  var value = cardValue(card);
  hand.push(card);
  handVals.push(value);
  drawCard(card);
}
function drawCard(card){
  $(".hand").append($("<div>" + cardString(card) + "</div>")
                      .addClass("card")
             );
}

function cardValue(card){
  var val = Math.floor(card / 4) + 1;
  if (val == 1){val = 11;}
  if (val > 10){val = 10;}
  return val;
}

function cardString(card){
  var number = Math.floor(card / 4) + 1;
  var suit = card % 4;
  var suits = ["&hearts;", "&diams;", "&clubs;", "&spades;"];
  if (number == 1){number = "A"}
  else if (number < 11) {number = number.toString();}
  else if (number == 11) {number = "J";}
  else if (number == 12) {number = "Q";}
  else {number = "K";}
  return number + suits[suit];
}
