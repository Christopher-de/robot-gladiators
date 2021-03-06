// random numeric value generation
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min) + min);

    return value;
};


var fightOrSkip = function() {
    // fight or run
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip()
    }

    // if player chose skip
    promptFight = promptFight.toLowerCase()

    if (promptFight === "skip") {
        // confirm skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes, leave
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // skip penalty
            playerInfo.playerMoney = playerInfo.money -10;
            
            
            //return true if leave
            return true;
        }
    }
    return false;
}

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
    //who goes first
    var isPlayerTurn = true;

    //random order
    if (Math.random() > 0.5) {
        isPlayerTurn = false
    }

    // repeat function if enemy is alive
    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {

            if (fightOrSkip()) {
                break;
            }
            //remove health = attack power
            //random damage value based on playerInfo.attack
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);   

            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining "
            );       


            //   check enemy health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died! ");

                // award player for defeating enemy
                playerInfo.money = playerInfo.money +20;
            
                // leave loop dead enemy
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left. ");
            }

            //player gets attacked first
        } else {
    
            // remove health = attack power.
            //random damage value based on enemyAttack
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining. "
            );

                // check player health 
                if (playerInfo.health <= 0) {
                    window.alert(playerInfo.name + " has died! ");
                    // leave loop dead player
                    break;
                } else {
                    window.alert(playerInfo.name + " still has " + playerInfo.health + " health left. ");
                }
            }
            // switch next turn order
            isPlayerTurn = !isPlayerTurn
    }   

};


// function to start new game
var startGame = function() {

    // reset player stats
    playerInfo.reset();
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // round #
            window.alert("Welcome to Robot Gladiators! " + (i + 1) );

            // new enemy
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy health
            pickedEnemyObj.health = randomNumber(40, 60);


            // debugger;
    
            fight(pickedEnemyObj);

            // if not last # in array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {

                // enter store?
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes take to store
                if (storeConfirm) {
                    shop();
                }
            }
        } 
        else {
            window.alert("You have lost your robot in battle! Game Over!");
        }
    }
    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
    
};

// function to end game
var endGame = function() {
    window.alert("The game has ended. Let's see how you did!");

    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    //new highscore if playermoney > highscore
    if (playerInfo.money > highScore) {
        localStorage.setItem ("highscore", playerInfo.money);
        localStorage.setItem ('name', playerInfo.name);

        alert(playerInfo.name + ' now has the highscore of ' + playerInfo.money + '!');
    } else {
        alert(playerInfo.name + 'did not beat the highscore of ' + highScore + '. Maybe next time!');
    }
   
    // ask to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {

    shopOptionPrompt = parseInt(shopOptionPrompt)
    // ask what player wants to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE."
    );
    switch (shopOptionPrompt) {
        case "1":
            playerInfo.refillHealth();
            break;

        case "2":
            playerInfo.upgradeAttack();
            break;
             
        case "3":
            window.alert("Leaving the store");
            
            // do nothing, end function
            break;

        default:
            window.alert("You did not pick a valid function. Try again.");

            // call shop() again to make player pick valid option
            shop();
            break;
    }
};


// set name function
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?")
    }

    console.log("Your robot's name is " + name);
    return name;
};


var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        this.health += 20;
        this.money -= 7;
    },
    upgradeAttack: function() {
        this.attack += 6;
        this.money -= 7;
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

// page load start game 
startGame();


