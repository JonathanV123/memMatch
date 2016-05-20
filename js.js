
$(document).ready(function(){
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
    })});





