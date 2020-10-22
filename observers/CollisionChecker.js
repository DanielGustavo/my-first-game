function CollisionChecker(entities) {
  const entitiesArray = Object.entries(entities).map(entity => entity[1]);

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
        }
      });
    });
  }

  function notifyBoundaryCollision() {
    entitiesArray.map(entity => {
      const entityCorners = getEntityCorners(entity);

      const collidingSides = {
        up: entityCorners.up <= 0,
        down: entityCorners.down >= window.canvasStyle.height,
        left: entityCorners.left <= 0,
        right: entityCorners.right >= window.canvasStyle.width,
      };

      if (entity.handleBoundariesCollision) {
        entity.handleBoundariesCollision(collidingSides);
      }
    });
  }

  this.update = function() {
    notifyCollisionBetweenEntities();
    notifyBoundaryCollision();
  }
}

window.CollisionChecker = CollisionChecker;
