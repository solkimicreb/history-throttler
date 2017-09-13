import { expect } from 'chai'
import pushState from '../src/throttleHistory'
import { pageLoad, nextRender } from './utils'

describe('do not allow push state before the load event', () => {
  // 'it' blocks run after the page load, so this must remain here
  const startLength = history.length
  pushState(undefined, '', '')
  expect(history.length).to.equal(startLength)
})

describe('throttle history', () => {
  before(async () => {
    await pageLoad()
  })

  it('should allow the first pushState call after a repaint', () => {
    const startLength = history.length
    pushState(undefined, '', '')
    expect(history.length).to.equal(startLength + 1)
  })

  it('should throttle later pushStates by replacing them by replaceState', () => {
    const startLength = history.length
    pushState(undefined, '', '')
    pushState(undefined, '', '')
    expect(history.length).to.equal(startLength)
  })

  it('should allow a new pushState after a repaint', async () => {
    const startLength = history.length
    pushState(undefined, '', '')
    expect(history.length).to.equal(startLength)

    await nextRender()
    pushState(undefined, '', '')
    expect(history.length).to.equal(startLength + 1)
  })
})
