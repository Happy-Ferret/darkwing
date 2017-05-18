const {classes: Cc, interfaces: Ci, utils: Cu, manager: Cm} = Components;
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/Console.jsm");
Cu.import("resource://gre/modules/ExtensionCommon.jsm");

let SingletonEventManager = ExtensionCommon.SingletonEventManager;
if (!SingletonEventManager) {
  Cu.import("resource://gre/modules/ExtensionUtils.jsm");
  SingletonEventManager = ExtensionUtils.SingletonEventManager
}

XPCOMUtils.defineLazyModuleGetter(this, "Foo", "resource://extension-darkwing-api/content/foo.jsm");

let foo = null

class API extends ExtensionAPI {
  getAPI(context) {
    return {
      darkwing: {

        async register() {
          return `${Foo.greeting}, add-on`;
        }

      },
      darkwing_v2: {

        onFoo: new SingletonEventManager(context, "darkwing.onFoo", fire => {
          console.log('yo!')
          foo = fire
          return () => { foo = null }
        }).api(),

        async register(id) {
          // throw new Error('fu')
          foo && foo.async()
          return `v2 ${Foo.greeting}, ${id}`;
        }
      }
    };
  }
}
