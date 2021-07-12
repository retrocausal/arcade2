export function shuffle(rangeCeil, indices) {
  const randos = new Set();
  while (randos.size < indices) {
    const n = Math.round(Math.random() * rangeCeil);
    randos.add(n);
  }
  return [...randos.values()];
}
