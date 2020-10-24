function Game(gameCanvas) {
  const canvas = gameCanvas;
  const canvasContext = canvas.getContext('2d');
  const keyboardListener = new window.KeyboardListener();
  const limitFps = 60;
  let currentFps = 0;

  this.entities = {
    player: new window.Player(),
    apple: new window.Apple(),
  };

  this.scoreCounter = new window.ScoreCounter();
  const collisionChecker = new window.CollisionChecker(this.entities);

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
      const { color, width, height } = window.canvasStyle;
      canvasContext.fillStyle = color;
      canvasContext.fillRect(0, 0, width, height);
    }

    drawBackground();

    this.entities.apple.render(canvasContext);
    this.entities.player.render(canvasContext);
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
}

window.Game = Game;