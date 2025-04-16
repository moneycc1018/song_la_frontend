// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function shuffle(array: Array<any>) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 隨機索引
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // 交換
  }
  return newArray;
}

export function arraysHaveSameElements(a: Array<string | number>, b: Array<string | number>): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, index) => val === sortedB[index]);
}
