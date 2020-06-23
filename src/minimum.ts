export function minimum(arr: number[][]): number {
  let result = Number.POSITIVE_INFINITY

  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr[x].length; y++) {
      result = min(x, y, result)
    }
  }
  return result

  function min(x: number, y: number, result: number): number {
    if (result > arr[x][y]) {
      result = arr[x][y]
    }
    return result
  }
}
