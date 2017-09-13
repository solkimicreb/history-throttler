export function nextRender () {
  return new Promise(requestAnimationFrame)
}

export function pageLoad () {
  if (document.readyState === 'complete') {
    return Promise.resolve()
  }
  return new Promise(resolve => window.addEventListener('load', resolve))
}
