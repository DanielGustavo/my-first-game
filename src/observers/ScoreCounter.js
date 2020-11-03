function ScoreCounter() {
  const observers = [];
  let score = 0;

  function notifyObservers(message) {
    observers.map(observer => {
      observer(message);
    });
  }

  this.increaseScoreWhenPlayerCollideApple = function(message) {
    if (message.collisionType !== 'collidableObjects') return;

    const playerCollidedApple = message.objectsNames.includesAll(['Apple', 'Player']);

    if (playerCollidedApple) {
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
