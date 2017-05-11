const {classes: Cc, interfaces: Ci, utils: Cu, manager: Cm} = Components;
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

XPCOMUtils.defineLazyModuleGetter(this, "Foo", "resource://extension-darkwing-api/content/foo.jsm");

class API extends ExtensionAPI {
  getAPI(context) {
    return {
      darkwing: {
        async register(id) {
          return `${Foo.name}, ${id}`;
        }
      }
    };
  }
}
