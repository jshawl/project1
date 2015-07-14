function BlackJack(){
  this.reset();
}

BlackJack.prototype = {
  deck: [],
  pHand: {},
  dHand: {},
  active: false,

  reset: function() {
    this.deck = this.newDeck();
    this.pHand = {val:0, soft: 0, cards: 0};
    this.dHand = {val:0, soft: 0, cards: 0};
    this.active = true;
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
