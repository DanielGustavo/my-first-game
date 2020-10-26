function ScoreCounter() {
  const observers = [];
  let score = 0;

  function notifyObservers(message) {
    observers.map(observer => {
      observer(message);
    });
  }

  this.increaseScoreWhenPlayerCollideApple = function(message) {
    if (message.collisionType !== 'entity') return;

    const [entity1, entity2] = message.entities;

    if (
      entity1.getType() === 'Player' &&
      entity2.getType() === 'Apple'
    ) {
      score++;
      notifyObservers({
        type: 'score-increased',
        score,
      });
    }
  }

  this.addObserver = function(observer) {
    observers.push(observer);
  }
};
