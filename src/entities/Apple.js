function Apple() {
  const width = 18;
  const height = 18;
  const type = 'Apple';
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
  this.getType = () => type;

  function setRandomPosition() {
    const { x: randomX, y: randomY } = generateRandomPosition(width, height);
    x = randomX;
    y = randomY;
  }

  function teleportToRandomPositionInAnInterval() {
    parent.teleportInterval = setInterval(() => {
      setRandomPosition();
    }, teleportIntervalInMilliseconds);
  }

  function restartTeleportInterval() {
    clearInterval(parent.teleportInterval);
    teleportToRandomPositionInAnInterval();
  }

  function initialize() {
    setRandomPosition();
    teleportToRandomPositionInAnInterval();
  }

  this.handleCollision = function(entityType) {
    if (entityType === 'Player') {
      setRandomPosition();
      restartTeleportInterval();
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
      * window.game.entities.player.getInitalSpeed()
    ) / speed;

    teleportIntervalInMilliseconds = proportionCalculusOfTeleportIntervalAndPlayerSpeed;

    if (type === 'decreased-speed') restartTeleportInterval();
  }
}

window.Apple = Apple;
