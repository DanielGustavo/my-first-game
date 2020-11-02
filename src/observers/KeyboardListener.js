function KeyboardListener(game) {
  const keypressListener = new KeypressListener();

  const pausableActions = {
    d: () => {
      game.entities.player.walk('right');
    },
    a: () => {
      game.entities.player.walk('left');
    },
    w: () => {
      game.entities.player.walk('up');
    },
    s: () => {
      game.entities.player.walk('down');
    },
    ArrowRight: () => pausableActions.d(),
    ArrowLeft: () => pausableActions.a(),
    ArrowUp: () => pausableActions.w(),
    ArrowDown: () => pausableActions.s(),
  };

  const unpausableActions = {
    Escape: () => {
      game.paused = !game.paused;
    },
  };

  this.start = function() {
    keypressListener.onKeyPress(({ key }) => {
      if (pausableActions[key]) {
        pausableActions[key]();
      }
    });

    document.addEventListener('keydown', ({ key }) => {
      if (unpausableActions[key]) {
        unpausableActions[key]();
      }
    });
  }

  this.tick = keypressListener.tick;
}
