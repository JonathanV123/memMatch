
//Class Game
var Game = function(){
    this.leftCards = [];
    this.rightCards = [];
    this.checkCards = [];
    this.accuracy = 0;
    this.amountClicked= 0;
    this.leftCard = false;
    this.rightCard = false;
    this.correctMatch = 0;
    this.incorrectMatch = 0;
    this.playerHP = 0;
// This refers to an instance of Game Class
};
//Creating Card CLASS that takes 1 parameter
var Card = function(id) {
    //THIS refers to instance of Card Class
    this.id = id;
};
//Defining a Method (setUpGame) on the Game Class
Game.prototype.setUpGame = function(){
    //This is an instance of game calling createCards and renderCards on THIS instance of Game
  this.createCards(9);
  this.shuffleCards(this.leftCards);
  this.shuffleCards(this.rightCards);
  this.renderCards();
  this.addClickHandlers();
  this.cardDefault();
};
Game.prototype.createCards = function(cardCount) { //Review
    for (i = 1; i <= cardCount; i++) {
        this.leftCards.push(
            new Card(i)
        );
        this.rightCards.push(
            new Card(i)
        )
    }
};
Game.prototype.shuffleCards = function(cards){
    //Shuffle Cards
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
};
//Defining a Method (renderCards) on the Game Class
Game.prototype.renderCards = function() {
        // clearTimeout(this);
        console.log('Ye!');
        for (var i = 0; i < game.leftCards.length; i++) {
                                                                                                //why Plus needed here
            var CardHtmlStringLeft = '<div class="leftCard"><div class = "front card-' + game.leftCards[i].id + '"></div><div' + ' class' +
                ' =' + ' "back"></div></div>';
            var CardHtmlStringRight = '<div class="rightCard"><div class = "front card-' + game.rightCards[i].id + '"></div><div' +
                ' class' + ' =' + ' "back"></div></div>';
            var leftCardElement = $(CardHtmlStringLeft);
            var rightCardElement = $(CardHtmlStringRight);
            $(".right_side").append(rightCardElement);
            $(".left_side").append(leftCardElement);
        }
};
Game.prototype.cardDefault = function(){
    console.log("Card default called, what is this: ", this);
    $(".leftCard").removeClass("flipcard inactive");
    $(".rightCard").removeClass("flipcard inactive");
    this.leftCard = false;
    this.rightCard = false;
    console.log('Kool with a k');
};
Game.prototype.checkMatch = function(card, side, opposite){
    var self = this;
    var $card = $(card);
    self.amountClicked++;
    $card.toggleClass('flipcard');
    $("." + side + "Card").addClass("inactive");
    console.log($(card).children(":first"));
    self.accuracy++;
    self[side + 'Card'] = true;
    if(self[side + 'Card'] && !self[opposite + 'Card']){
        console.log('okie dokie');
        self.checkCards.push($card.children(":first"));
    }
    else {
        self.checkCards.push($card.children(":first"));
        console.log('check cards', self.checkCards[0].css('background-image'));
        console.log('card 1: ', self.checkCards[0].css('background-image'), ' Card 2: ', self.checkCards[1].css('background-image'));
        if(self.checkCards[0].css('background-image') === self.checkCards[1].css('background-image')){
            console.log("IT WORKED! They match");
           self.checkCards[0].parent().css("pointer-events","none").removeClass("front").removeClass("leftCard").removeClass("rightCard").addClass("cardInactive");
           self.checkCards[1].parent().css("pointer-events","none").removeClass("front").removeClass("rightCard").removeClass("leftCard").addClass("cardInactive");
            this.correctMatch ++;
            console.log(this.correctMatch + " "+ "correct matches");
            $(".leftCard").removeClass("inactive");
            $(".rightCard").removeClass("inactive");
        } else {
            $(".leftCard").addClass("inactive");
            $(".rightCard").addClass("inactive");
            this.incorrectMatch ++;
            console.log(this.incorrectMatch + " "+ "incorrect matches");
            if(this.incorrectMatch % 2 === 0){
                console.log('LALALALALA');
            }
            setTimeout(self.cardDefault.bind(self),900);
        }
        self.checkCards = [];
    }
};
Game.prototype.addClickHandlers = function() {
    console.log('What is this: ', this);
    var self = this;
    $('.leftCard').on('click', function () {
        $(".leftCard").addClass("inactive");
        self.checkMatch(this, 'left', 'right');
    });
    $('.rightCard').on('click', function () {
        $(".rightCard").addClass("inactive");
        self.checkMatch(this, 'right', 'left');
    });
};
$(document).ready(function() {
    game = new Game();
    game.setUpGame();
});
