function FpsDisplayer() {
  const state = {
    fps: 0,
  };

  this.initialize = function(game) {
    game.checkFps((fps) => {
      state.fps = fps;
    });
  }

  this.render = function(canvasContext) {
    const text = `Fps: ${state.fps}`;

    const axes = {
      x: 5,
      y: 20,
    };

    canvasContext.font = '20px Grandstander';
    canvasContext.textAlign = 'left';
    canvasContext.fillText(text, axes.x, axes.y);
  }
}
