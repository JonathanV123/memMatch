
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
    this.playerHp = 20;
    this.playerArmor = 10;
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
    this.nazgul = false;
    this.hornActivated = false;

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
            self.playerHp +=8;
            self.correctMatch +=1;
            console.log(self.playerHp);
            self.leftCard = false;
            self.rightCard = false;
            self.incorrectMatch -=2;
        }
        if(self.checkCards[0].css('background-image') === self.checkCards[1].css('background-image') && self.checkCards[1].hasClass('card-3')){
            self.testIfMatch = true;
            self.correctMatch +=1;
            console.log(self.playerHp);
            self.leftCard = false;
            self.rightCard = false;
            self.incorrectMatch -=2;
            $(".enemyStandingMiddle").removeClass("enemyInvisible").addClass("midAttackAnimation");
            self.nazgul = true;
        }
        if(self.checkCards[0].css('background-image') === self.checkCards[1].css('background-image') && self.checkCards[1].hasClass('card-2')){
            self.testIfMatch = true;
            self.correctMatch +=1;
            console.log(self.playerHp);
            self.leftCard = false;
            self.rightCard = false;
            self.incorrectMatch -=2;
            $(".horn").addClass("hornPulseAnimation");
            self.hornActivated = true;
        }
        if(self.checkCards[0].css('background-image') === self.checkCards[1].css('background-image')){
            self.testIfMatch = true;
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
};
Game.prototype.enemyCombatPhase = function(){
       var self = this;
        if(this.leftCard == true && this.rightCard == true && this.testIfMatch == false){
           if(self.goblinLeft == true) {
               $(".enemyFlightLeft").removeClass("enemyFlightAttackFromLeft");
               setTimeout(function () {
                   self.attackFunction(".enemyFlightLeft","enemyFlightAttackFromLeft",1);
                   console.log("Goblin Top Left Summoned")
               }, 500);
           }
            if(self.goblinRight == true) {
                $(".enemyFlightRight").removeClass("enemyFlightAttackFromRight");
                setTimeout(function () {
                    self.attackFunction(".enemyFlightRight","enemyFlightAttackFromRight",1);
                    console.log("Goblin Top Right Summoned")
                }, 500);
            }
            if(self.hillTrollLeft == true) {
                $(".enemyStandingLeft").removeClass("enemyMidLeftAttackAnimation");
                setTimeout(function () {
                    self.attackFunction(".enemyStandingLeft","enemyMidLeftAttackAnimation",2);
                    console.log("Hill-Troll Left Summoned")
                }, 500);
            }
            if(self.hillTrollRight == true) {
                $(".enemyStandingRight").removeClass("enemyMidRightAttackAnimation");
                setTimeout(function () {
                    self.attackFunction(".enemyStandingRight","enemyMidRightAttackAnimation",2);
                    console.log("Hill-Troll Right Summoned")
                }, 500);
            }
            if(self.urukHai == true) {
                $(".enemyStandingBotLeft").removeClass("enemyBottomLeftAttackAnimation");
                setTimeout(function () {
                    self.attackFunction(".enemyStandingBotLeft","enemyBottomLeftAttackAnimation",2);
                    console.log("Uruk-Hai Bottom Left Summoned")
                }, 500);
            }
            if(self.troll == true) {
                $(".enemyStandingBotRight").removeClass("enemyBottomRightAttackAnimation");
                setTimeout(function () {
                    self.attackFunction(".enemyStandingBotRight","enemyBottomRightAttackAnimation",2);
                    console.log("Troll Bottom Right Summoned")
                }, 500);
            }
            if(self.nazgul == true) {
                $(".enemyStandingMiddle").removeClass("enemyStandingMiddleAttackAnimation");
                setTimeout(function () {
                    self.attackFunction(".enemyStandingMiddle","enemyStandingMiddleAttackAnimation",4);
                    console.log("Nazgul Middle Summoned")
                }, 500);
            }
           console.log(this.playerHp + " " + "is current HP");
       }
};
Game.prototype.updateStats = function(){
    $(".hitPoints").html(this.playerHp);
    $(".armor").html(this.playerArmor);
    this.testIfMatch = false;
};
Game.prototype.attackFunction = function(target, classToAdd, damage){
    var self = this;
    $(target).addClass(classToAdd);
    if(self.playerArmor > 0){
        self.playerArmor -= damage;
    }
    else{
        self.playerHp -= damage;
    }
    self.updateStats();
    self.animateHpAndArmor();
    self.testIfMatch = false;
    self.victoryDefeat();
};
Game.prototype.animateHpAndArmor = function(){
    if (this.playerArmor > 0){
        $(".armor").addClass("animateHitPoints");
        setTimeout(function () {
            $(".armor").removeClass("animateHitPoints");
        }, 1000);
    }
    else{
        $(".hitPoints").addClass("animateHitPoints");
        setTimeout(function () {
            $(".hitPoints").removeClass("animateHitPoints");
        }, 1000);
    }
};

Game.prototype.victoryDefeat = function(){
    var self = this;
    if(self.playerHp <= 0){
        $(".defeat").addClass("animateDefeatVictory");
        console.log("you win or lose!");
        setTimeout(function () {

        }, 5000);
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

    $('.horn').on('click', function () {
        if(self.hornActivated == true){
            $(".rohan").addClass("chargeForward");
            $(".horn").removeClass("hornPulseAnimation");
            if(self.hornActived = true){
                if(self.goblinLeft == true){
                    self.goblinLeft = false;
                    $(".enemyFlightLeft").addClass("fadeOut");
                }
                if(self.goblinRight == true){
                    self.goblinRight = false;
                    $(".enemyFlightRight").addClass("fadeOut");
                }
                if(self.hillTrollLeft == true){
                    self.hillTrollLeft = false;
                    $(".enemyStandingLeft").addClass("fadeOut");
                }
                if(self.hillTrollRight == true){
                    self.hillTrollRight = false;
                    $(".enemyStandingRight").addClass("fadeOut");
                }
                if(self.urukHai == true){
                    self.urukHai = false;
                    $(".enemyStandingBotLeft").addClass("fadeOut");
                }
                if(self.trollRight == true){
                    self.trollRight = false;
                    $(".enemyStandingBotRight").addClass("fadeOut");
                }
                if(self.nazgul == true){
                    self.nazgul = false;
                    $(".enemyStandingMiddle").addClass("fadeOut");
                }
            }
        }
    });
};
$(document).ready(function() {
        game = new Game();
        game.setUpGame();
});
