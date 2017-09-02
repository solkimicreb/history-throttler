const originalPushState = history.pushState
let statePushedInCurrentTick = false

export default function pushState () {
  if (!statePushedInCurrentTick && document.readyState === 'completed') {
    // allow pushState if it is the first one since the last paint and the document is loaded
    originalPushState.apply(history, arguments)
    flagOn()
    requestAnimationFrame(flagOff)
  } else {
    // replace it with replaceState if it is not the first one
    history.replaceState.apply(history, arguments)
  }
}

function flagOn () {
  statePushedInCurrentTick = true
}

function flagOff () {
  statePushedInCurrentTick = false
}
