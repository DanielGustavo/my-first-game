function KeyboardListener() {
  const keypressListener = new KeypressListener();

  const actions = {
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
    ArrowRight: () => actions.d(),
    ArrowLeft: () => actions.a(),
    ArrowUp: () => actions.w(),
    ArrowDown: () => actions.s(),
  };

  this.start = function() {
    keypressListener.onKeyPress(({ key }) => {
      if (actions[key]) {
        actions[key]();
      }
    });
  }

  this.tick = keypressListener.tick;
}
