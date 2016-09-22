
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
    this.accuracy = 0;
    this.amountClicked= 0;
    this.card1 = false;
    this.card2 = false;
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
  this.cardDefault();
  this.scan();

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
            var CardHtmlStringLeft = '<div class="leftCard"> <div class = "front left card-' + game.leftCards[i].id + '"></div><div' + ' class' +
                ' =' + ' "back"></div></div>';
            var CardHtmlStringRight = '<div class="rightCard"> <div class = "front right card-' + game.rightCards[i].id + '"></div><div' +
                ' class' + ' =' + ' "back"></div></div>';
            var leftCardElement = $(CardHtmlStringLeft);
            var rightCardElement = $(CardHtmlStringRight);
            $(".right_side").append(rightCardElement);
            $(".left_side").append(leftCardElement);
        }
};
Game.prototype.cardDefault = function(){
    $(".leftCard").removeClass("flipcard inactive");
    $(".rightCard").removeClass("flipcard inactive");
    game.card1 = false;
    game.card2 = false;
    console.log('Kool with a k');
};
Game.prototype.cardMatch = function() {
    $('.leftCard').on('click', function () {
            console.log(this);

            game.amountClicked++;
            $(this).toggleClass('flipcard');
            $(".leftCard").addClass("inactive");
            game.accuracy++;
            if(game.card1 == false){
                game.card1 = true;
                for (i=0; i<= game.leftCards.length; i++){
                    if($(this).hasClass("card-"[i])){
                        console.log('COOOL');
                    }
                }
            }
           else if(game.card1 = true){
                game.card2 = true;
                setTimeout(Game.prototype.cardDefault,1300);
                for (i=0; i<= game.rightCards.length; i++){
                    $(this).hasClass("card-"[i]);
                    console.log('COOOL');

                }
            }
        console.log('Game.Card1 is =  ' + game.card1);
    });
    $('.rightCard').on('click', function () {
        $(this).toggleClass('flipcard');
        $(".rightCard").addClass("inactive");
        if(game.card1 == false){
            game.card1 = true;
        }
        else if(game.card1 = true){
            game.card2 = true;
            setTimeout(Game.prototype.cardDefault,1300);
            for (i=0; i<= game.rightCards.length; i++){
                $(this).hasClass("card-"[i]);
                console.log('COOOL');

            }
        }
        console.log('Game.Card2 is =  ' + game.card2);
        game.accuracy++;

    });
};
Game.prototype.scan = function(){
    // setTimeout(this.scan.bind(this),300);
    // if(game.card1 && game.card1 == true) {
    //  setTimeout(Game.prototype.cardDefault,1000);
    //     console.log('Card 1 and Card 2 are true')
    // }
};
$(document).ready(function() {
    game = new Game();
    game.setUpGame();
});
