if (!browser.darkwing) {
  console.error('api not available')
  browser.notifications.create({
    type: 'basic',
    title: 'Please enable Test Pilot',
    message: 'see about:addons'
  })
} else {
  console.log('loading')
  const darkwing = browser.darkwing_v2
  darkwing.register(browser.runtime.id)
    .then(result =>
      browser.notifications.create({
        type: 'basic',
        title: 'Example Experiment',
        message: result
      })
    )
}
