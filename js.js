
//Class Game
var Game = function(){
    this.leftCards = [];
    this.rightCards = [];
    this.checkCards = [];
    this.accuracy = 0;
    this.amountClicked= 0;
    this.leftCard = false;
    this.rightCard = false;
    this.correctMatch = 0;
    this.incorrectMatch = 0;
    this.playerHp = 15;
    this.testIfMatch= true;
    this.enemiesInPlay = 0;
    this.enemyPhase = false;
    this.playerTurn = false;
    this.enemyTurn = false;
    this.goblinLeft = false;
    this.goblinRight = false;
    this.hillTrollLeft = false;
    this.hillTrollRight = false;
    this.urukHai = false;
    this.trollRight = false;

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
  this.addClickHandlers();
  this.cardDefault();
  this.updateStats();
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
                                                                                                //why Plus needed here
            var CardHtmlStringLeft = '<div class="leftCard"><div class = "front card-' + game.leftCards[i].id + '"></div><div' + ' class' +
                ' =' + ' "back"></div></div>';
            var CardHtmlStringRight = '<div class="rightCard"><div class = "front card-' + game.rightCards[i].id + '"></div><div' +
                ' class' + ' =' + ' "back"></div></div>';
            var leftCardElement = $(CardHtmlStringLeft);
            var rightCardElement = $(CardHtmlStringRight);
            $(".right_side").append(rightCardElement);
            $(".left_side").append(leftCardElement);
        }
};
Game.prototype.cardDefault = function(){
    console.log("Card default called, what is this: ", this);
    $(".leftCard").removeClass("flipcard inactive");
    $(".rightCard").removeClass("flipcard inactive");
    this.leftCard = false;
    this.rightCard = false;
    console.log('Kool with a k');
};
Game.prototype.checkMatch = function(card, side, opposite){
    var self = this;
    var $card = $(card);
    self.amountClicked++;
    $card.toggleClass('flipcard');
    $("." + side + "Card").addClass("inactive");
    console.log($(card).children(":first"));
    self.accuracy++;
    console.log(self.accuracy++ + 'is accuracy');
    self[side + 'Card'] = true;

    if(self[side + 'Card'] && !self[opposite + 'Card']){
        console.log(self.incorrectMatch +" "+" is incorrect Match Count");
        self.incorrectMatch += 2;
        self.checkCards.push($card.children(":first"));
    }
    else {
        self.checkCards.push($card.children(":first"));
        // console.log('check cards', self.checkCards[0].css('background-image'));
        // console.log('card 1: ', self.checkCards[0].css('background-image'), ' Card 2: ', self.checkCards[1].css('background-image'));
        if(self.checkCards[0].css('background-image') === self.checkCards[1].css('background-image') && self.checkCards[1].hasClass('card-1')){
            // console.log("Dwarven Healer Healed");
            self.testIfMatch = true;
            self.playerHp +=4;
            self.correctMatch +=1;
            console.log(self.playerHp);
            self.leftCard = false;
            self.rightCard = false;
            self.incorrectMatch -=2;
        }
        if(self.checkCards[0].css('background-image') === self.checkCards[1].css('background-image')){
            self.testIfMatch = true;
            // console.log("IT WORKED! They match");
            self.checkCards[0].parent().css("pointer-events","none").removeClass("front").removeClass("leftCard").removeClass("rightCard").addClass("cardInactive");
            self.checkCards[1].parent().css("pointer-events","none").removeClass("front").removeClass("rightCard").removeClass("leftCard").addClass("cardInactive");
            self.correctMatch +=1;
            self.leftCard = false;
            self.rightCard = false;
            self.incorrectMatch -=2;
            // console.log(this.correctMatch + " "+ "correct matches");
            $(".leftCard").removeClass("inactive");
            $(".rightCard").removeClass("inactive");

        } else {
            $(".leftCard").addClass("inactive");
            $(".rightCard").addClass("inactive");
            setTimeout(self.cardDefault.bind(self),900);
        }
        self.checkCards = [];
    }
    self.enemySpawn();
    self.enemyCombatPhase();
    self.updateStats();
};
Game.prototype.enemySpawn = function(){
    var self = this;
    console.log(self.incorrectMatch);
    if(self.leftCard == true && self.rightCard == true && self.testIfMatch == false && self.incorrectMatch === 2){
        $(".enemyFlightLeft").removeClass("enemyInvisible");
        self.enemiesInPlay +=1;
        self.goblinLeft = true;
        console.log(self.incorrectMatch + " " + "incorrect Match spawning enemy");
    }
    if(self.leftCard == true && self.rightCard == true && self.testIfMatch == false && self.incorrectMatch  === 4){
        $(".enemyFlightRight").removeClass("enemyInvisible");
        self.enemiesInPlay +=1;
        self.goblinRight = true;
        console.log(self.incorrectMatch + " " + "incorrect Match spawning enemy");
    }
    if(self.leftCard == true && self.rightCard == true && self.testIfMatch == false && self.incorrectMatch  === 8){
        $(".enemyStandingLeft").removeClass("enemyInvisible");
        self.hillTrollLeft = true;
        console.log(self.incorrectMatch + " " + "incorrect Match spawning enemy");
    }
    if(self.leftCard == true && self.rightCard == true && self.testIfMatch == false && self.incorrectMatch  === 12){
        $(".enemyStandingRight").removeClass("enemyInvisible");
        self.hillTrollRight = true;
        console.log(self.incorrectMatch + " " + "incorrect Match spawning enemy");
    }
    if(self.leftCard == true && self.rightCard == true && self.testIfMatch == false && self.incorrectMatch  === 16){
        $(".enemyStandingBotLeft").removeClass("enemyInvisible");
        self.urukHai = true;
        console.log(self.incorrectMatch + " " + "incorrect Match spawning enemy");
    }
    if(self.leftCard == true && self.rightCard == true && self.testIfMatch == false && self.incorrectMatch  === 20){
        $(".enemyStandingBotRight").removeClass("enemyInvisible");
        self.troll = true;
        console.log(self.incorrectMatch + " " + "incorrect Match spawning enemy");
    }
    if(self.leftCard == true && self.rightCard == true && self.testIfMatch == false && self.incorrectMatch  === 22){
        $(".enemyStandingMiddle").removeClass("enemyInvisible");
        console.log(self.incorrectMatch + " " + "incorrect Match spawning enemy");
    }
};
Game.prototype.enemyCombatPhase = function(){
       var self = this;
        if(this.leftCard == true && this.rightCard == true && this.testIfMatch == false){
           if(self.goblinLeft == true) {
               $(".enemyFlightLeft").removeClass("enemyFlightAttackFromLeft");
               setTimeout(function () {
                   self.goblinLeftA();
                   console.log("Goblin Top Left Summoned")
               }, 200);
           }
            if(self.goblinRight == true) {
                $(".enemyFlightRight").removeClass("enemyFlightAttackFromRight");
                setTimeout(function () {
                    self.goblinRightA();
                    console.log("Goblin Top Right Summoned")
                }, 500);
            }
            if(self.hillTrollLeft == true) {
                $(".enemyStandingLeft").removeClass("enemyMidLeftAttackAnimation");
                setTimeout(function () {
                    self.hillTrollLeftA();
                    console.log("Hill-Troll Left Summoned")
                }, 500);
            }
            if(self.hillTrollRight == true) {
                $(".enemyStandingRight").removeClass("enemyMidRightAttackAnimation");
                setTimeout(function () {
                    self.hillTrollRightA();
                    console.log("Hill-Troll Right Summoned")
                }, 500);
            }
            if(self.urukHai == true) {
                $(".enemyStandingBotLeft").removeClass("enemyBottomLeftAttackAnimation");
                setTimeout(function () {
                    self.urukHaiA();
                    console.log("Uruk-Hai Bottom Left Summoned")
                }, 500);
            }
            if(self.troll == true) {
                $(".enemyStandingBotRight").removeClass("enemyBottomRightAttackAnimation");
                setTimeout(function () {
                    self.trollA();
                    console.log("Troll Bottom Right Summoned")
                }, 500);
            }
           console.log(this.playerHp + " " + "is current HP");
       }
};
Game.prototype.updateStats = function(){
    $(".hitPoints").html(this.playerHp);
    this.testIfMatch = false;
};
Game.prototype.goblinLeftA = function(){
    var self = this;
    $(".enemyFlightLeft").addClass("enemyFlightAttackFromLeft");
    self.playerHp -= 1;
    self.updateStats();
    this.animateHP();
    self.testIfMatch = false;
    self.victoryDefeat();
};
Game.prototype.goblinRightA = function(){
    var self = this;
    $(".enemyFlightRight").addClass("enemyFlightAttackFromRight");
    console.log("gobby summoned");
    this.playerHp -= 1;
    self.updateStats();
    this.animateHP();
    this.testIfMatch = false;
    self.victoryDefeat();
};
Game.prototype.hillTrollLeftA = function(){
    var self = this;
    $(".enemyStandingLeft").addClass("enemyMidLeftAttackAnimation");
    this.playerHp -= 4;
    self.updateStats();
    this.animateHP();
    this.testIfMatch = false;
    self.victoryDefeat();
};
Game.prototype.hillTrollRightA = function(){
    var self = this;
    $(".enemyStandingRight").addClass("enemyMidRightAttackAnimation");
    this.playerHp -= 4;
    self.updateStats();
    this.animateHP();
    this.testIfMatch = false;
    self.victoryDefeat();
};
Game.prototype.urukHaiA = function(){
    var self = this;
    $(".enemyStandingBotLeft").addClass("enemyBottomLeftAttackAnimation");
    this.playerHp -= 3;
    self.updateStats();
    this.animateHP();
    this.testIfMatch = false;
    self.victoryDefeat();
};
Game.prototype.trollA = function(){
    var self = this;
    $(".enemyStandingBotRight").addClass("enemyBottomRightAttackAnimation");
    this.playerHp -= 3;
    self.updateStats();
    this.animateHP();
    this.testIfMatch = false;
    self.victoryDefeat();
};
Game.prototype.animateHP = function(){
    $(".hitPoints").addClass("animateHitPoints");
    setTimeout(function () {
        $(".hitPoints").removeClass("animateHitPoints");
    }, 1000);
};
Game.prototype.victoryDefeat = function(){
    if(this.playerHp <= 0){
        $(".defeat").addClass("animateDefeatVictory");
        console.log("you win or lose!")
    }
    if(this.correctMatch == 10){
            $(".victory").addClass("animateDefeatVictory");
            console.log("you win or lose!")
        }
    
};
Game.prototype.addClickHandlers = function() {
    console.log('What is this: ', this);
    var self = this;
    $('.leftCard').on('click', function () {
        $(".leftCard").addClass("inactive");
        self.enemyCombatPhase();
        self.checkMatch(this, 'left', 'right');
    });
    $('.rightCard').on('click', function () {
        $(".rightCard").addClass("inactive");
        self.checkMatch(this, 'right', 'left');
    });
};
$(document).ready(function() {
    game = new Game();
    game.setUpGame();
});
