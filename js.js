$(document).ready(function() {
    function startNewGame(){
       game = new Game();
       game.setUpGame();
    }
    startNewGame();
});
//Class Game. Contains all gameplay elements
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
    this.goblinLeft = false;
    this.goblinRight = false;
    this.hillTrollLeft = false;
    this.hillTrollRight = false;
    this.urukHai = false;
    this.trollRight = false;
    this.nazgul = false;
    this.hornActivated = false;
};
//Creating Card Class
var Card = function(id) {
    //THIS refers to instance of Card Class
    this.id = id;
};
//Defining a Method SetUpGame that sets the game up...
Game.prototype.setUpGame = function(){
    //This is an instance of game calling createCards and renderCards on THIS instance of Game
  this.createCards(9);
  this.shuffleCards(this.leftCards);
  this.shuffleCards(this.rightCards);
  this.renderCards();
  this.addClickHandlers();
  this.cardDefault();
  this.updateStats();
  this.aboutPage();
};
//Creates a certain amount of cards based on cardCount parameter
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
//Shuffle the so they are randomized on game board
Game.prototype.shuffleCards = function(cards){
    //Shuffle Cards
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
};
//Render the cards by looping through and dynamically creating the HTML element then appending
Game.prototype.renderCards = function() {
        // clearTimeout(this);
        console.log('game cards rendered');
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
//Reverts card back to default state
Game.prototype.cardDefault = function(){
    console.log("Card default called, what is this: ", this);
    $(".leftCard").removeClass("flipcard inactive");
    $(".rightCard").removeClass("flipcard inactive");
    this.leftCard = false;
    this.rightCard = false;
    console.log('Kool with a k');
};
//Checks if card is a match. Also contains match conditions for special cards
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
            //Dwarven Healer Card
            self.testIfMatch = true;
            self.playerHp +=8;
            self.correctMatch +=1;
            console.log(self.playerHp);
            self.leftCard = false;
            self.rightCard = false;
            self.incorrectMatch -=2;
            self.dwarfHealerCard = true;
        }
        //Nazgul Card
        if(self.checkCards[0].css('background-image') === self.checkCards[1].css('background-image') && self.checkCards[1].hasClass('card-3')){
            self.testIfMatch = true;
            self.correctMatch +=1;
            console.log(self.playerHp);
            self.leftCard = false;
            self.rightCard = false;
            self.incorrectMatch -=2;
            $(".enemy-4").removeClass("enemyInvisible").addClass("midAttackAnimation");
            self.nazgul = true;
            self.nazgulCard = true;
        }
        //Summon Rohan Card
        if(self.checkCards[0].css('background-image') === self.checkCards[1].css('background-image') && self.checkCards[1].hasClass('card-2')){
            self.testIfMatch = true;
            self.correctMatch +=1;
            console.log(self.playerHp);
            self.leftCard = false;
            self.rightCard = false;
            self.incorrectMatch -=2;
            $(".horn").addClass("hornPulseAnimation");
            self.hornActivated = true;
            self.rohanCard = true;
        }
        //Default card match
        if(self.checkCards[0].css('background-image') === self.checkCards[1].css('background-image')){
            self.testIfMatch = true;
            self.checkCards[0].parent().css("pointer-events","none").removeClass("front").removeClass("leftCard").removeClass("rightCard").addClass("cardInactive");
            self.checkCards[1].parent().css("pointer-events","none").removeClass("front").removeClass("rightCard").removeClass("leftCard").addClass("cardInactive");
            self.correctMatch +=1;
            self.leftCard = false;
            self.rightCard = false;
            self.incorrectMatch -=2;
            $(".leftCard").removeClass("inactive");
            $(".rightCard").removeClass("inactive");
        } else {
            //If no match set cards back to default after .9 seconds
            $(".leftCard").addClass("inactive");
            $(".rightCard").addClass("inactive");
            setTimeout(self.cardDefault.bind(self),900);
        }
        //Clear checkCards
        self.checkCards = [];
    }
    self.enemySpawn();
    self.enemyCombatPhase();
    self.updateStats();
    self.victoryDefeat();
};
//Spawns enemies based on incorrect match count
Game.prototype.enemySpawn = function(){
    var self = this;
    console.log(self.incorrectMatch);
    if(self.leftCard == true && self.rightCard == true && self.testIfMatch == false && self.incorrectMatch === 2){
        $(".enemy-1").removeClass("enemyInvisible fadeOut");
        self.goblinLeft = true;
        console.log(self.incorrectMatch + " " + "incorrect Match spawning enemy");
    }
    if(self.leftCard == true && self.rightCard == true && self.testIfMatch == false && self.incorrectMatch  === 4){
        $(".enemy-2").removeClass("enemyInvisible fadeOut");
        self.goblinRight = true;
        console.log(self.incorrectMatch + " " + "incorrect Match spawning enemy");
    }
    if(self.leftCard == true && self.rightCard == true && self.testIfMatch == false && self.incorrectMatch  === 8){
        $(".enemy-3").removeClass("enemyInvisible fadeOut");
        self.hillTrollLeft = true;
        console.log(self.incorrectMatch + " " + "incorrect Match spawning enemy");
    }
    if(self.leftCard == true && self.rightCard == true && self.testIfMatch == false && self.incorrectMatch  === 12){
        $(".enemy-5").removeClass("enemyInvisible fadeOut");
        self.hillTrollRight = true;
        console.log(self.incorrectMatch + " " + "incorrect Match spawning enemy");
    }
    if(self.leftCard == true && self.rightCard == true && self.testIfMatch == false && self.incorrectMatch  === 16){
        $(".enemy-6").removeClass("enemyInvisible fadeOut");
        self.urukHai = true;
        console.log(self.incorrectMatch + " " + "incorrect Match spawning enemy");
    }
    if(self.leftCard == true && self.rightCard == true && self.testIfMatch == false && self.incorrectMatch  === 20){
        $(".enemy-7").removeClass("enemyInvisible fadeOut");
        self.troll = true;
        console.log(self.incorrectMatch + " " + "incorrect Match spawning enemy");
    }
};
//Enemy attack function that enables when an enemy boolean becomes true
Game.prototype.enemyCombatPhase = function(){
       var self = this;
        if(this.leftCard == true && this.rightCard == true && this.testIfMatch == false){
           if(self.goblinLeft == true) {
               $(".enemy-1").removeClass("enemyFlightAttackFromLeft");
               setTimeout(function () {
                   self.attackFunction(".enemy-1","enemyFlightAttackFromLeft",1);
                   console.log("Goblin Top Left Summoned")
               }, 500);
           }
            if(self.goblinRight == true) {
                $(".enemy-2").removeClass("enemyFlightAttackFromRight");
                setTimeout(function () {
                    self.attackFunction(".enemy-2","enemyFlightAttackFromRight",1);
                    console.log("Goblin Top Right Summoned")
                }, 500);
            }
            if(self.hillTrollLeft == true) {
                $(".enemy-3").removeClass("enemyMidLeftAttackAnimation");
                setTimeout(function () {
                    self.attackFunction(".enemy-3","enemyMidLeftAttackAnimation",2);
                    console.log("Hill-Troll Left Summoned")
                }, 500);
            }
            if(self.hillTrollRight == true) {
                $(".enemy-5").removeClass("enemyMidRightAttackAnimation");
                setTimeout(function () {
                    self.attackFunction(".enemy-5","enemyMidRightAttackAnimation",2);
                    console.log("Hill-Troll Right Summoned")
                }, 500);
            }
            if(self.urukHai == true) {
                $(".enemy-6").removeClass("enemyBottomLeftAttackAnimation");
                setTimeout(function () {
                    self.attackFunction(".enemy-6","enemyBottomLeftAttackAnimation",2);
                    console.log("Uruk-Hai Bottom Left Summoned")
                }, 500);
            }
            if(self.troll == true) {
                $(".enemy-7").removeClass("enemyBottomRightAttackAnimation");
                setTimeout(function () {
                    self.attackFunction(".enemy-7","enemyBottomRightAttackAnimation",2);
                    console.log("Troll Bottom Right Summoned")
                }, 500);
            }
            if(self.nazgul == true) {
                $(".enemy-4").removeClass("enemyStandingMiddleAttackAnimation");
                setTimeout(function () {
                    self.attackFunction(".enemy-4","enemyStandingMiddleAttackAnimation",4);
                    console.log("Nazgul Middle Summoned")
                }, 500);
            }
           console.log(this.playerHp + " " + "is current HP");
       }
};
//Update game stats. Hit points and Armor
Game.prototype.updateStats = function(){
    $(".hitPoints").html(this.playerHp);
    $(".armor").html(this.playerArmor);
    this.testIfMatch = false;
};
//Attack function that deals damage
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
//Animate armor and hip points when attacked
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
//Win and Lose conditions
Game.prototype.victoryDefeat = function(){
    var self = this;
    if(self.playerHp <= 0){
        $(".defeat").addClass("animateDefeatVictory");
        console.log("you win or lose!");
        setTimeout(function () {
            $(".restartGame").removeClass("enemyInvisible");
            $(".playAgainButton").removeClass("enemyInvisible");
        }, 6000);
    }
    if (self.correctMatch == 12)
        {
            $(".victory").addClass("animateDefeatVictory");
            console.log("you win or lose!");
            setTimeout(function () {
               $(".restartGame").removeClass("enemyInvisible");
               $(".playAgainButton").removeClass("enemyInvisible");
            }, 6000);
        }
};
//About section and tutorial
Game.prototype.aboutPage = function(){
    $(".about").on('click',function(){
        $(".aboutPage").removeClass("enemyInvisible");
    });$(".tutorial").on('click',function(){
        $(".howToPlay").removeClass("enemyInvisible");
    });

    $(".exitAbout").on('click',function(){
        $(".aboutPage").addClass("enemyInvisible");
        $(".howToPlay").addClass("enemyInvisible");

    })
};
//Add click handlers 
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
                    $(".enemy-1").addClass("fadeOut");
                }
                if(self.goblinRight == true){
                    self.goblinRight = false;
                    $(".enemy-2").addClass("fadeOut");
                }
                if(self.hillTrollLeft == true){
                    self.hillTrollLeft = false;
                    $(".enemy-3").addClass("fadeOut");
                }
                if(self.hillTrollRight == true){
                    self.hillTrollRight = false;
                    $(".enemy-5").addClass("fadeOut");
                }
                if(self.urukHai == true){
                    self.urukHai = false;
                    $(".enemy-6").addClass("fadeOut");
                }
                if(self.trollRight == true){
                    self.trollRight = false;
                    $(".enemy-7").addClass("fadeOut");
                }
                if(self.nazgul == true){
                    self.nazgul = false;
                    $(".enemy-4").addClass("fadeOut");
                }
            }
        }
    });
    //Restart the game
    $(".playAgainButton").on('click',function(){
        console.log("button clicked");
        game  = {};
        $('.left_side').html('');
        $('.right_side').html('');
        game = new Game();
        game.setUpGame();
        $(".victory").removeClass("animateDefeatVictory");
        $(".defeat").removeClass("animateDefeatVictory");
        $('.enemy').addClass('enemyInvisible');
        $(".restartGame").addClass("enemyInvisible");
        $(".playAgainButton").addClass("enemyInvisible");
        $(".rohan").removeClass("chargeForward");
        $(".enemy-1").removeClass("fadeOut");
        $(".enemy-2").removeClass("fadeOut");
        $(".enemy-3").removeClass("fadeOut");
        $(".enemy-5").removeClass("fadeOut");
        $(".enemy-6").removeClass("fadeOut");
        $(".enemy-7").removeClass("fadeOut");
        $(".enemy-4").removeClass("fadeOut");
    });
};
