function HUD() {
  const displayers = [
    new FpsDisplayer(),
    new ScoreDisplayer(),
  ];

  this.initialize = function(game) {
    displayers.map(displayer => {
      if (displayer.initialize) {
        displayer.initialize(game);
      }
    })
  }

  this.render = function(canvasContext) {
    displayers.map(displayer => {
      if (displayer.render) {
        displayer.render(canvasContext);
      }
    })
  }
}
