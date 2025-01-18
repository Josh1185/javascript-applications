// Character Objects
let player = {
  health: 100,
  attackPower: 2,
  defense: 0,
  gems: Math.floor(Math.random() * 10)
};

const enemies = [
  {
    name: "skeleton",
    location: "cavern",
    health: 15,
    attackPower: 3,
    carriedGems: 5
  },
  {
    name: "deranged caveman",
    location: "cavern",
    health: 45,
    attackPower: 10,
    carriedGems: 10
  },
  {
    name: "zombie",
    location: "woods",
    health: 100,
    attackPower: 20,
    carriedGems: 20
  },
  {
    name: "witch",
    location: "woods",
    health: 150,
    attackPower: 30,
    carriedGems: 30
  },
];

const bosses = [
  {
    name: "giant spider",
    location: "cavern",
    health: 250,
    attackPower: 20,
    reward: "150 gems",
    carriedGems: 150
  },
  {
    name: "werewolf",
    location: "woods",
    health: 500,
    attackPower: 40,
    reward: "Save the village!",
    carriedGems: 0
  }
];

// Locations object
const locations = [
  {
    name: "village",
    "button text": [
      "Go to merchant outpost",
      "Go to the caverns",
      "Go to the woods",
      "Fight werewolf (final boss)"
    ],
    "button functions": [
      goToOutpost,
      goToCavern,
      goToWoods,
      fightWerewolf
    ],
    text: "You are currently at the village. Need to upgrade? Consider heading to the merchant outpost to spend any carried gems."
  },
  {
    name: "merchant outpost",
    "button text": [
      "Health potion (5 gems)",
      "Strength potion (20 gems)",
      "Armor upgrade (20 gems)",
      "Go back to village"
    ],
    "button functions": [
      buyHealth,
      buyStrength,
      buyDefense,
      goToVillage
    ],
    text: 'You are now at the merchant outpost. "That werewolf will destroy the village! I will give you the spells necessary to take on the beast, but you must give me some gems in return." says the Merchant.'
  },
  {
    name: "cavern",
    "button text": [
      "Fight skeleton",
      "Fight angry caveman",
      "Fight giant spider (boss)",
      "Go back to village"
    ],
    "button functions": [
      fightSkeleton,
      fightCaveman,
      fightSpider,
      goToVillage
    ],
    text: 'You are now inside the caverns and stumble upon some monsters! Either pick your fight wisely or run back to the village!'
  },
  {
    name: "woods",
    "button text": [
      "Fight zombie",
      "Fight witch",
      "Fight werewolf (final boss)",
      "Go back to village"
    ],
    "button functions": [
      fightZombie,
      fightWitch,
      fightWerewolf,
      goToVillage
    ],
    text: 'You are now in the woods and see some monsters in the distance! Either pick your fight wisely or run back to the village! BEWARE THE WEREWOLF!'
  },
  {
    name: "fighting",
    "button text": [
      "Attack!",
      "Dodge!",
      "Run!",
      "Give up."
    ],
    "button functions": [
      attack,
      dodge,
      goToVillage,
      loseGame
    ],
    text: 'You are now fighting an enemy!'
  },
  {
    name: "defeated enemy",
    "button text": [
      "Go back to village",
      "Go back to village",
      "Go back to village",
      "Go back to village"
    ],
    "button functions": [
      goToVillage,
      goToVillage,
      goToVillage,
      goToVillage
    ],
    text: 'The enemy has fallen.'
  },
  {
    name: "lose game",
    "button text": [
      "Replay?",
      "Replay?",
      "Replay?",
      "Replay?"
    ],
    "button functions": [
      restartGame,
      restartGame,
      restartGame,
      restartGame
    ],
    text: 'You died.'
  },
  {
    name: "win game",
    "button text": [
      "Replay?",
      "Replay?",
      "Replay?",
      "Replay?"
    ],
    "button functions": [
      restartGame,
      restartGame,
      restartGame,
      restartGame
    ],
    text: 'You win! The village shouts with joy as the vicious werewolf falls to the ground!'
  },
];

// DOM elements for player stats
const healthText = document.querySelector('.health-text');
const attackPowerText = document.querySelector('.attack-power-text');
const defenseText = document.querySelector('.defense-text');
const gemsText = document.querySelector('.gems-text');

// DOM elements for buttons
const button1 = document.querySelector('.button1');
const button2 = document.querySelector('.button2');
const button3 = document.querySelector('.button3');
const button4 = document.querySelector('.button4');

// DOM elements for enemy stats
const enemyStats = document.querySelector('.enemy-stats');
const enemyHealthText = document.querySelector('.enemy-health-text');
const enemyPowerText = document.querySelector('.enemy-attack-power-text');

// DOM elements for boss stats
const bossStats = document.querySelector('.boss-stats')
const bossHealthText = document.querySelector('.boss-health-text');
const bossPowerText = document.querySelector('.boss-attack-power-text');
const bossRewardText = document.querySelector('.boss-reward-text');

// DOM element for main text
const mainText = document.querySelector('.text');

// Initialize the player stats 
healthText.innerText = player.health;
attackPowerText.innerText = player.attackPower;
defenseText.innerText = player.defense;
gemsText.innerText = player.gems;

// Initialize the 4 buttons
button1.onclick = goToOutpost;
button2.onclick = goToCavern;
button3.onclick = goToWoods;
button4.onclick = fightWerewolf;

// Function that updates the UI based on location
function goLocation(location) {
  enemyStats.style.display = "none";
  bossStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];

  mainText.innerText = location.text;
}

// function that goes to the village
function goToVillage() {
  goLocation(locations[0]);
}

// Function that goes to the merchant outpost
function goToOutpost() {
  goLocation(locations[1]);
}

// function that goes to the cavern
function goToCavern() {
  goLocation(locations[2]);
}

// function that goes to the woods
function goToWoods() {
  goLocation(locations[3]);
}

// functions for outpost purchases
function buyHealth() {
  if (player.gems >= 5) {
    if (player.health < 200) {
      player.health += 20;
      player.gems -= 5;
      healthText.innerText = player.health;
      gemsText.innerText = player.gems;
    } else {
      player.health = 200;
      mainText.innerText = "You are at max health! No need to buy any more potions!";
    }
  } else {
    mainText.innerText = "Not enough gems. You can find more by fighting enemies!";
  }
}

function buyStrength() {
  if (player.gems >= 20) {
    if (player.attackPower < 50) {
      player.attackPower += 4;
      player.gems -= 20;
      attackPowerText.innerText = player.attackPower;
      gemsText.innerText = player.gems;
    } else {
      mainText.innerText = "You are at max strength! No need to buy any more potions!";
    }
  } else {
    mainText.innerText = "Not enough gems. You can find more by fighting enemies!";
  }
}

function buyDefense() {
  if (player.gems >= 20) {
    if (player.defense < 30) {
      player.defense += 3;
      player.gems -= 20;
      defenseText.innerText = player.defense;
      gemsText.innerText = player.gems;
    } else {
      mainText.innerText = "You are at max defense! No need to buy any more armor!";
    }
  } else {
    mainText.innerText = "Not enough gems. You can find more by fighting enemies!";
  }
}

// functions for combat logic
let enemyIndex;
let bossIndex;
let isBoss;
let enemyHealth;
let bossHealth;

function fightingEnemy() {
  goLocation(locations[4]);
  enemyStats.style.display = "block";
  enemyHealth = enemies[enemyIndex].health;
  enemyHealthText.innerText = enemyHealth;
  enemyPowerText.innerText = enemies[enemyIndex].attackPower;
  mainText.innerText = `You are now fighting a ${enemies[enemyIndex].name}!`;
}

function fightingBoss() {
  goLocation(locations[4]);
  bossStats.style.display = "block";
  bossHealth = bosses[bossIndex].health;
  bossHealthText.innerText = bossHealth;
  bossPowerText.innerText = bosses[bossIndex].attackPower;
  bossRewardText.innerText = bosses[bossIndex].reward;
  mainText.innerText = `You are now fighting the ${bosses[bossIndex].name}! You better be prepared!!`;
}

function attack() {
  if (isBoss) {
    mainText.innerText = `The ${bosses[bossIndex].name} attacks!`;
    player.health -= Math.floor(bosses[bossIndex].attackPower * ((100 - player.defense) / 100));
    bossHealth -= player.attackPower + Math.floor(Math.random() * (player.attackPower));
    bossHealthText.innerText = bossHealth;
    mainText.innerText += "\nYou attack it back!";
    healthText.innerText = player.health;
    if (player.health <= 0) {
      loseGame();
    }
    else if (bossHealth <= 0) {
      defeatBoss();
    }
  } else {
    mainText.innerText = `The ${enemies[enemyIndex].name} attacks!`;
    player.health -= Math.floor(enemies[enemyIndex].attackPower * ((100 - player.defense) / 100));
    enemyHealth -= player.attackPower + Math.floor(Math.random() * (player.attackPower));
    enemyHealthText.innerText = enemyHealth;
    mainText.innerText += "\nYou attack it back!";
    healthText.innerText = player.health;
    if (player.health <= 0) {
      loseGame();
    }
    else if (enemyHealth <= 0) {
      defeatEnemy();
    }
  }
}

function dodge() {
  if (isBoss) {
    mainText.innerText = `The ${bosses[bossIndex].name} attacks, but you dodge!`;
  } else {
    mainText.innerText = `The ${enemies[enemyIndex].name} attacks, but you dodge!`;
  }
}

function defeatEnemy() {
  goLocation(locations[5]);
  player.gems += enemies[enemyIndex].carriedGems + Math.floor(Math.random() * (enemies[enemyIndex].carriedGems));
  gemsText.innerText = player.gems;
  mainText.innerText = `The ${enemies[enemyIndex].name} has been defeated, and it seems that some gems dropped aswell.`;
}

function defeatBoss() {
  if (bossIndex === 1) {
    winGame();
  } else {
    goLocation(locations[5]);
    player.gems += bosses[bossIndex].carriedGems;
    gemsText.innerText = player.gems;
    mainText.innerText = `The ${bosses[bossIndex].name} has been defeated, your reward has been granted!`;
  }
}

// functions for cavern choices 
function fightSkeleton() {
  enemyIndex = 0;
  isBoss = false;
  fightingEnemy();
}

function fightCaveman() {
  enemyIndex = 1;
  isBoss = false;
  fightingEnemy();
}

function fightSpider() {
  bossIndex = 0;
  isBoss = true;
  fightingBoss();
}

// function for woods choices
function fightZombie() {
  enemyIndex = 2;
  isBoss = false;
  fightingEnemy();
}

function fightWitch() {
  enemyIndex = 3;
  isBoss = false;
  fightingEnemy();
}

function fightWerewolf () {
  bossIndex = 1;
  isBoss = true;
  fightingBoss();
}

// Functions for winning or losing
function winGame() {
  goLocation(locations[7]);
}

function loseGame() {
  goLocation(locations[6]);
}

function restartGame() {
  player.health = 100;
  player.attackPower = 2;
  player.defense = 0;
  player.gems = Math.floor(Math.random() * 10);
  healthText.innerText = player.health;
  attackPowerText.innerText = player.attackPower;
  defenseText.innerText = player.defense;
  gemsText.innerText = player.gems;
  mainText.innerText = 'Welcome to Werewolf Repeller. Your village is being approached by a vicious werewolf and needs urgent protection. The village is relying on you to defeat the werewolf. You are currently at the village. What approach would you like to take? Use buttons above.';
  goToVillage();
}