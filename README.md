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

## Code

- [api.js](/api.js) implements the webextension API for use by Test Pilot experiments
- [schema.json](/schema.json) defines the API implemented by `api.js`
- [bootstrap.js](/bootstrap.js) loads the API and embedded webextension for the Test Pilot button
- [webextension/](/webextension/) the embedded Test Pilot webextension whose button opens testpilot.firefox.com
- [example_experiment](/example_experiment/) an example Experiment webextension that uses the API specified by `schema.json`
- [content/](/content/) contains XPCOM modules used by `api.js`

## Running this code

To run these addons open `about:debugging` and `Load Temporary Add-on` in a non-release Firefox build. Choose `install.rdf` (in this directory) to load the Test Pilot API add-on. You should see a new toolbar button if it worked. Next, load the `example_experiment/manifest.json` in the same way. You should see a browser notification if it worked.

## Considerations

- Security
  - a `testpilot` API could expose sensitive interfaces not meant for general use. Therefore [Bugzilla #1280235](https://bugzilla.mozilla.org/show_bug.cgi?id=1280235) needs to land before we can consider this.
- Telemetry
  - We can prob offload much of (all?) our existing stuff to the upcoming [Telemetry WebExtension API](https://bugzilla.mozilla.org/show_bug.cgi?id=1280234).
