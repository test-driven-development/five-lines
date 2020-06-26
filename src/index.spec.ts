import 'should'
import {fireEvent} from '@testing-library/dom'
import * as td from 'testdouble'
import {
  handleInputs,
  moveVertical,
  moveHorizontal,
  move,
  Input,
  inputs,
  LEFT_KEY,
  UP_KEY,
  RIGHT_KEY,
  DOWN_KEY,
  shouldGoLeft,
  shouldGoUp,
  shouldGoDown,
  shouldGoRight
} from './index'

const {func, verify, matchers, reset} = td

test(`tests infrastructure works`, () => {
  true.should.be.true()
})

test(`down`, () => {
  const moveHorizontally = func(moveHorizontal)
  const moveVertically = func(moveVertical)
  inputs.push(Input.DOWN)
  handleInputs(inputs, moveHorizontally, moveVertically)
  verify(moveHorizontally(matchers.anything()), {times: 0})
  verify(moveVertically(matchers.anything()), {times: 1})
  reset()
})

test(`up`, () => {
  const moveHorizontally = func(moveHorizontal)
  const moveVertically = func(moveVertical)
  inputs.push(Input.UP)
  handleInputs(inputs, moveHorizontally, moveVertically)
  verify(moveHorizontally(matchers.anything()), {times: 0})
  verify(moveVertically(matchers.anything()), {times: 1})
  reset()
})

test(`right`, () => {
  const moveHorizontally = func(moveHorizontal)
  const moveVertically = func(moveVertical)
  inputs.push(Input.RIGHT)
  handleInputs(inputs, moveHorizontally, moveVertically)
  verify(moveHorizontally(matchers.anything()), {times: 1})
  verify(moveVertically(matchers.anything()), {times: 0})
  reset()
})

test(`left`, () => {
  const moveHorizontally = func(moveHorizontal)
  const moveVertically = func(moveVertical)
  inputs.push(Input.LEFT)
  handleInputs(inputs, moveHorizontally, moveVertically)
  verify(moveHorizontally(matchers.anything()), {times: 1})
  verify(moveVertically(matchers.anything()), {times: 0})
  reset()
})

test(`no input`, () => {
  const moveHorizontally = func(moveHorizontal)
  const moveVertically = func(moveVertical)
  handleInputs(inputs, moveHorizontally, moveVertically)
  verify(moveHorizontally(matchers.anything()), {times: 0})
  verify(moveVertically(matchers.anything()), {times: 0})
  reset()
})

test(`moveUp`, done => {
  inputs.length.should.equal(0)
  window.addEventListener('keydown', getKeyCode)

  function getKeyCode(e) {
    window.removeEventListener('keydown', getKeyCode)
    move(e)
    inputs.map(x => x.should.equal(Input.UP))
    inputs.pop()
    done()
  }

  fireEvent.keyDown(window, {key: UP_KEY, code: UP_KEY})
})

test(`moveDown`, done => {
  inputs.length.should.equal(0)
  window.addEventListener('keydown', getKeyCode)

  function getKeyCode(e) {
    window.removeEventListener('keydown', getKeyCode)
    move(e)
    inputs.map(x => x.should.equal(Input.DOWN))
    inputs.pop()
    done()
  }

  fireEvent.keyDown(window, {key: DOWN_KEY, code: DOWN_KEY})
})

test(`moveLeft`, done => {
  inputs.length.should.equal(0)
  window.addEventListener('keydown', getKeyCode)

  function getKeyCode(e) {
    window.removeEventListener('keydown', getKeyCode)
    move(e)
    inputs.map(x => x.should.equal(Input.LEFT))
    inputs.pop()
    done()
  }

  fireEvent.keyDown(window, {key: LEFT_KEY, code: LEFT_KEY})
})

test(`moveRight`, done => {
  inputs.length.should.equal(0)
  window.addEventListener('keydown', getKeyCode)

  function getKeyCode(e) {
    window.removeEventListener('keydown', getKeyCode)
    move(e)
    inputs.map(x => x.should.equal(Input.RIGHT))
    inputs.pop()
    done()
  }

  fireEvent.keyDown(window, {key: RIGHT_KEY, code: RIGHT_KEY})
})

test(`shouldGoDown`, done => {
  window.addEventListener('keydown', down)

  function down(e) {
    window.removeEventListener('keydown', down)
    shouldGoDown(e).should.be.true()
    done()
  }

  fireEvent.keyDown(window, {key: DOWN_KEY, code: DOWN_KEY})
})

test(`shouldGoUp`, done => {
  window.addEventListener('keydown', up)

  function up(e) {
    window.removeEventListener('keydown', up)
    shouldGoUp(e).should.be.true()
    done()
  }

  fireEvent.keyDown(window, {key: UP_KEY, code: UP_KEY})
})

test(`shouldGoLeft`, done => {
  window.addEventListener('keydown', left)

  function left(e) {
    window.removeEventListener('keydown', left)
    shouldGoLeft(e).should.be.true()
    done()
  }

  fireEvent.keyDown(window, {key: LEFT_KEY, code: LEFT_KEY})
})

test(`shouldGoRight`, done => {
  window.addEventListener('keydown', right)

  function right(e) {
    window.removeEventListener('keydown', right)
    shouldGoRight(e).should.be.true()
    done()
  }

  fireEvent.keyDown(window, {key: RIGHT_KEY, code: RIGHT_KEY})
})
