const binarySearch = (arr: number[], x: number): number => {
  let l = -1;
  let h = arr.length;
  let m: number = -1;
  while (l + 1 != h) {
    m = (l + h) >> 1;
    if (arr[m] <= x) l = m;
    else h = m;
  }
  return m;
};

function sequencialSearch<Type>(arr: Type[], x: Type) {
  let i = 0;
  while (i < arr.length && !(arr[i] === x)) i++;
  return i == arr.length ? -1 : i;
}