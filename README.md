# Darkwing

A prototype for the Test Pilot addon as a hybrid WebExtension *and* WebExtension API Experiment

## What?!

The UI for the Test Pilot add-on is minimal, a single toolbar button. The main functionality is in providing services to experiments and collecting data. I imagine a `testpilot` web extension API could better serve our experiments than the current state of affairs. To spitball, an experiment could register for (or opt out of) specific services, like rating prompts.

```js

browser.testpilot.register({
  ratings: false,
  share: true
  //etc
}).then(
  info => {
    console.log(`testpilot id ${info.id}`)
    // continue add-on initialization
  },
  err => {
    // failed to register, inform the user and unload maybe
  }
)
```

We could also offer a nice A/B testing API. Maybe something like:

```js
const color = browser.testpilot.choose("red", "blue")
```

## Considerations

- Security
  - a `testpilot` API could expose sensitive interfaces not meant for general use. Therefore [Bugzilla #1280235](https://bugzilla.mozilla.org/show_bug.cgi?id=1280235) needs to land before we can consider this.
- Telemetry
  - We can prob offload much of (all?) our existing stuff to the upcoming [Telemetry WebExtension API](https://bugzilla.mozilla.org/show_bug.cgi?id=1280234).
