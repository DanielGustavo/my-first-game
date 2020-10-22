function Apple() {
  const width = 18;
  const height = 18;
  let x = 0;
  let y = 0;
  const color = '#ff0000';
  const type = 'Apple';
  initialize();

  this.getX = () => x;
  this.getY = () => y;
  this.getWidth = () => width;
  this.getHeight = () => height;
  this.getType = () => type;

  function setRandomPosition() {
    const { x: randomX, y: randomY } = generateRandomPosition(width, height);
    x = randomX;
    y = randomY;
  }

  this.handleCollision = function(entityType) {
    if (entityType === 'Player') {
      setRandomPosition();
    }
  }

  function initialize() {
    setRandomPosition();
  }

  this.render = function(canvasContext) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
  }
}

window.Apple = Apple;
