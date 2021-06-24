var playerName = window.prompt("What is your robot's name?")
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[2]);


// fight function (now with parameter for enemy's name)
var fight = function(enemyName) {
    // repeat function if enemy is alive
    while (playerHealth > 0 && enemyHealth > 0) {

                // fight or run
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player chose skip
          if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes, leave
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // skip penalty
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
          }



        //remove health = attack power
        enemyHealth = enemyHealth - playerAttack;    
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining "
        );       


        //   check enemy health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died! ");

            // award player for defeating enemy
            playerMoney = playerMoney +20;
            
            // leave loop dead enemy
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left. ");
        }
    
        // remove health = attack power.
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining. "
        );
    
            // check player health 
            if (playerHealth <= 0) {
                window.alert(playerName + " has died! ");
                // leave loop dead player
                break;
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left. ");
            }
    
        
    }   

};


// function to start new game
var startGame = function() {

    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // round #
            window.alert("Welcome to Robot Gladiators! " + (i + 1) );

            // new enemy
            var pickedEnemyName = enemyNames[i];

            // reset enemy health
            enemyHealth = 50;

            // debugger;
    
            fight(pickedEnemyName);

            // if not last # in array
            if (playerHealth > 0 && i < enemyNames.length - 1) {

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
    // if player is alive, you win
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
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
    // ask what player wants to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    switch (shopOptionPrompt) {
        case "REFILL":              // new case same definition
        case "refill":
            if (playerMoney >= 7) {
                    
                window.alert("Refilling the player's health by 20 for 7 dollars");

                // increase health, decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;

        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars");

            // increase player attack, decrease player money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;
            
        case "LEAVE":    
        case "leave":
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

// page load start game 
startGame();