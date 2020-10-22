function Player() {
  const width = 18;
  const height = 18;
  const color = '#000';
  const type = 'Player';
  const ableToWalk = {
    up: true,
    down: true,
    left: true,
    right: true,
  };
  let x = 0;
  let y = 0;
  let speed = 3;
  initialize();

  this.getX = () => x;
  this.getY = () => y;
  this.getWidth = () => width;
  this.getHeight = () => height;
  this.getType = () => type;

  function initialize() {
    function setRandomPosition() {
      const randomX = Math.random() * window.canvasStyle.width - width;
      const randomY = Math.random() * window.canvasStyle.width - height;

      x = randomX <= 0 ? 0 : randomX;
      y = randomY <= 0 ? 0 : randomY;
    }

    setRandomPosition();
  }

  function increaseSpeedTemporarily() {
    const valueToIncrease = 2;
    speed += valueToIncrease;

    setTimeout(() => {
      speed -= valueToIncrease;
    }, 3000);
  }

  this.handleBoundariesCollision = function(collidingSides) {
    const sidesHandlingFunctions = {
      up: () => y = 0,
      down: () => y = window.canvasStyle.height - height,
      left: () => x = 0,
      right: () => x = window.canvasStyle.width - width
    };

    Object.entries(collidingSides).map(([side, collided]) => {
      ableToWalk[side] = !collided;

      if (sidesHandlingFunctions[side] && collided) {
        sidesHandlingFunctions[side]();
      }
    });
  }

  this.handleCollision = function(entityType) {
    if (entityType === 'Apple') {
      increaseSpeedTemporarily();
    }
  }

  this.walk = function(direction) {
    const movements = {
      right: () => {
        if (!ableToWalk.right) return;
        x += speed;
      },
      left: () => {
        if (!ableToWalk.left) return;
        x -= speed;
      },
      up: () => {
        if (!ableToWalk.up) return;
        y -= speed;
      },
      down: () => {
        if (!ableToWalk.down) return;
        y += speed;
      }
    }

    if (movements[direction]) {
      movements[direction]();
    }
  }

  this.render = function(canvasContext) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
  }
}

window.Player = Player;
