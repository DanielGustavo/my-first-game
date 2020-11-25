function Game(gameCanvas) {
  const canvas = gameCanvas;
  const canvasContext = canvas.getContext('2d');
  const keyboardListener = new KeyboardListener(this);
  const limitFps = 60;
  const HUDInstance = new HUD();
  const intervals = [];
  const timeouts = [];
  const availableModes = ['homeMenu', 'game', 'pauseMenu']
  let currentFps = 0;
  let mode = 'homeMenu';

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

  this.getMode = () => mode;

  this.setMode = (newMode) => {
    if (!availableModes.includes(newMode)) {
      throw new Error(`'${newMode}' isn't an available mode`);
    }

    const previousModeMenu = document.querySelector(`section.${mode}`);
    if (previousModeMenu) {
      previousModeMenu.style.visibility = 'hidden';
    }

    const nextModeMenu = document.querySelector(`section.${newMode}`);
    if (nextModeMenu) {
      nextModeMenu.style.visibility = 'visible';
    }

    mode = newMode;
  }

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

  const update = () => {
    if (mode === 'game') {
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

  const render = () => {
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
      update();
      render();
    }, fpsPerSecond);
  }

  HUDInstance.initialize(this);
}
