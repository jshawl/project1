function BlackJack(){
  this.reset();
}

BlackJack.prototype = {
  deck: [],
  pHand: {},
  dHand: {},
  bank: 100,
  pot: 0,

  reset: function() {
    this.deck = this.newDeck();
    this.pHand = {val:0, soft: 0, cards: 0};
    this.dHand = {val:0, soft: 0, cards: 0};
    this.pot = 0;
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
  bet: function(){
    if (10 > this.bank){
      console.log("bet exceeds bank")
      return false;
    }
    this.pot += 20;
    this.bank -= 10;
  },

  settle: function(){
    var pScore = this.pHand.val;
    var dScore = this.dHand.val;
    if (pScore === dScore){
      this.bank += (this.pot / 2);
      this.pot = 0;
      return "Push";
    }
    if (pScore <= 21 && pScore > dScore || dScore > 21){
      var payout = this.pot
      this.bank += this.pot;
      this.pot = 0;
      return ("You win with "+ pScore +"! Payout: $" + payout)
    }
    if (pScore < dScore || pScore > 21){
      this.pot = 0;
      return ("Dealer wins!");
    }
  },

  drawCard: function(player) {
    var card = this.deck.pop();
    var val = this.cardValue(card);
    player.val += val;
    if (val === 11){player.soft++;}
    player.cards++;
    return card;
  },

  cardValue: function(card){
    var val = Math.floor(card / 4) + 1;
    if (val == 1){val = 11;}
    else if (val > 10){val = 10;}
    return val;
  },
  checkBust: function(player){
    if (player.val > 21){
      if(player.soft > 0){
        player.val -= 10;
        player.soft--;
        return this.checkBust(player);
      }
      else{return true;}
    }
    else{return false;}
  }

}
