browser.darkwing.register(browser.runtime.id).then(
  message => console.log(`darkwing: "${message}"`)
);

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({url: 'https://testpilot.firefox.com'})
})

let experiments = {}

function checkForUpdates() {
  fetch('https://testpilot.firefox.com/api/experiments.json')
    .then(res => {
      if (res.ok) {
        const xs = res.json()
        // TODO check if new experiments. if so show badge
        experiments = xs
      }
    })
}

setInterval(checkForUpdates, 1000 * 60 * 60 * 12)
