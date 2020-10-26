function KeyboardListener() {
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
    kd.Key.prototype.down(({ key }) => {
      if (actions[key]) {
        actions[key]();
      }
    });

    kd.run(() => {
      kd.tick();
    });
  }
}
