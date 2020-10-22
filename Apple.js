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
    const randomX = Math.random() * window.canvasStyle.width - width;
    const randomY = Math.random() * window.canvasStyle.width - height;

    x = randomX <= 0 ? 0 : randomX;
    y = randomY <= 0 ? 0 : randomY;
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
