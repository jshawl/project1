function BlackJack(){
  this.reset();
}

BlackJack.prototype = {
  deck: [],
  pHand: {},
  dHand: {},

  reset: function() {
    this.deck = this.newDeck();
    this.pHand = {val:0, soft: 0};
    this.dHand = {val:0, soft: 0};
  },

  newDeck: function() {
    //Fisher-Yates inside out shuffle
    var deck = [];
    for (var i = 0; i < 52; i++){
      var j = Math.floor(Math.random() * i);
      if (j != i){deck[i] = deck[j];}
      deck[j] = i;
    }
    return deck;
  },

  deal: function(hand) {
    var card = this.deck.pop();

  }
}
var deck = [];
var hand = [];
var handVals = [];
var dealing = true;



$(".deck").on("click", deal);
$(".hold").on("click", function(){
  window.alert("You hold with " + handVals.reduce(function(a, b){return a + b;}));
  dealing = false;
});
$(".restart").on("click", function(){
  document.location.reload();
});

function deal(card){
  if (dealing){
    var card = (card >= 0 ? card : deck.pop());
    var value = cardValue(card);
    hand.push(card);
    handVals.push(value);
    drawCard(card);
    checkEnd();
  }
}
function checkEnd(){
  var points = handVals.reduce(function(a, b){return a + b;});
  console.log(points);
  if (points > 21){
    var aceAt = handVals.indexOf(11);
    if (aceAt >= 0){
      handVals[aceAt] = 1;
      return checkEnd();
    }
    window.alert("Bust!");
    dealing = false;
  }
  else if (points == 21) {
    if (checkBlackJack()){window.alert("Black Jack!");}
    else window.alert("21!");
    dealing = false;
  }
}

function checkBlackJack(){
  return (hand.length == 2);
}

function drawCard(card){
  $(".hand").append($("<div>" + cardString(card) + "</div>")
                      .addClass("card")
             );
}

//Get point value of card -- could use tidying
function cardValue(card){
  var val = Math.floor(card / 4) + 1;
  if (val == 1){val = 11;}
  else if (val > 10){val = 10;}
  return val;
}
function stringCard(string){    //doesn't catch a card value out of range
  var num = string.slice(0, string.length - 1).toUpperCase();
  console.log(num);
  var suit = string.slice(string.length - 1).toUpperCase();
  console.log(suit);
  var suits = ["H", "D", "C", "S"];
  if (isNaN(num)){
    if (num == "A"){num = "1";}
    else if (num == "J"){num = "11"}
    else if (num == "Q"){num = "12"}
    else if (num == "K"){num = "13"}
    else {num = -1;}
    }
  var suitNum = suits.indexOf(suit);
  var card = (parseInt(num) - 1) * 4 + suitNum;
  if (num < 0 || suitNum < 0){card = -1;}
  return card;
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
