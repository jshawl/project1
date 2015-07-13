function BlackJackView(model){
  this.model = model;
  this.listen();
}

BlackJackView.prototype = {
  listen: function(){
    $(".deck").on("click", this.deal.call(this));
  }

  deal: function(){
    this.model.drawCard(this.model.dHand);

  }
}
