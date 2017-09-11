// Source Code located at https://github.com/JonathanV123/memMatch
!function(t){function a(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,a),s.l=!0,s.exports}var e={};a.m=t,a.c=e,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},a.p="",a(a.s=0)}([function(t,a){function e(){game=new s,game.setUpGame()}$(document).ready(function(){e()});var s=function(){this.leftCards=[],this.rightCards=[],this.checkCards=[],this.leftCard=!1,this.rightCard=!1,this.correctMatch=0,this.incorrectMatchCount=0,this.playerHp=20,this.playerArmor=10,this.testIfMatch=!0,this.slideIndex=1,this.enemies={2:{className:".enemy-1",attackStrength:1,inPlay:!1,attackAnimationClassName:"goblinTopLeft"},4:{className:".enemy-2",attackStrength:1,inPlay:!1,attackAnimationClassName:"goblinTopRight"},8:{className:".enemy-3",attackStrength:2,inPlay:!1,attackAnimationClassName:"trollMiddleLeft"},12:{className:".enemy-5",attackStrength:2,inPlay:!1,attackAnimationClassName:"trollMiddleRight"},16:{className:".enemy-6",attackStrength:2,inPlay:!1,attackAnimationClassName:"urukBottomLeft"},20:{className:".enemy-7",attackStrength:2,inPlay:!1,attackAnimationClassName:"trollBottomRight"},nazgulEnemy:{className:".enemy-4",attackStrength:4,inPlay:!1,attackAnimationClassName:"nazgul"}},this.specialCards={dwarfCard:{activateAblity:"healerActivated"},hornCard:{activateAblity:"hornActivated"},nazgulCard:{activateAblity:"nazgul"}}},n=function(t){this.id=t};s.prototype.setUpGame=function(){this.createCards(9),this.shuffleCards(this.leftCards),this.shuffleCards(this.rightCards),this.renderCards(this.leftCards),this.renderCards(this.rightCards),this.addClickHandlers(),this.addDataToHtml(),this.addClickHandlersToInfoBar(),this.cardDefault(),this.updateStats(),this.showImgDivs(this.slideIndex)},s.prototype.nextImage=function(t){this.showImgDivs(this.slideIndex+=t)},s.prototype.showImgDivs=function(t){var a,e=document.getElementsByClassName("imageSlides");for(t>e.length&&(this.slideIndex=1),t<1&&(this.slideIndex=e.length),a=0;a<e.length;a++)e[a].style.display="none";e[this.slideIndex-1].style.display="block"},s.prototype.createCards=function(t){for(i=1;i<=t;i++)this.leftCards.push(new n(i)),this.rightCards.push(new n(i))},s.prototype.shuffleCards=function(t){for(var a=t.length-1;a>0;a--){var e=Math.floor(Math.random()*(a+1)),i=t[a];t[a]=t[e],t[e]=i}},s.prototype.renderCard=function(t,a){var e='<div class="gameCard '+a+'Card"><div class = "front card-'+t.id+'"></div><div class = "back"></div></div>',i=$(e);$("."+a+"Side").append(i)},s.prototype.addDataToHtml=function(){$(".card-1").attr("data-card","dwarfCard"),$(".card-2").attr("data-card","hornCard"),$(".card-3").attr("data-card","nazgulCard"),$(".card-4").attr("data-card","4"),$(".card-5").attr("data-card","5"),$(".card-6").attr("data-card","6"),$(".card-7").attr("data-card","7"),$(".card-8").attr("data-card","8"),$(".card-9").attr("data-card","9")},s.prototype.renderCards=function(t){var a=this;t.forEach(function(e){t===a.leftCards?a.renderCard(e,"left"):a.renderCard(e,"right")})},s.prototype.cardDefault=function(){$(".leftCard").removeClass("flipCard unclickable"),$(".rightCard").removeClass("flipCard unclickable"),$(".horn").removeClass("unclickable"),this.leftCard=!1,this.rightCard=!1},s.prototype.handleCardMatch=function(){this.leftCard=!1,this.rightCard=!1,this.testIfMatch=!0,this.correctMatch+=1},s.prototype.specialCardActivation=function(t){var a=this.specialCards[t];a&&(this[a.activateAblity]=!0),this.healerActivated&&(this.playerHp+=8,$(".card-1").removeClass("activeSide"),this.healerActivated=!1),this.hornActivated&&($(".card-2").removeClass("activeSide"),$(".horn").addClass("hornPulseAnimation")),this.nazgul&&($(".card-3").removeClass("activeSide"),$(".enemy-4").removeClass("invisible"),this.enemies.nazgulEnemy.inPlay=!0)},s.prototype.leftCardAndRightCardCheck=function(t,a){return this[t+"Card"]&&!this[a+"Card"]},s.prototype.checkMatch=function(t,a,e){var i=this,s=$(t);s.toggleClass("flipCard"),i[a+"Card"]=!0,i.leftCardAndRightCardCheck(a,e)?i.checkCards.push(s.children(":first")):(i.checkCards.push(s.children(":first")),i.checkIfCardsMatch(i.checkCards)),i.enemySpawn(),i.updateStats(),i.victoryDefeatConditions()},s.prototype.checkIfCardsMatch=function(t){var a=this;t[0][0].dataset.card===t[1][0].dataset.card?(this.specialCardActivation(t[0][0].dataset.card),this.cardMatchCompleteDisableCards(t),this.handleCardMatch(),$(".leftCard").removeClass("unclickable"),$(".rightCard").removeClass("unclickable")):(this.enemyCombatPhase(),this.incorrectMatchCount+=2,setTimeout(a.cardDefault.bind(a),900)),this.checkCards=[]},s.prototype.cardMatchCompleteDisableCards=function(t){t.forEach(function(t){t.parent().css("pointer-events","none").removeClass("front leftCard rightCard activeSide").addClass("cardInactive")})},s.prototype.activateEnemy=function(t){var a=this.enemies[t];a&&($(a.className).removeClass("invisible fadeOut"),this.enemies[t].inPlay=!0)},s.prototype.enemySpawn=function(){1==this.leftCard&&1==this.rightCard&&0==this.testIfMatch&&this.activateEnemy(this.incorrectMatchCount)},s.prototype.enemyCombatPhase=function(){var t=this;for(var a in this.enemies){var e=this.enemies[a];!0===e.inPlay&&t.attack(e.className,e.attackStrength,e.attackAnimationClassName)}},s.prototype.updateStats=function(){$(".hitPoints").html(this.playerHp),$(".armor").html(this.playerArmor),this.testIfMatch=!1},s.prototype.attack=function(t,a,e){var i=this;$(t).removeClass(e),setTimeout(function(){$(t).addClass(e),i.playerArmor>0?i.playerArmor-=a:(i.playerHp=i.playerArmor+=i.playerHp,i.playerArmor=0,i.playerHp-=a),i.playerHp<0&&(i.playerHp=0),i.updateStats(),i.animateHpAndArmor(),i.testIfMatch=!1,i.victoryDefeatConditions()},500)},s.prototype.animateHpAndArmor=function(){this.playerArmor>0?($(".armor").addClass("animateHitPoints"),setTimeout(function(){$(".armor").removeClass("animateHitPoints")},1e3)):($(".hitPoints").addClass("animateHitPoints"),setTimeout(function(){$(".hitPoints").removeClass("animateHitPoints")},1e3))},s.prototype.victoryDefeatConditions=function(){var t=this;t.playerHp<=0&&($(".defeat").removeClass("displayNoneClass").addClass("animateDefeatVictory"),$(".leftSide").addClass("unclickable"),$(".rightSide").addClass("unclickable"),$(".horn").addClass("unclickable"),setTimeout(function(){$(".restartGame").removeClass("invisible"),$(".playAgainButton").removeClass("invisible")},6e3)),9===t.correctMatch&&($(".victory").removeClass("displayNoneClass").addClass("animateDefeatVictory"),$(".leftSide").addClass("unclickable"),$(".rightSide").addClass("unclickable"),$(".horn").addClass("unclickable"),setTimeout(function(){$(".restartGame").removeClass("invisible"),$(".playAgainButton").removeClass("invisible")},6e3))},s.prototype.addClickHandlersToInfoBar=function(){var t=this;$(".soundButton").on("click",function(){$(".soundButton").toggleClass("unMute");var t=document.getElementById("song");!0===t.muted?t.muted=!1:t.muted=!0}),$(".soundButtonInGame").on("click",function(){$(".soundButtonInGame").toggleClass("unMuteInGame");var t=document.getElementById("song");!0===t.muted?t.muted=!1:t.muted=!0}),$(".exitIntroScreen").on("click",function(){$(".container").css("visibility","visible"),$(".introScreen").css("display","none")}),$(".horn").on("click",function(){if(!0===t.hornActivated){t.hornActivated=!1,$(".rohan").addClass("chargeForward"),$(".horn").removeClass("hornPulseAnimation");for(var a in t.enemies){var e=t.enemies[a];!0===e.inPlay&&($(e.className).addClass("fadeOut"),e.inPlay=!1)}}}),$(".about").on("click",function(){$(".aboutPage").removeClass("invisible")}),$(".tutorial").on("click",function(){$(".howToPlay").removeClass("invisible"),$(".howToPlayMobile").removeClass("invisible displayNoneClass")}),$(".exitButton").on("click",function(){$(".aboutPage").addClass("invisible"),$(".howToPlay").addClass("invisible")})},s.prototype.addClickHandlers=function(){var t=this;$(".leftCard").on("click",function(){$(".leftCard").addClass("unclickable").removeClass("activeSide"),$(".rightCard").addClass("activeSide"),t.checkMatch(this,"left","right")}),$(".rightCard").on("click",function(){$(".rightCard").addClass("unclickable").removeClass("activeSide"),$(".leftCard").addClass("activeSide"),t.checkMatch(this,"right","left")}),$(".displayLeft").on("click",function(){t.nextImage(-1)}),$(".displayRight").on("click",function(){t.nextImage(1)}),$(".exitButton, .mobileCardInfo").on("click",function(){$(".howToPlayMobile").addClass("invisible dislayNoneClass")}),$(".playAgainButton").on("click",function(){for($(".leftSide").html(""),$(".rightSide").html(""),$(".leftSide").removeClass("unclickable"),$(".rightSide").removeClass("unclickable"),$(".rohan").removeClass("chargeForward"),$(".victory").addClass("displayNoneClass").removeClass("animateDefeatVictory"),$(".defeat").addClass("displayNoneClass").removeClass("animateDefeatVictory"),$(".enemy").addClass("invisible"),$(".restartGame").addClass("invisible"),$(".playAgainButton").addClass("invisible"),$(".horn").removeClass("hornPulseAnimation"),i=1;i<8;i++)$(".enemy-"+i).removeClass("fadeOut fadeIn");$("body").find("*").off(),game=new s,game.setUpGame()})}}]);