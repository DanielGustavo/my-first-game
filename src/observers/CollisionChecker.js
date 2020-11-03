function CollisionChecker(collidableObjects) {
  const observers = [];

  function notifyObservers(message) {
    observers.map(observer => {
      observer(message);
    });
  }

  function getObjectCorners(object) {
    return {
      left: object.getX(),
      right: object.getX() + object.getWidth(),
      down: object.getY() + object.getHeight(),
      up: object.getY()
    };
  }

  function checkCollisionBetweenObjects(object1Corners, object2Corners) {
    return (
      object1Corners.down >= object2Corners.up &&
      object1Corners.left <= object2Corners.right &&
      object1Corners.up <= object2Corners.down &&
      object1Corners.right >= object2Corners.left
    );
  }

  function notifyCollisionBetweenObjects() {
    const objectsArray = Object.entries(collidableObjects).map(object => object[1]);

    objectsArray.map((object, index) => {
      const objectCorners = getObjectCorners(object);
      const nextObjectsArray = objectsArray.slice(index + 1);

      nextObjectsArray.map(object2 => {
        const object2Corners = getObjectCorners(object2);
        const collided = checkCollisionBetweenObjects(objectCorners, object2Corners);

        if (collided) {
          const object2Name = object2.constructor.name;
          const objectName = object.constructor.name;

          if (object.handleCollision) {
            object.handleCollision(object2Name);
          }
          if (object2.handleCollision) {
            object2.handleCollision(objectName);
          }

          notifyObservers({
            objects: [object, object2],
            objectsNames: [objectName, object2Name],
            collisionType: 'collidableObjects',
          });
        }
      });
    });
  }

  function notifyBoundaryCollision() {
    const objectsArray = Object.entries(collidableObjects).map(object => object[1]);

    objectsArray.map(object => {
      const objectCorners = getObjectCorners(object);

      const collidingSides = {
        up: objectCorners.up <= 0,
        down: objectCorners.down >= gameCanvas.height,
        left: objectCorners.left <= 0,
        right: objectCorners.right >= gameCanvas.width,
      };

      const collided = collidingSides.up || collidingSides.down ||
        collidingSides.left || collidingSides.right;

      if (object.handleBoundariesCollision) {
        object.handleBoundariesCollision(collidingSides);

        if (collided) {
          notifyObservers({
            objects: [object],
            objectsNames: [object.constructor.name],
            collisionType: 'boundary',
          });
        }
      }
    });
  }

  this.update = function() {
    notifyCollisionBetweenObjects();
    notifyBoundaryCollision();
  }

  this.addObserver = function(observer) {
    observers.push(observer);
  }
}
