export default function (entityWidth, entityHeight) {
  const randomX = Math.random() * window.canvasStyle.width - entityWidth;
  const randomY = Math.random() * window.canvasStyle.height - entityHeight;

  const x = randomX <= 0 ? 0 : randomX;
  const y = randomY <= 0 ? 0 : randomY;

  return { x, y };
}
