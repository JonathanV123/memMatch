
// $(document).ready(function(){
//     console.log('hi');
//     $(".card").click(function(){
//         $(this).toggleClass('flipcard');
//         console.log('flip test complete2');
//     })});
// var first_card_clicked = null;
// var second_card_clicked = null;
// total_possible_matches = 2;
// match_counter = 0;
//Class Game
var Game = function(){
    this.leftCards = [];
    this.rightCards = [];
    this.checkCards = 0;
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
  this.cardMatch();
  // this.updateGame();
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
    for (var i = 0; i < game.leftCards.length; i++) {
        var CardHtmlStringLeft = '<div class="card"> <div class = "front card-' + game.leftCards[i].id + '"></div><div' + ' class' +
            ' =' + ' "back"></div></div>';
        var CardHtmlStringRight = '<div class="card"> <div class = "front card-' + game.rightCards[i].id + '"></div><div' +
            ' class' + ' =' + ' "back"></div></div>';
        var leftCardElement = $(CardHtmlStringLeft);
        var rightCardElement = $(CardHtmlStringRight);
        $(".right_side").append(rightCardElement);
        $(".left_side").append(leftCardElement);
        if (game.checkCards < 2) {
            leftCardElement.on('click', function (event) {
                {
                    $(this).toggleClass('flipcard');
                    game.checkCards++;
                    console.log(game.checkCards);
                }
            })
        }
       else if (game.checkCards >= 2) {
            game.checkCards = 0;
            leftCardElement.on('click', function (event) {
                $(this).toggleClass('emptyClass');
            });
        }
    }
}
};
Game.prototype.cardMatch = function() {
    setTimeout(this.cardMatch.bind(this),1700);
    console.log('fart');
    // if (game.checkCards = 0 ){
    //    game.checkCards ++;
    //    console.log(game.checkCards)
    // }
    if (game.checkCards >= 2) {
        game.checkCards = 0;
        console.log('Check Complete');
        $('.card').removeClass('flipcard');
    }
};
$(document).ready(function() {
    game = new Game();
    game.setUpGame();
});
