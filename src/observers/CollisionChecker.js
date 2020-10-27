function CollisionChecker(entities) {
  const observers = [];
  const entitiesArray = Object.entries(entities).map(entity => entity[1]);

  function notifyObservers(message) {
    observers.map(observer => {
      observer(message);
    });
  }

  function getEntityCorners(entity) {
    return {
      left: entity.getX(),
      right: entity.getX() + entity.getWidth(),
      down: entity.getY() + entity.getHeight(),
      up: entity.getY()
    };
  }

  function checkCollisionBetweenEntities(entity1Corners, entity2Corners) {
    return (
      entity1Corners.down >= entity2Corners.up &&
      entity1Corners.left <= entity2Corners.right &&
      entity1Corners.up <= entity2Corners.down &&
      entity1Corners.right >= entity2Corners.left
    );
  }

  function notifyCollisionBetweenEntities() {
    entitiesArray.map((entity, index) => {
      const entityCorners = getEntityCorners(entity);
      const nextEntitiesArray = entitiesArray.slice(index + 1);

      nextEntitiesArray.map(nextEntity => {
        const nextEntitycorners = getEntityCorners(nextEntity);
        const colided = checkCollisionBetweenEntities(entityCorners, nextEntitycorners);

        if (colided) {
          if (entity.handleCollision) entity.handleCollision(nextEntity.getType());
          if (nextEntity.handleCollision) nextEntity.handleCollision(entity.getType());

          notifyObservers({
            entities: [entity, nextEntity],
            collisionType: 'entity',
          });
        }
      });
    });
  }

  function notifyBoundaryCollision() {
    entitiesArray.map(entity => {
      const entityCorners = getEntityCorners(entity);

      const collidingSides = {
        up: entityCorners.up <= 0,
        down: entityCorners.down >= gameCanvas.height,
        left: entityCorners.left <= 0,
        right: entityCorners.right >= gameCanvas.width,
      };

      const collided = collidingSides.up || collidingSides.down ||
        collidingSides.left || collidingSides.right;

      if (entity.handleBoundariesCollision) {
        entity.handleBoundariesCollision(collidingSides);

        if (collided) {
          notifyObservers({
            entities: [entity],
            collisionType: 'boundary',
          });
        }
      }
    });
  }

  this.update = function() {
    notifyCollisionBetweenEntities();
    notifyBoundaryCollision();
  }

  this.addObserver = function(observer) {
    observers.push(observer);
  }
}
