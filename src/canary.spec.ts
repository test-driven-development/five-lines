import 'should'
import {containsEven} from './contains-even'
import {minimum} from './minimum'

test(`containsEven`, () => {
  containsEven([[1, 2]]).should.be.true()
})

test(`minimum`, () => {
  minimum([[1, 2]]).should.equal(1)
})
