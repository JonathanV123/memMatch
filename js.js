
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
Game.prototype.renderCards = function(){
    for(var i = 0; i < game.leftCards.length; i++){
            var CardHtmlStringLeft =  '<div class="card"> <div class = "front card-' +  game.leftCards[i].id  + '"></div><div' + ' class' +
            ' =' + ' "back"></div></div>';
            var CardHtmlStringRight =  '<div class="card"> <div class = "front card-' + game.rightCards[i].id  + '"></div><div' +
            ' class' + ' =' + ' "back"></div></div>';
            var leftCardElement = $(CardHtmlStringLeft);
            var rightCardElement = $(CardHtmlStringRight);
            $(".right_side").append(rightCardElement);
            $(".left_side").append(leftCardElement);
            leftCardElement.on('click',function(event){{
                $(this).toggleClass('flipcard');
                console.log(this);
            }
            });
            rightCardElement.on('click',function(event){{
                $(this).toggleClass('flipcard');
            }
            });
        }
            }
};
// Game.prototype.updateGame = setTimeout(function(){
//     // console.log(this === window );
//     // console.log('di');
//     // if($('cards').hasClass('flipcard')){
//     //     $('CardHtmlStringRight').removeClass('flipcard')
//     // }
//     // if(this === window) {
//     //     console.log('itd isd')
//     // }
//     // },2000);
Game.prototype.cardMatch = function() {
    setTimeout(this.cardMatch.bind(this),2000);
        console.log(this === window);
        console.log('doopedr');
        if ($('card').hasClass('flipcard')) {
            console.log('fart');
            $('card').removeClass('flipcard')
        }
        if (this === window) {
            console.log('it isd')
        }
};
$(document).ready(function() {
    game = new Game();
    game.setUpGame();
});
