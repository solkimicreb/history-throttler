import pushState from './throttleHistory'
import { expect } from 'chai'

describe('throttle history', () => {
  const firstState = { prop: 'first' }
  const secondState = { prop: 'second' }
  const thirdState = { prop: 'third' }
  const fourthState = { prop: 'fourth' }

  it('should allow the first pushState call after a repaint', () => {
    expect(history.length).to.equal(1)
    pushState(firstState, '', '')
    expect(history.length).to.equal(2)
    expect(history.state).to.deep.equal(firstState)
  })

  it('should throttle later pushStates by replacing them by replaceState', () => {
    pushState(secondState, '', '')
    pushState(thirdState, '', '')
    expect(history.length).to.equal(2)
    expect(history.state).to.deep.equal(thirdState)
  })

  it('should allow a new pushState after a repaint', (done) => {
    requestAnimationFrame(() => {
      pushState(fourthState, '', '')
      expect(history.length).to.equal(3)
      expect(history.state).to.deep.equal(fourthState)
      done()
    })
  })
})
