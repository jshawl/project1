function BlackJackView(model){
  this.model = model;
  this.listen();
}

BlackJackView.prototype = {
  listen: function(){
    $(".deck").on("click", this.deal.bind(this));
  },

  deal: function(){
    console.log(this);
    var dealerCard = this.model.drawCard(this.model.dHand);
    $(".dealer").append($("<div>" + this.cardString(dealerCard) + "</div>")
                        .addClass("card"));
    var playerCard = this.model.drawCard(this.model.pHand);
    $(".player").append($("<div>" + this.cardString(playerCard) + "</div>")
                        .addClass("card"));
    var playerCard = this.model.drawCard(this.model.pHand);
    $(".player").append($("<div>" + this.cardString(playerCard) + "</div>")
                        .addClass("card"));
    console.log(this.model.pHand);
    $(".deck").text("Hit").off();

  },
  cardString: function(card){
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
}
