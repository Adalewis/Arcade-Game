// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 510) {
        let allEnemies = [];
        this.x = 0;
    }
    this.collision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



var Player = function() {
    this.x = 200;
    this.y = 300;
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.handleInput = function(direction) {
  if(direction == 'left') {
      player.x -= 50;
    } else if (direction == 'up') {
        player.y -= 50;
    } else if (direction == 'right') {
        player.x += 50;
    } else if (direction == 'down') {
        player.y += 50;
    } else {
        console.log("waiting to move");
}
};
Player.prototype.update = function(dt) {
    let modal = document.querySelector(".modal");
    let h1 = modal.querySelector("h1");
    if (player.y < 0) {
      console.log("reached end")
      player.x = 200;
      player.y = 300;
      //To display Modal after reaching water.
      modal.style.display = "block";
      h1.innerHTML = "Congratulations, you have won!";
    }
    //Prevents player from going off screen.
    if (player.x < 0) {
      player.x = 200;
      player.y = 300;
    }
    if (player.x > 499) {
      player.x = 200;
      player.y = 300;
    }
    if (player.y > 450) {
      player.x = 200;
      player.y = 300;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// Instantiate your objects.
// Places all enemy objects in an array called allEnemies

let allEnemies = [];
allEnemies.push(new Enemy());
//Creates multiple enemies with varying speeds.
for (var i = 0; i < 6; i++){
    allEnemies.push(new Enemy(0, 50 + (30 * i),10 + 25 * (Math.floor(Math.random() * 10))));
}
// Places the player object in a variable called player
let player = new Player();




//Circle collision hitbox detection from
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.collision = function() {
  var circle1 = {
    radius: 20,
    x: player.x,
    y: player.y
  };
  var circle2 = {
    radius: 20,
    x: this.x,
    y: this.y
  };
  var dx = circle1.x - circle2.x;
  var dy = circle1.y - circle2.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  //Player goes back to starting line.
  if (distance < circle1.radius + circle2.radius) {
    console.log("you lost");
    lives -= 1;
    player.x = 200;
    player.y = 300;

    }
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Used to close modal.
const close = document.querySelector(".close");
close.addEventListener("click", function() {
   modal.style.display = "none";
});
