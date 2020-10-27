function ScoreDisplayer() {
  const state = {
    score: 0,
  };

  this.initialize = function(game) {
    game.scoreCounter.addObserver(({ score }) => {
      state.score = score;
    })
  }

  this.render = function(canvasContext) {
    const text = `points: ${state.score}`;

    const axes = {
      x: gameCanvas.width - 5,
      y: 20,
    };

    canvasContext.font = '20px Grandstander';
    canvasContext.textAlign = 'right';
    canvasContext.fillStyle = '#ff9000';
    canvasContext.fillText(text, axes.x, axes.y);
  }
}
