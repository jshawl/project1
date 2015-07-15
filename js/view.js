function BlackJackView(model){
  this.model = model;
  this.init();
}

BlackJackView.prototype = {
  init: function(){
    this.update();
  },

  update: function(){
    console.log("updating...");
    $(".pot span").text(this.model.pot);
    $(".bank span").text(this.model.bank);
    $(".textOut").text(this.model.textOut);
    $(".deck").off();
    $(".hold").off();
    $(".bet").off();
    if (this.model.deal){
      $(".deck").on("click", this.deal.bind(this));
    }
    if (this.model.playerTurn){
      $(".deck").text("Hit")
      $(".deck").on("click", this.hit.bind(this));
      $(".hold").on("click", this.dealerPlay.bind(this));
    }
    if (this.model.betting){
      $(".bet").show();
      $(".bet").on("click", this.placeBet.bind(this));
    }
    else{
      $(".bet").hide();
    }
    if (this.model.handOver){
      console.log("binding restart");
      $(".deck").text("New Hand")
      $(".deck").on("click", this.restart.bind(this));
    }
  },
  restart: function(){
    this.model.reset();
    this.update();
    $(".hand").empty();

  },
  placeBet: function(e){
    this.model.textOut = ""
    this.model.deal = true;
    var amount = $(e.target).attr("name").substring(1);
    this.model.bet(amount);
    console.log(this.model.pot);
    this.update();
  },

  deal: function(){
    this.model.betting = false;
    this.model.deal = false;
    this.update();
    this.dealCard(this.model.pHand);
    this.dealCard(this.model.dHand);
    this.dealCard(this.model.pHand);
    this.dealCard(this.model.dHand, true)
    this.model.playerTurn = true;
    this.update();
  },
  hit: function(){
    this.dealCard(this.model.pHand);
    if (this.model.checkBust(this.model.pHand)){
      console.log("bust");
      this.model.playerTurn = false;
      this.update();
      this.model.settle();
    }
  },
  dealerPlay: function(){
    this.model.playerTurn = false;
    $(".dealer .hide").css("color", "black")
    this.update();
    while(this.model.dHand.val < 17){
      this.dealCard(this.model.dHand);
    }
    this.model.settle();    // update bank and pot
    this.update();
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
    $(hand +" .hand").append(holder);
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
