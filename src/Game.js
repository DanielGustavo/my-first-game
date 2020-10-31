function Game(gameCanvas) {
  const canvas = gameCanvas;
  const canvasContext = canvas.getContext('2d');
  const keyboardListener = new KeyboardListener(this);
  const limitFps = 60;
  const HUDInstance = new HUD();
  let currentFps = 0;

  this.getCanvas = () => canvas;

  this.entities = {
    player: new Player(this),
    apple: new Apple(this),
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
    keyboardListener.tick();
  }

  this.render = function() {
    function drawBackground() {
      canvasContext.fillStyle = canvas.style.background;
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
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
