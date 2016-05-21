
$(document).ready(function(){
    console.log('hi');
    $(".card").click(function(){
        $(this).toggleClass('flipcard');
        console.log('flip test complete2');
    })});

var first_card_clicked = null;
var second_card_clicked = null;
total_possible_matches = 2;
match_counter = 0;

$(document).ready(function(){
    $('#lurtz').click(function(){
        $(this).hide();
        console.log('Hide Success')
    })
});


//Class Card
var Card = function(frontImage) {
    this.frontImage = frontImage;
    this.backImage = 'Images/back.jpg';
};
//Class Game
var Game = function(){
    this.cards = [];
// This refers to an instance of Game Class

};
Game.prototype.setUpGame = function(){
    this.getCards(9);
    this.createCards();
};


Game.prototype.createCards = function() {
    this.cards.forEach(function(card,i) {
        var cardElement = $("<img src='" + card.backImage + "' class='card card-" + i + "'>");
        $(".left_side").append(cardElement);
                                                //Event Object gives information on the event
        cardElement.on('click', function(event){
            debugger;
        });
        $(".right_side").append(
          $("<img src='" + card.backImage + "' class='card card-" + i + "'>")
        );
    })
};

Game.prototype.bindClickEvents = function(){

};
//game1 = new Game();
//game1.fart = function() {console.log('fart')};
//game1.fart();
// will out put 'fart'
//game2 = new Game();
//game2.fart();
//will blow up because fart is defined on the instance of a game class


//Defining getCards methods on the game class every instance of Game will have this function
Game.prototype.getCards = function(cardCount) {
    for (i = 0; i <cardCount; i++){
        var imageFileName = i + 1;
        this.cards.push(new Card('Images/' + imageFileName + '.jpg'))
    }
};

$(document).ready(function() {
    game = new Game();
    game.setUpGame();
});

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
