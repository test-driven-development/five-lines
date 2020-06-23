const TILE_SIZE = 30
const FPS = 30
const SLEEP = 1000 / FPS

enum Tile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE,
  FALLING_STONE,
  BOX,
  FALLING_BOX,
  KEY1,
  LOCK1,
  KEY2,
  LOCK2
}

enum Input {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

let player1 = 1
let player2 = 1

const map: Tile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2]
]

interface Input2 {
  isUp(): boolean
  isDown(): boolean
  isLeft(): boolean
  isRight(): boolean
}

class Right implements Input2 {
  isRight() {
    return true
  }
  isLeft() {
    return false
  }
  isUp() {
    return false
  }
  isDown() {
    return false
  }
}

class Left implements Input2 {
  isRight() {
    return false
  }
  isLeft() {
    return true
  }
  isUp() {
    return false
  }
  isDown() {
    return false
  }
}

class Up implements Input2 {
  isRight() {
    return false
  }
  isLeft() {
    return false
  }
  isUp() {
    return true
  }
  isDown() {
    return false
  }
}

class Down implements Input2 {
  isRight() {
    return false
  }
  isLeft() {
    return false
  }
  isUp() {
    return false
  }
  isDown() {
    return true
  }
}

const inputs: Input[] = []

function remove(tile: Tile) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === tile) {
        map[y][x] = Tile.AIR
      }
    }
  }
}

function moveToTile(x: number, y: number) {
  map[player2][player1] = Tile.AIR
  map[y][x] = Tile.PLAYER
  player1 = x
  player2 = y
}

function moveHorizontal(Δx: number) {
  if (
    map[player2][player1 + Δx] === Tile.FLUX ||
    map[player2][player1 + Δx] === Tile.AIR
  ) {
    moveToTile(player1 + Δx, player2)
  } else if (
    (map[player2][player1 + Δx] === Tile.STONE ||
      map[player2][player1 + Δx] === Tile.BOX) &&
    map[player2][player1 + Δx + Δx] === Tile.AIR &&
    map[player2 + 1][player1 + Δx] !== Tile.AIR
  ) {
    map[player2][player1 + Δx + Δx] = map[player2][player1 + Δx]
    moveToTile(player1 + Δx, player2)
  } else if (map[player2][player1 + Δx] === Tile.KEY1) {
    remove(Tile.LOCK1)
    moveToTile(player1 + Δx, player2)
  } else if (map[player2][player1 + Δx] === Tile.KEY2) {
    remove(Tile.LOCK2)
    moveToTile(player1 + Δx, player2)
  }
}

function moveVertical(dy: number) {
  if (
    map[player2 + dy][player1] === Tile.FLUX ||
    map[player2 + dy][player1] === Tile.AIR
  ) {
    moveToTile(player1, player2 + dy)
  } else if (map[player2 + dy][player1] === Tile.KEY1) {
    remove(Tile.LOCK1)
    moveToTile(player1, player2 + dy)
  } else if (map[player2 + dy][player1] === Tile.KEY2) {
    remove(Tile.LOCK2)
    moveToTile(player1, player2 + dy)
  }
}

function update() {
  handleInputs()
  updateMap()

  function handleInputs() {
    while (inputs.length > 0) {
      const current = inputs.pop()
      handleInput(current)
    }
  }

  function updateMap() {
    for (let y = map.length - 1; y >= 0; y--) {
      for (let x = 0; x < map[y].length; x++) {
        updateTile(y, x)
      }
    }
  }

  function handleInput(input: Input) {
    if (input === Input.LEFT) {
      moveHorizontal(-1)
    } else if (input === Input.RIGHT) {
      moveHorizontal(1)
    } else if (input === Input.UP) {
      moveVertical(-1)
    } else if (input === Input.DOWN) {
      moveVertical(1)
    }
  }

  function updateTile(y: number, x: number) {
    if (
      (map[y][x] === Tile.STONE || map[y][x] === Tile.FALLING_STONE) &&
      map[y + 1][x] === Tile.AIR
    ) {
      map[y + 1][x] = Tile.FALLING_STONE
      map[y][x] = Tile.AIR
    } else if (
      (map[y][x] === Tile.BOX || map[y][x] === Tile.FALLING_BOX) &&
      map[y + 1][x] === Tile.AIR
    ) {
      map[y + 1][x] = Tile.FALLING_BOX
      map[y][x] = Tile.AIR
    } else if (map[y][x] === Tile.FALLING_STONE) {
      map[y][x] = Tile.STONE
    } else if (map[y][x] === Tile.FALLING_BOX) {
      map[y][x] = Tile.BOX
    }
  }
}

function draw() {
  const g = createGraphics()

  drawMap(g)
  drawPlayer(g)

  function createGraphics() {
    const canvas = document.getElementById('GameCanvas') as HTMLCanvasElement
    const g = canvas.getContext('2d')

    g.clearRect(0, 0, canvas.width, canvas.height)
    return g
  }

  function drawMap(g: CanvasRenderingContext2D) {
    // Draw map
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === Tile.FLUX) {
          g.fillStyle = '#ccffcc'
        } else if (map[y][x] === Tile.UNBREAKABLE) {
          g.fillStyle = '#999999'
        } else if (
          map[y][x] === Tile.STONE ||
          map[y][x] === Tile.FALLING_STONE
        ) {
          g.fillStyle = '#0000cc'
        } else if (map[y][x] === Tile.BOX || map[y][x] === Tile.FALLING_BOX) {
          g.fillStyle = '#8b4513'
        } else if (map[y][x] === Tile.KEY1 || map[y][x] === Tile.LOCK1) {
          g.fillStyle = '#ffcc00'
        } else if (map[y][x] === Tile.KEY2 || map[y][x] === Tile.LOCK2) {
          g.fillStyle = '#00ccff'
        }

        if (map[y][x] !== Tile.AIR) {
          g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
        }
      }
    }
  }

  function drawPlayer(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ff0000'
    g.fillRect(player1 * TILE_SIZE, player2 * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }
}

function gameLoop() {
  const before = Date.now()
  update()
  draw()
  const after = Date.now()
  const frameTime = after - before
  const sleep = SLEEP - frameTime
  setTimeout(gameLoop, sleep)
}

window.onload = () => {
  gameLoop()
}

const LEFT_KEY = 37
const UP_KEY = 38
const RIGHT_KEY = 39
const DOWN_KEY = 40
window.addEventListener('keydown', e => {
  if (e.keyCode === LEFT_KEY || e.key === 'a') {
    inputs.push(Input.LEFT)
  } else if (e.keyCode === UP_KEY || e.key === 'w') {
    inputs.push(Input.UP)
  } else if (e.keyCode === RIGHT_KEY || e.key === 'd') {
    inputs.push(Input.RIGHT)
  } else if (e.keyCode === DOWN_KEY || e.key === 's') {
    inputs.push(Input.DOWN)
  }
})
