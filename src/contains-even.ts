export function containsEven(arr: number[][]): boolean {
  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr[x].length; y++) {
      if (arr[x][y] % 2 === 0) {
        return true
      }
    }
  }
  return false
}
