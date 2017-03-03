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
    this.amountClicked= 0;
    this.leftCard = false;
    this.rightCard = false;
    this.correctMatch = 0;
    this.incorrectMatchCount = 0;
    this.playerHp = 100;
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
    this.healerActivated = false;
    this.attackClass = "enemyAttack";
    this.enemies = {
        2: {
            className: '.enemy-1',
            name: 'goblinLeft',
            attackStrength: 11,
            inPlay: false
        },
        4: {
            className: '.enemy-2',
            name: 'goblinRight',
            attackStrength: 1,
            inPlay: false
        },
        8: {
            className: '.enemy-3',
            name: "hillTrollLeft",
            attackStrength: 2,
            inPlay: false
        },
        12: {
            className: '.enemy-5',
            name: "hillTrollRight",
            attackStrength: 2,
            inPlay: false
        },
        16: {
            className: '.enemy-6',
            name: 'urukHai',
            attackStrength: 2,
            inPlay: false
        },
        20: {
            className: '.enemy-7',
            name: 'trollRight',
            attackStrength: 2,
            inPlay: false
        },
        nazgulEnemy:{
            className: '.enemy-4',
            name: 'nazgul',
            attackStrength: 4,
            inPlay: false
        },
    };
    this.specialCards = {
            dwarfCard:{
                activateAblity:'healerActivated'

            },
            hornCard:{
                activateAblity:'hornActivated'

            },
            nazgulCard:{
                activateAblity:'nazgul',
            },

    };
        this.normalCards = {
            boromir:{
                className:'card-4',
            },
            eomer:{
                className:'card-5',
            },
            frodo:{
                className:'card-6',
            },
            gandalf:{
                className:'card-7',
            },
            sarumon:{
                className:'card-8',
            },
            treeBeard:{
                className:'card-9',
            },

        }
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
  this.addDataToHtml();
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

Game.prototype.renderCard = function(card, boardSide) {
    var cardHtml = '<div class="gameCard ' + boardSide + 'Card"><div class = "front card-' + card.id + '"></div><div' + ' class' +
        ' =' + ' "back"></div></div>';
    var cardElement = $(cardHtml);
    $("." + boardSide + "Side").append(cardElement);
    card.domElement = cardElement;
};
Game.prototype.addDataToHtml = function(){
    $(".card-1").attr("data-specialCard","dwarfCard");
    $(".card-2").attr("data-specialCard","hornCard");
    $(".card-3").attr("data-specialCard","nazgulCard");
    $(".card-4").attr("data-specialCard","4");
    $(".card-5").attr("data-specialCard","5");
    $(".card-6").attr("data-specialCard","6");
    $(".card-7").attr("data-specialCard","7");
    $(".card-8").attr("data-specialCard","8");
    $(".card-9").attr("data-specialCard","9");

};
//Render the cards by looping through and dynamically creating the HTML element then appending
Game.prototype.renderCards = function() {
    var game = this;
        // clearTimeout(this);
    console.log('game cards rendered');
    // this can be cleaned up with bind
    this.leftCards.forEach(function(card) {
       game.renderCard(card, 'left')
    });
    this.rightCards.forEach(function(card) {
        game.renderCard(card, 'right')
    });
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

Game.prototype.handleCardMatch = function() {
    this.leftCard = false;
    this.rightCard = false;
    this.testIfMatch = true;
    this.correctMatch +=1;

};
Game.prototype.specialCardActivation = function(cardName){
    var activateSpecialCard = this.specialCards[cardName];
    if(activateSpecialCard){
        this[activateSpecialCard.activateAblity] = true;
    }
};
Game.prototype.isMatch = function(side, opposite) {
    console.log(this[side + 'Card'] && this[opposite + 'Card']);
    return this[side + 'Card'] && !this[opposite + 'Card'];
};
//Checks if card is a match. Also contains match conditions for special cards
Game.prototype.checkMatch = function(card, side, opposite){
    var self = this;
    var $card = $(card);
    self.amountClicked++;
    $card.toggleClass('flipCard');
    $("." + side + "Card").addClass("inactive");
    console.log($(card).children(":first"));
    self[side + 'Card'] = true;
    if(self.isMatch(side, opposite)){
        console.log(self.incorrectMatchCount +" "+" is incorrect Match Count");
        self.checkCards.push($card.children(":first"));
    }
    else {
        self.checkCards.push($card.children(":first"));
        if(self.checkCards[0][0].dataset.specialcard === self.checkCards[1][0].dataset.specialcard){
            self.specialCardActivation(self.checkCards[0][0].dataset.specialcard);
            if(self.healerActivated === true){
                self.playerHp +=8;
                $(".card-1").removeClass("activeSide");
            }
            if(self.hornActivated === true){
                $(".card-2").removeClass("activeSide");
                $(".horn").addClass("hornPulseAnimation");
            }
            if(self.nazgul === true){
                $(".card-3").removeClass("activeSide");
                $(".enemy-4").removeClass("enemyInvisible").addClass("midAttackAnimation");
                self.enemies.nazgulEnemy.inPlay = true;
            }
            self.checkCards[0].parent().css("pointer-events","none").removeClass("front leftCard rightCard activeSide").addClass("cardInactive");
            self.checkCards[1].parent().css("pointer-events","none").removeClass("front rightCard leftCard activeSide").addClass("cardInactive");
            self.handleCardMatch();
            $(".leftCard").removeClass("inactive");
            $(".rightCard").removeClass("inactive");
        } else {
            //If no match set cards back to default after .9 seconds
            $(".leftCard").addClass("inactive");
            $(".rightCard").addClass("inactive");
            self.enemyCombatPhase();
            self.incorrectMatchCount += 2;
            setTimeout(self.cardDefault.bind(self),900);
        }
        //Clear checkCards
        self.checkCards = [];
    }
    self.enemySpawn();
    self.updateStats();
    self.victoryDefeat();
};

Game.prototype.activateEnemy = function(incorrectMatchCount) {
    var self = this;
    var enemy = this.enemies[incorrectMatchCount];
    if (enemy){
        $(enemy.className).removeClass("enemyInvisible fadeOut");
        this[enemy.name] = true;
        this.enemies[incorrectMatchCount].inPlay = true;
    }
};
//Spawns enemies based on incorrect match count
Game.prototype.enemySpawn = function(){
    if (this.leftCard == true && this.rightCard == true && this.testIfMatch == false) {
        this.activateEnemy(this.incorrectMatchCount);
    }
};
//Enemy attack function that enables when an enemy boolean becomes true
Game.prototype.enemyCombatPhase = function() {
    var self = this;
    for(var key in this.enemies){
        var currentEnemy = this.enemies[key];
        if(currentEnemy.inPlay === true){
            $(currentEnemy.className).removeClass("enemyAttack");
            console.log("okkkdkdkdakdkdkakdd");
                     self.attack(currentEnemy.className,currentEnemy.attackStrength);
        }
    }
};
//Update game stats. Hit points and Armor
Game.prototype.updateStats = function(){
    $(".hitPoints").html(this.playerHp);
    $(".armor").html(this.playerArmor);
    this.testIfMatch = false;
};
//Attack function that deals damage
Game.prototype.attack = function(enemyCardClass, damage){
    var self = this;
    setTimeout(function () {
        $(enemyCardClass).addClass(self.attackClass);
        console.log("attacking for " + damage);
        if(self.playerArmor > 0){
            self.playerArmor -= damage;
        }
        if(self.playerArmor < 0){
            self.playerHp = self.playerArmor += self.playerHp;
            self.playerArmor =  0;
        }
        else{
            self.playerHp -= damage;
        }
        self.updateStats();
        self.animateHpAndArmor();
        self.testIfMatch = false;
        self.victoryDefeat();
    }, 500);

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
                if(self.enemies.goblinLeft.inPlay == true){
                    self.enemies.goblinLeft.inPlay = false;
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
        self.checkMatch(this, 'left', 'right');
    });
    $('.rightCard').on('click', function () {
        $(".rightCard").addClass("inactive").removeClass("activeSide");
        $(".leftCard").addClass("activeSide");
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
