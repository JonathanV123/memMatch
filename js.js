$(document).ready(function() {
    startGame();
});
function startGame (){
    game = new Game();
    game.setUpGame();
}
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
    this.incorrectMatchCount = 0;
    this.playerHp = 1;
    this.playerArmor = 0;
    this.testIfMatch= true;
    this.goblinLeft = false;
    this.goblinRight = false;
    this.hillTrollLeft = false;
    this.hillTrollRight = false;
    this.urukHai = false;
    this.trollRight = false;
    this.nazgul = false;
    this.hornActivated = false;
    this.enemies = {
        2: {
            className: '.enemy-1',
            name: 'goblinLeft'
        },
        4: {
            className: '.enemy-2',
            name: 'goblinRight'
        },
        8: {
            className: '.enemy-3',
            name: "hillTrollLeft"
        },
        12: {
            className: '.enemy-5',
            name: '"hillTrollRight"'
        },
        16: {
            className: '.enemy-6',
            name: 'urukHai'
        },
        20: {
            className: '.enemy-7',
            name: 'trollRight'
        }

    };
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
  this.addClickHandlersToInfoBar();
  this.cardDefault();
  this.updateStats();
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
            var CardHtmlStringLeft = '<div class="gameCard leftCard"><div class = "front card-' + game.leftCards[i].id + '"></div><div' + ' class' +
                ' =' + ' "back"></div></div>';
            var CardHtmlStringRight = '<div class="gameCard rightCard"><div class = "front card-' + game.rightCards[i].id + '"></div><div' +
                ' class' + ' =' + ' "back"></div></div>';
            var leftCardElement = $(CardHtmlStringLeft);
            var rightCardElement = $(CardHtmlStringRight);
            $(".rightSide").append(rightCardElement);
            $(".leftSide").append(leftCardElement);
        }
};
//Reverts card back to default state
Game.prototype.cardDefault = function(){
    console.log("Card default called, what is this: ", this);
    $(".leftCard").removeClass("flipCard inactive");
    $(".rightCard").removeClass("flipCard inactive");
    $(".horn").removeClass("inactive");
    this.leftCard = false;
    this.rightCard = false;
};
//Checks if card is a match. Also contains match conditions for special cards
Game.prototype.checkMatch = function(card, side, opposite){
    var self = this;
    var $card = $(card);
    self.victoryDefeat();
    self.amountClicked++;
    $card.toggleClass('flipCard');
    $("." + side + "Card").addClass("inactive");
    console.log($(card).children(":first"));
    self.accuracy++;
    console.log(self.accuracy++ + ' is accuracy');
    self[side + 'Card'] = true;
    if(self[side + 'Card'] && !self[opposite + 'Card']){
        console.log(self.incorrectMatchCount +" "+" is incorrect Match Count");
        self.incorrectMatchCount += 2;
        self.checkCards.push($card.children(":first"));
    }
    else {
        self.checkCards.push($card.children(":first"));
        if(self.checkCards[0].css('background-image') === self.checkCards[1].css('background-image') && self.checkCards[1].hasClass('card-1')){
            //Dwarven Healer Card
            $(".card-1").removeClass("activeSide");
            self.victoryDefeat();
            self.testIfMatch = true;
            self.playerHp +=8;
            self.correctMatch +=1;
            console.log(self.playerHp);
            self.leftCard = false;
            self.rightCard = false;
            self.incorrectMatchCount -=2;
            self.dwarfHealerCard = true;
        }
        //Nazgul Card
        if(self.checkCards[0].css('background-image') === self.checkCards[1].css('background-image') && self.checkCards[1].hasClass('card-3')){
            $(".card-3").removeClass("activeSide");
            self.victoryDefeat();
            self.testIfMatch = true;
            self.correctMatch +=1;
            console.log(self.playerHp);
            self.leftCard = false;
            self.rightCard = false;
            self.incorrectMatchCount -=2;
            $(".enemy-4").removeClass("enemyInvisible").addClass("midAttackAnimation");
            self.nazgul = true;
            self.nazgulCard = true;
        }
        //Summon Rohan Card
        if(self.checkCards[0].css('background-image') === self.checkCards[1].css('background-image') && self.checkCards[1].hasClass('card-2')){
            self.victoryDefeat();
            $(".card-2").removeClass("activeSide");
            self.testIfMatch = true;
            self.correctMatch +=1;
            console.log(self.playerHp);
            self.leftCard = false;
            self.rightCard = false;
            self.incorrectMatchCount -=2;
            $(".horn").addClass("hornPulseAnimation");
            self.hornActivated = true;
        }
        //Default card match
        if(self.checkCards[0].css('background-image') === self.checkCards[1].css('background-image')){
            self.victoryDefeat();
            self.testIfMatch = true;
            self.checkCards[0].parent().css("pointer-events","none").removeClass("front leftCard rightCard activeSide").addClass("cardInactive");
            self.checkCards[1].parent().css("pointer-events","none").removeClass("front rightCard leftCard activeSide").addClass("cardInactive");
            self.correctMatch +=1;
            self.leftCard = false;
            self.rightCard = false;
            self.incorrectMatchCount -=2;
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

Game.prototype.activateEnemy = function(incorrectMatchCount) {
    var enemy = this.enemies[incorrectMatchCount];
    if (enemy){
        $(enemy.className).removeClass("enemyInvisible fadeOut");
        this[enemy.name] = true;
    }
};
//Spawns enemies based on incorrect match count
Game.prototype.enemySpawn = function(){
    if (this.leftCard == true && this.rightCard == true && this.testIfMatch == false) {
        this.activateEnemy(this.incorrectMatchCount);
    }
};
//Enemy attack function that enables when an enemy boolean becomes true
Game.prototype.enemyCombatPhase = function(){
       var self = this;
        if(this.leftCard == true && this.rightCard == true && this.testIfMatch == false){
           if(self.goblinLeft == true) {
               $(".enemy-1").removeClass("enemyAttack");
               setTimeout(function () {
                   self.attackFunction(".enemy-1","enemyAttack",1);
                   console.log("Goblin Top Left Summoned")
               }, 500);
           }
            if(self.goblinRight == true) {
                $(".enemy-2").removeClass("enemyAttack");
                setTimeout(function () {
                    self.attackFunction(".enemy-2","enemyAttack",1);
                    console.log("Goblin Top Right Summoned")
                }, 500);
            }
            if(self.hillTrollLeft == true) {
                $(".enemy-3").removeClass("enemyAttack");
                setTimeout(function () {
                    self.attackFunction(".enemy-3","enemyAttack",2);
                    console.log("Hill-Troll Left Summoned")
                }, 500);
            }
            if(self.hillTrollRight == true) {
                $(".enemy-5").removeClass("enemyAttack");
                setTimeout(function () {
                    self.attackFunction(".enemy-5","enemyAttack",2);
                    console.log("Hill-Troll Right Summoned")
                }, 500);
            }
            if(self.urukHai == true) {
                $(".enemy-6").removeClass("enemyAttack");
                setTimeout(function () {
                    self.attackFunction(".enemy-6","enemyAttack",2);
                    console.log("Uruk-Hai Bottom Left Summoned")
                }, 500);
            }
            if(self.trollRight == true) {
                $(".enemy-7").removeClass("enemyAttack");
                setTimeout(function () {
                    self.attackFunction(".enemy-7","enemyAttack",2);
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
        $(".leftSide").addClass("inactive");
        $(".rightSide").addClass("inactive");
        $(".horn").addClass("inactive");
        console.log("you lose!");
        setTimeout(function () {
            $(".restartGame").removeClass("enemyInvisible");
            $(".playAgainButton").removeClass("enemyInvisible");
        }, 6000);
    }
    if (self.correctMatch == 12)
        {
            $(".victory").addClass("animateDefeatVictory");
            $(".leftSide").addClass("inactive");
            $(".rightSide").addClass("inactive");
            $(".horn").addClass("inactive");
            console.log("you win!");
            setTimeout(function () {
               $(".restartGame").removeClass("enemyInvisible");
               $(".playAgainButton").removeClass("enemyInvisible");
            }, 6000);
        }
};
Game.prototype.addClickHandlersToInfoBar = function(){
    var self = this;
    $('.soundButton').on('click',function(){
        $('.soundButton').toggleClass("unMute");
        var audio = document.getElementById('song');
        console.log("audio unmuted from soundButtonClass");
        if(audio.muted === true){
            audio.muted = false;
        }
        else{
            audio.muted = true;
        }
    });
    $('.soundButtonInGame').on('click', function(){
        $('.soundButtonInGame').toggleClass("unMuteInGame");
        var audio = document.getElementById('song');
        console.log("audio unmuted from soundButtonInGame Class");
        if(audio.muted === true){
            audio.muted = false;
        }
        else{
            audio.muted = true;
        }
    });
    $('.exitIntroScreen').on('click',function(){
        $('.container').css("visibility",'visible');
        $('.introScreen').css("display",'none');
    });
    $('.horn').on('click', function () {
        if(self.hornActivated == true){
            $(".rohan").addClass("chargeForward");
            $(".horn").removeClass("hornPulseAnimation");
            if(self.hornActived = true ){
                // this.activatedEnmies.each()delete activated enemy and add fadeout class
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
    $(".about").on('click',function(){
        console.log("About Opened");
        $(".aboutPage").removeClass("enemyInvisible");
    });$(".tutorial").on('click',function(){
        console.log("How to play opened");
        $(".howToPlay").removeClass("enemyInvisible");
    });

    $(".exitAbout").on('click',function(){
        $(".aboutPage").addClass("enemyInvisible");
        $(".howToPlay").addClass("enemyInvisible");
    })
};
//Add click handlers to cards
Game.prototype.addClickHandlers = function() {
    console.log('What is this: ', this);
    var self = this;
    $('.leftCard').on('click', function () {
        $(".leftCard").addClass("inactive").removeClass("activeSide");
        $(".rightCard").addClass("activeSide");
        self.enemyCombatPhase();
        self.checkMatch(this, 'left', 'right');
    });
    $('.rightCard').on('click', function () {
        $(".rightCard").addClass("inactive").removeClass("activeSide");
        $(".leftCard").addClass("activeSide");
        self.enemyCombatPhase();
        self.checkMatch(this, 'right', 'left');
    });
    //Restart the game
    $(".playAgainButton").on('click',function(){
        console.log("play again button clicked");
        $('.leftSide').html('');
        $('.rightSide').html('');
        $(".leftSide").removeClass("inactive");
        $(".rightSide").removeClass("inactive");
        $(".victory").removeClass("animateDefeatVictory");
        $(".defeat").removeClass("animateDefeatVictory");
        $('.enemy').addClass('enemyInvisible');
        $(".restartGame").addClass("enemyInvisible");
        $(".playAgainButton").addClass("enemyInvisible");
        $(".rohan").removeClass("charghornPulseAnimationeForward");
        $(".horn").removeClass("hornPulseAnimation");
        for(i = 1; i < 8; i++){
            $(".enemy-" + i).removeClass("fadeOut");
        }
        $("body").find("*").off();
        game = new Game();
        game.setUpGame();
    });
};
