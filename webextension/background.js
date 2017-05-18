browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({url: 'https://testpilot.firefox.com'})
})

let experiments = {}

function checkForUpdates() {
  fetch('https://testpilot.firefox.com/api/experiments.json')
    .then(res => res.json())
    .then(json => {
      // TODO check for new experiments. if so show badge
      experiments = json
      console.log(json)
      browser.storage.local.set({experiments})
    })
}

browser.storage.local.get('experiments')
  .then(xs => {
    experiments = xs
  },
  err => {
    // not found
  })
  .then(checkForUpdates)

setInterval(checkForUpdates, 1000 * 60 * 60 * 12)
