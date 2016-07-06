
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
  //   this.createCards(9);
    this.renderCards();
    this.randomizeCards(9);
};
// Game.prototype.createCards = function(cardCount) { //Review
//     for (i = 1; i <= cardCount; i++) {
//         // listId[i] = Math.floor(Math.random() * 9) + 1;
//         this.cards.push(
//             // new Card('Images/' + i + '.jpg',i)
//             new Card(i)
//         )
//     }
//     // for (var i = game.cards.length - 1; i > 0; i--) {
//     //     var j = Math.floor(Math.random() * (i + 1));
//     //     var temp = this.cards[i];
//     //     this.cards[i] = this.cards[j];
//     //     this.cards[j] = temp;
//     // }
// };
Game.prototype.randomizeCards = function(count){
    for (var i = count - 1; i > 0; i--){
        console.log("ID" + i);
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
        this.cards.push(
            // new Card('Images/' + i + '.jpg',i)
            new Card(i))
    }
};
//Defining a Method (renderCards) on the Game Class
Game.prototype.renderCards = function() {
    this.cards.forEach(function() {
        var CardHtmlString =  '<div class="card"><div class = "front card-' + + '"></div><div class' +
            ' =' + ' "back"></div></div>';
        // var cardHtmlString = "<img data-id='" + card.id + "' src='" + card.backImage + "' class='card card-" + card.id + "'>";
        var leftCardElement = $(CardHtmlString);
        var rightCardElement = $(CardHtmlString);
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
