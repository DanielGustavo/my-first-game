function Apple(game) {
  const width = 18;
  const height = 18;
  const color = '#ff0000';
  const initialTeleportIntervalInMilliseconds = 3000;
  let teleportIntervalInMilliseconds = initialTeleportIntervalInMilliseconds;
  let x = 0;
  let y = 0;
  initialize();

  this.getX = () => x;
  this.getY = () => y;
  this.getWidth = () => width;
  this.getHeight = () => height;

  function setRandomPosition() {
    const gameCanvas = game.getCanvas();

    const { x: randomX, y: randomY } = generateRandomPosition({
      gameCanvas,
      entityWidth: width,
      entityHeight: height,
    });

    x = randomX;
    y = randomY;
  }

  function teleportToRandomPositionInAnInterval() {
    parent.teleportInterval = game.setInterval(() => {
      setRandomPosition();
    }, teleportIntervalInMilliseconds);
  }

  function initialize() {
    setRandomPosition();
    teleportToRandomPositionInAnInterval();
  }

  this.handleCollision = function(entityType) {
    if (entityType === 'Player') {
      setRandomPosition();
      parent.teleportInterval.restart();
    }
  }

  this.render = function(canvasContext) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
  }

  this.changeTeleportIntervalAccordingToTheCurrentPlayersSpeed = function({
    speed,
    type
  }) {
    const playerSpeedDidntChange = !(
      type !== 'increased-speed' ||
      type !== 'decreased-speed'
    );

    if (playerSpeedDidntChange) return;

    const proportionCalculusOfTeleportIntervalAndPlayerSpeed = (
      initialTeleportIntervalInMilliseconds
      * game.entities.player.getInitalSpeed()
    ) / speed;

    teleportIntervalInMilliseconds = proportionCalculusOfTeleportIntervalAndPlayerSpeed;

    parent.teleportInterval.changeMilliseconds(teleportIntervalInMilliseconds);
  }
}
