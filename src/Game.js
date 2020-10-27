function Game(gameCanvas) {
  const canvas = gameCanvas;
  const canvasContext = canvas.getContext('2d');
  const keyboardListener = new KeyboardListener();
  const limitFps = 60;
  const HUDInstance = new HUD();
  let currentFps = 0;

  this.entities = {
    player: new Player(),
    apple: new Apple(),
  };

  this.scoreCounter = new ScoreCounter();
  const collisionChecker = new CollisionChecker(this.entities);

  const initialize = () => {
    keyboardListener.start();

    this.entities.player.addObserver(
      this.entities.apple.changeTeleportIntervalAccordingToTheCurrentPlayersSpeed
    );

    collisionChecker.addObserver(this.scoreCounter.increaseScoreWhenPlayerCollideApple);
  }

  initialize();

  this.update = function() {
    collisionChecker.update();
  }

  this.render = function() {
    function drawBackground() {
      canvasContext.fillStyle = gameCanvas.style.background;
      canvasContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    }

    drawBackground();

    this.entities.apple.render(canvasContext);
    this.entities.player.render(canvasContext);
    HUDInstance.render(canvasContext);
  }

  this.checkFps = function(observerFunction) {
    const fpsPerSecond = 1000/limitFps;
    const limitTime = fpsPerSecond * limitFps;

    setInterval(() => {
      currentFps++;
    }, fpsPerSecond);

    setInterval(() => {
      observerFunction(currentFps);
      currentFps = 0;
    }, limitTime);
  }

  this.startGameLoop = function() {
    const fpsPerSecond = 1000/limitFps;

    setInterval(() => {
      this.update();
      this.render();
    }, fpsPerSecond);
  }

  HUDInstance.initialize(this);
}
