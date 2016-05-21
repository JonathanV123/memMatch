
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

/*var myCard = {
    card1: {card1Front: Images/1.jpg/ , card1Back:"Images/1b.jpg/"},
    card2: {card2Front: " " , card2Back:" "},
    card3: {card3Front: " " , card3Back:" "},
    card4: {card4Front: " " , card4Back:" "},
    card5: {card5Front: " " , card5Back:" "},
    card6: {card6Front: " " , card6Back:" "},
    card7: {card7Front: " " , card7Back:" "},
    card8: {card8Front: " " , card8Back:" "},
    card9: {card9Front: " " , card9Back:" "},
    card10: {card10Front: " " , card10Back:" "},
    card11: {card11Front: " " , card11Back:" "},
    card12: {card12Front: " " , card12Back:" "},
    card13: {card13Front: "2 " , card13Back:" 2"},
    card14: {card14Front: " " , card14Back:" "},
    card15: {card15Front: " " , card15Back:" "},
    card16: {card16Front: " " , card16Back:" "},
    card17: {card17Front: " " , card17Back:" "},
    card118: {card18Front: " " , card18Back:" "}
}*/
/*
function cardCreation(){
    var myCards = {};
    for(i = 0; i <= 18; i++) {
        myCards[i] = {front: null , back: null };
            for(j = 0; i <=18; j++){
            }
    }
console.log(myCards);
}
function addImage{
var images = [
    card1F = img ,id="youtubeimg" ,src="http://i1.ytimg.com/vi/VK4ah66jBvE/0.jpg"/
]
}
*/
function cardCreation() {
    $(function cardCreationLeft() {
        for (var x = 0; x < 9; x++) {
            $("<div>").addClass("card").appendTo(".game-area.left_side");
        }
    });
    $(function cardCreationRight() {
        for (var x = 0; x < 9; x++) {
            $("<div>").addClass("card").appendTo(".game-area.right_side");
        }
    });
}

cardCreation();


