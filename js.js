
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
//Creating Card CLASS that takes 1 parameter
var Card = function(id) {
    //THIS refers to instance of Card Class
    this.id = id;
};
//Class Game
var Game = function(){
    this.cards = [];
// This refers to an instance of Game Class
};
// var Shuffle = function(array){
//     var currentIndex = array.length, temporaryValue, randomIndex;
//
//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
//
//         // Pick a remaining element...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//
//         // And swap it with the current element.
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }
//
//     return array;
// };
// Shuffle(game.cards);
//Defining a Method (setUpGame) on the Game Class
Game.prototype.setUpGame = function(){
  //This is an instance of game calling createCards and renderCards on THIS instance of Game
    this.createCards(9);
    this.renderCards();
};
//Defining a Method (renderCards) on the Game Class
Game.prototype.renderCards = function() {
    var game = this;
    this.cards.forEach(function(card) {
        var cardHtmlString =  '<div class="card"><div class = "front card-' + card.id + '"></div><div class = "back"></div></div>';
        // var cardHtmlString = "<img data-id='" + card.id + "' src='" + card.backImage + "' class='card card-" + card.id + "'>";
        var leftCardElement = $(cardHtmlString);
        var rightCardElement = $(cardHtmlString);
        $(".right_side").append(rightCardElement);
        $(".left_side").append(leftCardElement);
        leftCardElement.on('click', function(event){{
                $(this).toggleClass('flipcard');
            }
        });
        rightCardElement.on('click', function(event){{
                $(this).toggleClass('flipcard');
            }
        });
    })
};
Game.prototype.createCards = function(cardCount) {
    for (i = 1; i <=cardCount; i++){
        Math.floor(Math.random() * 5 );
        this.cards.push(
            // new Card('Images/' + i + '.jpg',i)
        new Card(i)
        )
    }
};
$(document).ready(function() {
    game = new Game();
    game.setUpGame();
});
//game1 = new Game();
//game1.fart = function() {console.log('fart')};
//game1.fart();
// will out put 'fart'
//game2 = new Game();
//game2.fart();
//will blow up because fart is defined on the instance of a game class
//Defining getCards methods on the game class every instance of Game will have this function

/*
cardCreation();
function addImages(){
    $(function cardImageLeft() {
        for (var x = 0; x < 2; x++) {
           console.log('firstloop');
            for (var j = 0; j < 1; j++) {
                $(".card.left").addClass("card1");
                console.log('secondloop');
            }
        }});
    $(function cardImageRight() {
        for (var x = 0; x < 9; x++) {
            $(".card.right").addClass("card2");
        }
    });
}
addImages();
*/
