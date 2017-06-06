$(document).ready(function () {
    startGame();
});
function startGame() {
    game = new Game();
    game.setUpGame();
}
//Class Game. Contains all gameplay elements
var Game = function () {
    this.leftCards = [];
    this.rightCards = [];
    this.checkCards = [];
    this.amountClicked = 0;
    this.leftCard = false;
    this.rightCard = false;
    this.correctMatch = 0;
    this.incorrectMatchCount = 0;
    this.playerHp = 20;
    this.playerArmor = 10;
    this.testIfMatch = true;
    this.hornActivated = false;
    this.healerActivated = false;
    this.attackClass = "enemyAttack";
    this.slideIndex = 1;
    this.enemies = {
        2: {
            className: '.enemy-1',
            attackStrength: 1,
            inPlay: false
        },
        4: {
            className: '.enemy-2',
            attackStrength: 1,
            inPlay: false
        },
        8: {
            className: '.enemy-3',
            attackStrength: 2,
            inPlay: false
        },
        12: {
            className: '.enemy-5',
            attackStrength: 2,
            inPlay: false
        },
        16: {
            className: '.enemy-6',
            attackStrength: 2,
            inPlay: false
        },
        20: {
            className: '.enemy-7',
            attackStrength: 2,
            inPlay: false
        },
        nazgulEnemy: {
            className: '.enemy-4',
            attackStrength: 4,
            inPlay: false
        },
    };
    this.specialCards = {
        dwarfCard: {
            activateAblity: 'healerActivated'

        },
        hornCard: {
            activateAblity: 'hornActivated'

        },
        nazgulCard: {
            activateAblity: 'nazgul',
        },

    };
};
//Creating Card Class
var Card = function (id) {
    this.id = id;
};
//Defining a Method SetUpGame that sets the game up...
Game.prototype.setUpGame = function () {
    this.createCards(9);
    this.shuffleCards(this.leftCards);
    this.shuffleCards(this.rightCards);
    this.renderCards();
    this.addClickHandlers();
    this.addDataToHtml();
    this.addClickHandlersToInfoBar();
    this.cardDefault();
    this.updateStats();
    this.showImgDivs(this.slideIndex);
};
Game.prototype.nextImage = function (num) {
    this.showImgDivs(this.slideIndex += num);
}
Game.prototype.showImgDivs = function (num) {
    var i;
    var x = document.getElementsByClassName("imageSlides");
    if (num > x.length) {
        this.slideIndex = 1
    }
    if (num < 1) {
        this.slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[this.slideIndex - 1].style.display = "block";
};
//Creates a certain amount of cards based on cardCount parameter
Game.prototype.createCards = function (cardCount) { //Review
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
Game.prototype.shuffleCards = function (cards) {
    //Shuffle Cards
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
};

Game.prototype.renderCard = function (card, boardSide) {
    var cardHtml = '<div class="gameCard ' + boardSide + 'Card"><div class = "front card-' + card.id + '"></div><div' + ' class' +
        ' =' + ' "back"></div></div>';
    var cardElement = $(cardHtml);
    $("." + boardSide + "Side").append(cardElement);
    card.domElement = cardElement;
};
Game.prototype.addDataToHtml = function () {
    $(".card-1").attr("data-specialCard", "dwarfCard");
    $(".card-2").attr("data-specialCard", "hornCard");
    $(".card-3").attr("data-specialCard", "nazgulCard");
    $(".card-4").attr("data-specialCard", "4");
    $(".card-5").attr("data-specialCard", "5");
    $(".card-6").attr("data-specialCard", "6");
    $(".card-7").attr("data-specialCard", "7");
    $(".card-8").attr("data-specialCard", "8");
    $(".card-9").attr("data-specialCard", "9");

};
//Render the cards by looping through and dynamically creating the HTML element then appending
Game.prototype.renderCards = function () {
    var game = this;
    // clearTimeout(this);
    // this can be cleaned up with bind
    this.leftCards.forEach(function (card) {
        game.renderCard(card, 'left')
    });
    this.rightCards.forEach(function (card) {
        game.renderCard(card, 'right')
    });
};
//Reverts card back to default state
Game.prototype.cardDefault = function () {
    $(".leftCard").removeClass("flipCard inactive");
    $(".rightCard").removeClass("flipCard inactive");
    $(".horn").removeClass("inactive");
    this.leftCard = false;
    this.rightCard = false;
};

Game.prototype.handleCardMatch = function () {
    this.leftCard = false;
    this.rightCard = false;
    this.testIfMatch = true;
    this.correctMatch += 1;

};
Game.prototype.specialCardActivation = function (cardName) {
    var activateSpecialCard = this.specialCards[cardName];
    if (activateSpecialCard) {
        this[activateSpecialCard.activateAblity] = true;
    }
};
Game.prototype.isMatch = function (side, opposite) {
    return this[side + 'Card'] && !this[opposite + 'Card'];
};
//Checks if card is a match. Also contains match conditions for special cards
Game.prototype.checkMatch = function (card, side, opposite) {
    var self = this;
    var $card = $(card);
    self.amountClicked++;
    $card.toggleClass('flipCard');
    $("." + side + "Card").addClass("inactive");
    self[side + 'Card'] = true;
    if (self.isMatch(side, opposite)) {
        self.checkCards.push($card.children(":first"));
    }
    else {
        self.checkCards.push($card.children(":first"));
        if (self.checkCards[0][0].dataset.specialcard === self.checkCards[1][0].dataset.specialcard) {
            self.specialCardActivation(self.checkCards[0][0].dataset.specialcard);
            if (self.healerActivated === true) {
                self.playerHp += 8;
                $(".card-1").removeClass("activeSide");
                self.healerActivated = false;
            }
            if (self.hornActivated === true) {
                $(".card-2").removeClass("activeSide");
                $(".horn").addClass("hornPulseAnimation");
            }
            if (self.nazgul === true) {
                $(".card-3").removeClass("activeSide");
                $(".enemy-4").removeClass("invisible").addClass("midAttackAnimation");
                self.enemies.nazgulEnemy.inPlay = true;
            }
            self.checkCards[0].parent().css("pointer-events", "none").removeClass("front leftCard rightCard activeSide").addClass("cardInactive");
            self.checkCards[1].parent().css("pointer-events", "none").removeClass("front rightCard leftCard activeSide").addClass("cardInactive");
            self.handleCardMatch();
            $(".leftCard").removeClass("inactive");
            $(".rightCard").removeClass("inactive");
        } else {
            //If no match set cards back to default after .9 seconds
            $(".leftCard").addClass("inactive");
            $(".rightCard").addClass("inactive");
            self.enemyCombatPhase();
            self.incorrectMatchCount += 2;
            setTimeout(self.cardDefault.bind(self), 900);
        }
        //Clear checkCards
        self.checkCards = [];
    }
    self.enemySpawn();
    self.updateStats();
    self.victoryDefeatConditions();
};
//Activate enemy when incorrectMatchCount reaches enemy value
Game.prototype.activateEnemy = function (incorrectMatchCount) {
    var enemy = this.enemies[incorrectMatchCount];
    if (enemy) {
        $(enemy.className).removeClass("invisible fadeOut").addClass("fadeIn");
        this.enemies[incorrectMatchCount].inPlay = true;
    }
};
//Spawns enemies based on incorrect match count
Game.prototype.enemySpawn = function () {
    if (this.leftCard == true && this.rightCard == true && this.testIfMatch == false) {
        this.activateEnemy(this.incorrectMatchCount);
    }
};
//Enemy attack function that enables when an enemy boolean becomes true
Game.prototype.enemyCombatPhase = function () {
    var self = this;
    for (var key in this.enemies) {
        var currentEnemy = this.enemies[key];
        if (currentEnemy.inPlay === true) {
            $(currentEnemy.className).removeClass("enemyAttack fadeIn");
            self.attack(currentEnemy.className, currentEnemy.attackStrength);
        }
    }
};
//Update game stats. Hit points and Armor
Game.prototype.updateStats = function () {
    $(".hitPoints").html(this.playerHp);
    $(".armor").html(this.playerArmor);
    this.testIfMatch = false;
};
//Attack function that deals damage
Game.prototype.attack = function (enemyCardClass, damage) {
    var self = this;
    setTimeout(function () {
        $(enemyCardClass).addClass(self.attackClass);
        if (self.playerArmor > 0) {
            self.playerArmor -= damage;
        } else {
            self.playerHp = self.playerArmor += self.playerHp;
            self.playerArmor = 0;
            self.playerHp -= damage;
        }
        if (self.playerHp < 0) {
            self.playerHp = 0;
        }
        self.updateStats();
        self.animateHpAndArmor();
        self.testIfMatch = false;
        self.victoryDefeatConditions();
    }, 500);
};
//Animate armor and hip points when attacked
Game.prototype.animateHpAndArmor = function () {
    if (this.playerArmor > 0) {
        $(".armor").addClass("animateHitPoints");
        setTimeout(function () {
            $(".armor").removeClass("animateHitPoints");
        }, 1000);
    }
    else {
        $(".hitPoints").addClass("animateHitPoints");
        setTimeout(function () {
            $(".hitPoints").removeClass("animateHitPoints");
        }, 1000);
    }
};
//Win and Lose conditions
Game.prototype.victoryDefeatConditions = function () {
    var self = this;
    if (self.playerHp <= 0) {
        $(".defeat").removeClass("displayNoneClass").addClass("animateDefeatVictory");
        $(".leftSide").addClass("inactive");
        $(".rightSide").addClass("inactive");
        $(".horn").addClass("inactive");
        setTimeout(function () {
            $(".restartGame").removeClass("invisible");
            $(".playAgainButton").removeClass("invisible");
        }, 6000);
    }
    if (self.correctMatch === 9) {
        $(".victory").removeClass("displayNoneClass").addClass("animateDefeatVictory");
        $(".leftSide").addClass("inactive");
        $(".rightSide").addClass("inactive");
        $(".horn").addClass("inactive");
        setTimeout(function () {
            $(".restartGame").removeClass("invisible");
            $(".playAgainButton").removeClass("invisible");
        }, 6000);
    }
};
Game.prototype.addClickHandlersToInfoBar = function () {
    var self = this;
    $('.soundButton').on('click', function () {
        $('.soundButton').toggleClass("unMute");
        var audio = document.getElementById('song');
        if (audio.muted === true) {
            audio.muted = false;
        }
        else {
            audio.muted = true;
        }
    });
    $('.soundButtonInGame').on('click', function () {
        $('.soundButtonInGame').toggleClass("unMuteInGame");
        var audio = document.getElementById('song');
        if (audio.muted === true) {
            audio.muted = false;
        }
        else {
            audio.muted = true;
        }
    });
    $('.exitIntroScreen').on('click', function () {
        $('.container').css("visibility", 'visible');
        $('.introScreen').css("display", 'none');
    });
    $('.horn').on('click', function () {
        if (self.hornActivated === true) {
            self.hornActivated = false;
            $(".rohan").addClass("chargeForward");
            $(".horn").removeClass("hornPulseAnimation");
            for (var key in self.enemies) {
                var theCurrentEnemy = self.enemies[key];
                if (theCurrentEnemy.inPlay === true) {
                    $(theCurrentEnemy.className).addClass("fadeOut");
                    theCurrentEnemy.inPlay = false;
                }
            }
        }
    });
    $(".about").on('click', function () {
        $(".aboutPage").removeClass("invisible");
    });
    $(".tutorial").on('click', function () {
        $(".howToPlay").removeClass("invisible");
        $(".howToPlayMobile").removeClass("invisible displayNoneClass");

    });
    $(".exitButton").on('click', function () {
        $(".aboutPage").addClass("invisible");
        $(".howToPlay").addClass("invisible");
    })
};
//Add click handlers to cards
Game.prototype.addClickHandlers = function () {
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
    $('.displayLeft').on('click', function () {
        self.nextImage(-1);
    });
    $('.displayRight').on('click', function () {
        self.nextImage(+1);
    });
    $('.exitMobileCardInfo').on('click', function () {
        $('.howToPlayMobile').addClass("invisible dislayNoneClass");
    });
    //Restart the game
    $(".playAgainButton").on('click', function () {
        $('.leftSide').html('');
        $('.rightSide').html('');
        $(".leftSide").removeClass("inactive");
        $(".rightSide").removeClass("inactive");
        $(".rohan").removeClass("chargeForward");
        $(".victory").addClass("displayNoneClass").removeClass("animateDefeatVictory");
        $(".defeat").addClass("displayNoneClass").removeClass("animateDefeatVictory");
        $('.enemy').addClass('invisible');
        $(".restartGame").addClass("invisible");
        $(".playAgainButton").addClass("invisible");
        $(".horn").removeClass("hornPulseAnimation");
        for (i = 1; i < 8; i++) {
            $(".enemy-" + i).removeClass("fadeOut fadeIn");
        }
        $("body").find("*").off();
        game = new Game();
        game.setUpGame();
    });
};
