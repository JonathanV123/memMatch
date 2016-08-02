
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
    this.card1 = null;
    this.card2 = null;
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
            var CardHtmlStringLeft = '<div class="leftCard"> <div class = "front card-' + game.leftCards[i].id + '"></div><div' + ' class' +
                ' =' + ' "back"></div></div>';
            var CardHtmlStringRight = '<div class="rightCard"> <div class = "front card-' + game.rightCards[i].id + '"></div><div' +
                ' class' + ' =' + ' "back"></div></div>';
            var leftCardElement = $(CardHtmlStringLeft);
            var rightCardElement = $(CardHtmlStringRight);
            $(".right_side").append(rightCardElement);
            $(".left_side").append(leftCardElement);
        }
           //WHY DO THE FUNCTIONS BELOW NEED TO BE WITHIN THE FOR Statement...! Ask ask ask
};
Game.prototype.cardMatch = function() {
    $('.leftCard').on('click', function () {
        game.amountClicked++;
        console.log(game.amountClicked + ': times clickeeeeed');
        if(game.amountClicked == 1 || 2) {
            $(this).toggleClass('flipcard');
            game.card1 = true;
            console.log('Game.Card1 is =  ' + game.card1);
            game.checkCards++;
            game.accuracy++;
            game.amountClicked++;
        }
        else
        if(game.amountClicked > 2) {
            $(this).toggleClass('block');
        }
    });
    $('.rightCard').on('click', function () {
        $(this).toggleClass('flipcard');
        game.card2 = true;
        console.log('Game.Card2 is =  ' +game.card2);
        game.checkCards++;
        game.accuracy++;
        game.amountClicked++;
    });
   // for(id in game.leftCards && game.rightCards ){
   //     console.log('Success');
   // }
};
Game.prototype.scan = function(){
    setTimeout(this.scan.bind(this),300);
    if(game.amountClicked == 1) {
        console.log('Game.card1 is: ' + game.card1);
        game.card1 = true;
        game.checkCards++;
        game.accuracy++;
        game.amountClicked++;
        $(".accValue").empty(game.accuracy);
        $(".accValue").append(game.accuracy + 1 / game.amountClicked);
        console.log(game.accuracy + 'is accuracy');
        console.log(game.amountClicked + ': times clicked');
        console.log(game.checkCards);
    }
    if(game.amountClicked == 2){
        if(game.amountClicked == 0) {
            console.log('Game.card1 is: ' + game.card2);
            game.card2 = true;
            game.checkCards++;
            game.accuracy++;
            game.amountClicked++;
            $(".accValue").empty(game.accuracy);
            $(".accValue").append(game.accuracy + 1 / game.amountClicked);
            console.log(game.accuracy + 'is accuracy');
            console.log(game.amountClicked + ': times clicked');
            console.log(game.checkCards);
        }
    }
    if(game.amountClicked > 2){
        console.log('WOOHOOO');
        game.card1 = null;
        game.card2 = null;
        game.amountClicked = 0;
        console.log('made the card1: ' +game.card1 + 'made the card2: ' + game.card2);
        console.log('Made the amountClicked to: ' + game.amountClicked);
        $('.leftCard' && '.rightCard').toggleClass('block');
    }

};
$(document).ready(function() {
    game = new Game();
    game.setUpGame();
});
