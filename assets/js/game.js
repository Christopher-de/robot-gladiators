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

for (var i = 0; i < enemyNames.length; i++) {

    if (playerHealth > 0) {
        // round #
        window.alert("Welcome to Robot Gladiators!" + (i++) );

        // new enemy
        var pickedEnemyName = enemyNames[i];

        // reset enemy health
        enemyHealth = 50;

        // debugger;
    
        fight(pickedEnemyName);
    } else {
        window.alert("You have lost your robot in battle! Game Over!")
    }
    
}