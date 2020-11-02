function Game(gameCanvas) {
  const canvas = gameCanvas;
  const canvasContext = canvas.getContext('2d');
  const keyboardListener = new KeyboardListener(this);
  const limitFps = 60;
  const HUDInstance = new HUD();
  const intervals = [];
  const timeouts = [];
  let currentFps = 0;

  this.paused = false;

  this.setTimeout = (callback, milliseconds) => {
    const timeout = {
      amountOfFramesToExecuteCallback: (milliseconds * limitFps) / 1000,
      currentFrame: 0,
      tick: () => {
        const reachedLimitOfFrames = timeout.currentFrame >= timeout.amountOfFramesToExecuteCallback;

        if (reachedLimitOfFrames) {
          callback();
          timeout.cancel();
        } else {
          timeout.currentFrame++;
        }
      },
      cancel: () => {
        timeouts.forEach((currentTimeout, index) => {
          if (currentTimeout === timeout) {
            timeouts.splice(index, 1);
          }
        });
      }
    };

    timeouts.push(timeout);
  }

  this.setInterval = (callback, milliseconds) => {
    const interval = {
      amountOfFramesToExecuteCallback: (milliseconds * limitFps) / 1000,
      currentFrame: 0,
      tick: () => {
        const reachedLimitOfFrames = interval.currentFrame >= interval.amountOfFramesToExecuteCallback;

        if (reachedLimitOfFrames) {
          callback();
          interval.currentFrame = 0;
        } else {
          interval.currentFrame++;
        }
      },
      restart: () => {
        interval.currentFrame = 0;
      },
      changeMilliseconds: (newMilliseconds) => {
        interval.amountOfFramesToExecuteCallback = (newMilliseconds * limitFps) / 1000;
      }
    };

    intervals.push(interval);
    return interval;
  }

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
    if (!this.paused) {
      collisionChecker.update();
      keyboardListener.tick();

      intervals.forEach((interval) => {
        interval.tick();
      });

      timeouts.forEach((timeout) => {
        timeout.tick();
      });
    }
  }

  this.render = function() {
    function drawBackground() {
      canvasContext.fillStyle = canvas.style.background;
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (!this.paused) {
      drawBackground();
      this.entities.apple.render(canvasContext);
      this.entities.player.render(canvasContext);
      HUDInstance.render(canvasContext);
    }
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
