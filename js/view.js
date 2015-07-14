function BlackJackView(model){
  this.model = model;
  this.listen();
}

BlackJackView.prototype = {
  listen: function(){
    $(".deck").on("click", this.deal.bind(this));
    //$(".hold").
  },

  deal: function(){
    this.dealCard(this.model.pHand);
    this.dealCard(this.model.dHand);
    this.dealCard(this.model.pHand);
    this.dealCard(this.model.dHand, true)
    $(".deck").text("Hit").off();
    $(".deck").on("click", this.hit.bind(this))
    $(".hold").on("click", this.dealerPlay.bind(this))
  },
  hit: function(){
    this.dealCard(this.model.pHand);
    if (this.model.checkBust(this.model.pHand)){
      window.alert("Bust!");
      $(".deck").off();
      this.dealerPlay();
    }
  },
  dealerPlay: function(){
    $(".deck").off();
    $(".hide").removeClass("hide");
    while(this.model.dHand.val < 17){
      this.dealCard(this.model.dHand);
    }

  },
  dealCard: function(to, hide){
    var card = this.cardString(this.model.drawCard(to));
    var hand = (to == this.model.dHand ? ".dealer" : ".player")
    this.printCard(card, hand, hide);
  },
  printCard: function(card, hand, hide){
    var holder = $("<div></div>");
    holder.append($("<div>" + card + "</div>").addClass(hide?"hide":""));
    holder.addClass("card");
    console.log(holder);
    $(hand).append(holder);
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
