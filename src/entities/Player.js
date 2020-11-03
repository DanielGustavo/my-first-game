function Player(game) {
  const width = 18;
  const height = 18;
  const color = '#000';
  const ableToWalk = {
    up: true,
    down: true,
    left: true,
    right: true,
  };
  const observers = [];
  const initialSpeed = 3;
  let x = 0;
  let y = 0;
  let speed = initialSpeed;
  initialize();

  this.getX = () => x;
  this.getY = () => y;
  this.getWidth = () => width;
  this.getHeight = () => height;
  this.getInitalSpeed = () => initialSpeed;

  function initialize() {
    function setRandomPosition() {
      const gameCanvas = game.getCanvas();

      const { x:randomX, y:randomY } = generateRandomPosition({
        gameCanvas,
        entityWidth: width,
        entityHeight: height,
      });

      x = randomX;
      y = randomY;
    }

    setRandomPosition();
  }

  function increaseSpeedTemporarily() {
    const valueToIncrease = 2;
    speed += valueToIncrease;

    notifyObservers({
      type: 'increased-speed',
      speed,
    });

    game.setTimeout(() => {
      speed -= valueToIncrease;

      notifyObservers({
        type: 'decreased-speed',
        speed,
      });
    }, 5000);
  }

  function notifyObservers(message) {
    observers.map((observer) => {
      observer(message);
    });
  }

  this.handleBoundariesCollision = function(collidingSides) {
    const sidesHandlingFunctions = {
      up: () => y = 0,
      down: () => y = gameCanvas.height - height,
      left: () => x = 0,
      right: () => x = gameCanvas.width - width
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
      playAudio('./static/assets/sounds/collect-sound.mp3');
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

  this.addObserver = function(observer) {
    observers.push(observer);
  }
}
