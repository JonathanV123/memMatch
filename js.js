
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
//Defining a Method (setUpGame) on the Game Class
Game.prototype.setUpGame = function(){
  //This is an instance of game calling createCards and renderCards on THIS instance of Game
    this.createCardsAndRandomize(9);
    this.renderCards();
};
Game.prototype.createCardsAndRandomize = function(cardCount) { //Review with Chris or Dan!!!!!!!!
    var leftList = new Array(9);
    var rightList = new Array(9);
    for (i = 1; i <=cardCount; i++){
        leftList[i]= Math.floor(Math.random() * 9) + 1;
        rightList[i]= Math.floor(Math.random() * 9) + 1;
        this.cards.push(
            // new Card('Images/' + i + '.jpg',i)
            new Card(leftList[i],rightList[i])

        )
    }
};
//Defining a Method (renderCards) on the Game Class
Game.prototype.renderCards = function() {
    this.cards.forEach(function(cards) {
        var leftCardHtmlString =  '<div class="card"><div class = "front card-' + cards.id + '"></div><div class =' +
            ' "back"></div></div>';
        var rightCardHtmlString =  '<div class="card"><div class = "front card-' + cards.id + '"></div><div class =' +
            ' "back"></div></div>';
        // var cardHtmlString = "<img data-id='" + card.id + "' src='" + card.backImage + "' class='card card-" + card.id + "'>";
        var leftCardElement = $(leftCardHtmlString);
        var rightCardElement = $(rightCardHtmlString);
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

$(document).ready(function() {
    game = new Game();
    game.setUpGame();
});
