// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"63391e74c092396b97cd2042a8695493":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "0ed53df1fea3f437ff67dc5ee3ea6fdf"; /* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets;

// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);

      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }

      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}
},{}],"b5864bd242e4a1e7a6e23d1a63a004cc":[function(require,module,exports) {
require('./bundle-manifest').register(JSON.parse("{\"ff67dc5ee3ea6fdf\":\"controller.0ed53df1.js\",\"c0e2b7630833080c\":\"icons.3103f6c1.svg\"}"));
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ba8df6b71e73837c465d69bebde6e64d":[function(require,module,exports) {
"use strict";

var mapping = {};

function register(pairs) {
  var keys = Object.keys(pairs);

  for (var i = 0; i < keys.length; i++) {
    mapping[keys[i]] = pairs[keys[i]];
  }
}

function resolve(id) {
  var resolved = mapping[id];

  if (resolved == null) {
    throw new Error('Could not resolve bundle with id ' + id);
  }

  return resolved;
}

module.exports.register = register;
module.exports.resolve = resolve;
},{}],"175e469a7ea7db1c8c0744d04372621f":[function(require,module,exports) {
"use strict";

require("core-js/modules/web.immediate.js");
var model = _interopRequireWildcard(require("./module.js"));
var _recipeView = _interopRequireDefault(require("./views/recipeView.js"));
var _config = require("./config.js");
var _searchView = _interopRequireDefault(require("./views/searchView.js"));
var _resultsView = _interopRequireDefault(require("./views/resultsView.js"));
var _paginationView = _interopRequireDefault(require("./views/paginationView.js"));
var _bookmarksView = _interopRequireDefault(require("./views/bookmarksView.js"));
var _addRecipeView = _interopRequireDefault(require("./views/addRecipeView.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// importing everyThing from model.js :>

// import icons from "url:../img/icons.svg"; // .. means to go to parent folder ___ : Parcel 2
// console.log(icons);

// import { async } from "regenerator-runtime";

//////////////////////////////////////////////////////////////////////////////////////////

// Activating Hot Module Reloding :
if (module.hot) {
  module.hot.accept();
}
const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    _recipeView.default.renderSpinner();

    // 0) Update results view to mark selected search result :>
    _resultsView.default.update(model.getSearchResultsPage());

    // 1) Loading recipe :>
    await model.loadRecipe(id); // using await cuz it returns promise :)

    // 2:) Rendering recipe :>
    _recipeView.default.render(model.state.recipe);

    // 3:)  Updating bookmarks View : >
    _bookmarksView.default.update(model.state.bookmarks);
  } catch (Error) {
    _recipeView.default.renderError(); // where we going to get Error from :>
    console.error(Error);
  }
};
const controllSearchResults = async function () {
  try {
    _resultsView.default.renderSpinner();

    // 1) Get search query :)
    const query = _searchView.default.getQuery();
    if (!query) return; // if No query then return immediately :>

    // 2) Load search results :>
    await model.loadSearchResults(query);

    // 3) Render results :)
    // console.log(model.state.search.results);
    _resultsView.default.render(model.getSearchResultsPage());

    // 4) Render initial Pagination Buttons :>
    _paginationView.default.render(model.state.search);

    // 1) Render NEW results :)

    // 2) Render NEW Pagination Buttons :>
  } catch (Error) {
    console.log(Error);
  }
};
// controllSearchResults();

const controllPagination = function (goToPage) {
  // 1) Render NEW results :)
  _resultsView.default.render(model.getSearchResultsPage(goToPage));
  // 2) Render NEW Pagination Buttons :>
  _paginationView.default.render(model.state.search);
};
const controllServings = function (newServings) {
  // Update the recipe servings (in state) :>
  model.updateServings(newServings); //  ==>  btn.dataset

  // Update the recipe view
  // recipeView.render(model.state.recipe);

  // update Method :> will only update text & attributes in DOM , without having to re-render the entire view...
  _recipeView.default.update(model.state.recipe);
};

// When ever a New Bookmark is added, we want to render the bookmarks view with all the bookmarks..
const controllAddBookmark = function () {
  // 1) ADD/ REMOVE bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);else model.deleteBookmark(model.state.recipe.id);

  // 2) Render bookmarks   :>
  _bookmarksView.default.render(model.state.bookmarks);
  // console.log(model.state.recipe);
  // 3) Update recipe view :>
  _recipeView.default.update(model.state.recipe);
};
const controllbookmarks = function () {
  _bookmarksView.default.render(model.state.bookmarks);
};

// func__ will recieve the new recipe data :>
const controllAddRecipe = async function (newRecipe) {
  try {
    // Adding loading spinner :>
    _addRecipeView.default.renderSpinner();
    // Upload new recipe data :>
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe :>
    _recipeView.default.render(model.state.recipe); // And also close Form to see the recipe :<

    // Success Message :>
    _addRecipeView.default.renderMessage();

    // Render Bookmark view :>
    _bookmarksView.default.render(model.state.bookmarks);

    // change ID in URL :>  history.pushState : allow us to change the url without reloading the page :>
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    // window.history.back()    for going back to last page :>

    // Close Form Window :>
    setTimeout(function () {
      _addRecipeView.default.toggleWindow();
    }, _config.MODEL_CLOSE_SEC * 1000);
  } catch (Error) {
    console.error("***", Error);
    _addRecipeView.default.renderError(Error.message); // this will throw Error message  ___ >
  }
};
const init = function () {
  _bookmarksView.default.addHandlerRender(controllbookmarks);
  _recipeView.default.addHandlerRender(controllRecipes);
  _recipeView.default.addHandlerUpdateServings(controllServings);
  _recipeView.default.addHandlerAddBookmark(controllAddBookmark);
  _searchView.default.addHandlerSearch(controllSearchResults);
  _paginationView.default.addHandlerClick(controllPagination);
  _addRecipeView.default.addHandlerUpload(controllAddRecipe);
};
init();

//  func__ which we call at some point ___

//

// window.addEventListener("hashchange", controllRecipes);
// window.addEventListener("load", controllRecipes);

// instead we do this : ===>

// Problem : we dont want this code in controller , but in the recipeView. But in this code,we need this controllerRecipe func__ :<
// Summary :> The handler subcribes to the publisher, which is the listener in this case, and then as the publisher publishes an event, the subcriber is executed.
},{"core-js/modules/web.immediate.js":"140df4f8e97a45c53c66fead1f5a9e92","./module.js":"bfa033f9ece057912b965a49e2a6b5fa","./views/recipeView.js":"bcae1aced0301b01ccacb3e6f7dfede8","./views/searchView.js":"c5d792f7cac03ef65de30cc0fbb2cae7","./views/resultsView.js":"eacdbc0d50ee3d2819f3ee59366c2773","./views/paginationView.js":"d2063f3e7de2e4cdacfcb5eb6479db05","./views/bookmarksView.js":"7ed9311e216aa789713f70ebeec3ed40","./views/addRecipeView.js":"4dd83c2a08c1751220d223c54dc70016","./config.js":"09212d541c5c40ff2bd93475a904f8de"}],"140df4f8e97a45c53c66fead1f5a9e92":[function(require,module,exports) {
'use strict';
// TODO: Remove this module from `core-js@4` since it's split to modules listed below
require('../modules/web.clear-immediate');
require('../modules/web.set-immediate');

},{"../modules/web.clear-immediate":"a8129bb280ab458fd9dc3dce346707a2","../modules/web.set-immediate":"a67d339cabe998f821b6e1c1d5d15c43"}],"a8129bb280ab458fd9dc3dce346707a2":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');
var global = require('../internals/global');
var clearImmediate = require('../internals/task').clear;

// `clearImmediate` method
// http://w3c.github.io/setImmediate/#si-clearImmediate
$({
  global: true,
  bind: true,
  enumerable: true,
  forced: global.clearImmediate !== clearImmediate
}, {
  clearImmediate: clearImmediate
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/task":"dd47ece3e1296f193ccefcf3056d1754"}],"10044f24ecae4059b4af184e71d3fba2":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var defineBuiltIn = require('../internals/define-built-in');
var defineGlobalProperty = require('../internals/define-global-property');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var isForced = require('../internals/is-forced');

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = global[TARGET] && global[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/define-built-in":"d3923d198bad49b68105f8821b624c6e","../internals/define-global-property":"50d58082cbae29381d938cba46b25eae","../internals/copy-constructor-properties":"df952df9fa85293fe01bbdf9f7116b1b","../internals/is-forced":"700278f8e2cb4c21784f4e50866ce0e4"}],"7e78823454e7f795898745d93279f917":[function(require,module,exports) {
'use strict';

var global = arguments[3];
var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
// eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) ||
// eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || check(typeof this == 'object' && this) ||
// eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();
},{}],"5e181b7e7dcb1bb2de0a726b7af1e93d":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var call = require('../internals/function-call');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPropertyKey = require('../internals/to-property-key');
var hasOwn = require('../internals/has-own-property');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/object-property-is-enumerable":"6d666488e852af6845747bbd2705cc05","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-property-key":"df2b61336906907f777029fe90c882a8","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/ie8-dom-define":"e03ae13f7b17b2e21331d728bd059d1a"}],"7e006cebe93fc4773e87d3146a8fa81b":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"e16fc2ec92bf0d6254ffef14ea12ad77":[function(require,module,exports) {
'use strict';
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],"74736a18012731e2548e8322d30daf97":[function(require,module,exports) {
'use strict';
var NATIVE_BIND = require('../internals/function-bind-native');

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

},{"../internals/function-bind-native":"9fe384580e1b44a3b0b6ef5ec33478c3"}],"9fe384580e1b44a3b0b6ef5ec33478c3":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"6d666488e852af6845747bbd2705cc05":[function(require,module,exports) {
'use strict';
var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

},{}],"8c5551ce5a79ddcd7162c3e3c8f33c9a":[function(require,module,exports) {
'use strict';
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"debf68affb1e9f1283fa252d49c32ceb":[function(require,module,exports) {
'use strict';
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":"35ae890303b620d792cd5faa73776178","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37"}],"35ae890303b620d792cd5faa73776178":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/classof-raw":"901e5a25291bac244011feea921975b2"}],"b9577e436bf35f351d6949937f43e4a6":[function(require,module,exports) {
'use strict';
var NATIVE_BIND = require('../internals/function-bind-native');

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};

},{"../internals/function-bind-native":"9fe384580e1b44a3b0b6ef5ec33478c3"}],"901e5a25291bac244011feea921975b2":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"5617d8f084e26c58afcbde9a0982cf37":[function(require,module,exports) {
'use strict';
var isNullOrUndefined = require('../internals/is-null-or-undefined');

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};

},{"../internals/is-null-or-undefined":"f08ddfdaae403cb5bbe058d26a2544f9"}],"f08ddfdaae403cb5bbe058d26a2544f9":[function(require,module,exports) {
'use strict';
// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};

},{}],"df2b61336906907f777029fe90c882a8":[function(require,module,exports) {
'use strict';
var toPrimitive = require('../internals/to-primitive');
var isSymbol = require('../internals/is-symbol');

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

},{"../internals/to-primitive":"2a7f05f0f9119d3b88a770acfa30cc7b","../internals/is-symbol":"7500e07108c47e5d25bda62049b8b4ba"}],"2a7f05f0f9119d3b88a770acfa30cc7b":[function(require,module,exports) {
'use strict';
var call = require('../internals/function-call');
var isObject = require('../internals/is-object');
var isSymbol = require('../internals/is-symbol');
var getMethod = require('../internals/get-method');
var ordinaryToPrimitive = require('../internals/ordinary-to-primitive');
var wellKnownSymbol = require('../internals/well-known-symbol');

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/is-object":"03244e745134af366d66b74456891052","../internals/is-symbol":"7500e07108c47e5d25bda62049b8b4ba","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/ordinary-to-primitive":"beb7e03593f40bc8230218c946b07a98","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"03244e745134af366d66b74456891052":[function(require,module,exports) {
'use strict';
var isCallable = require('../internals/is-callable');

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

},{"../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f"}],"305f89aa9a013f46af3c2284b8a3ce4f":[function(require,module,exports) {
'use strict';
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};

},{}],"7500e07108c47e5d25bda62049b8b4ba":[function(require,module,exports) {
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var isCallable = require('../internals/is-callable');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/use-symbol-as-uid":"ea1988735f852716e8c2b0bf1a7f981c"}],"a8e7e15d3af5a0a555019aebcf7ed164":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');
var isCallable = require('../internals/is-callable');
var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};
module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f"}],"544f373cb6f2cefc1ac40f5370c50e9d":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = uncurryThis({}.isPrototypeOf);

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"ea1988735f852716e8c2b0bf1a7f981c":[function(require,module,exports) {
'use strict';
/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

},{"../internals/symbol-constructor-detection":"6ac2d2fc70d8b5d387937249170ebb50"}],"6ac2d2fc70d8b5d387937249170ebb50":[function(require,module,exports) {
'use strict';

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = require('../internals/engine-v8-version');
var fails = require('../internals/fails');
var global = require('../internals/global');
var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
  // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});
},{"../internals/engine-v8-version":"e23493e3b068d06b425cfae337547b80","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/global":"7e78823454e7f795898745d93279f917"}],"e23493e3b068d06b425cfae337547b80":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');
var userAgent = require('../internals/engine-user-agent');
var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}
module.exports = version;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"143c26fec04440461ecc4dae3ad13828":[function(require,module,exports) {
'use strict';
module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

},{}],"5375a7fbf3e5e64eea2416cbbad034a2":[function(require,module,exports) {
'use strict';
var aCallable = require('../internals/a-callable');
var isNullOrUndefined = require('../internals/is-null-or-undefined');

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};

},{"../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/is-null-or-undefined":"f08ddfdaae403cb5bbe058d26a2544f9"}],"d4f749998260ddb7816916a3fe6d4660":[function(require,module,exports) {
'use strict';
var isCallable = require('../internals/is-callable');
var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};

},{"../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/try-to-string":"3fb606768f23a6e9175aba0e8f4c8e20"}],"3fb606768f23a6e9175aba0e8f4c8e20":[function(require,module,exports) {
'use strict';
var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};

},{}],"beb7e03593f40bc8230218c946b07a98":[function(require,module,exports) {
'use strict';
var call = require('../internals/function-call');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/is-object":"03244e745134af366d66b74456891052"}],"df9ad61e8404f948b528f2ef2becebe4":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');
var shared = require('../internals/shared');
var hasOwn = require('../internals/has-own-property');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');
var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;
module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name) ? Symbol[name] : createWellKnownSymbol('Symbol.' + name);
  }
  return WellKnownSymbolsStore[name];
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/shared":"1950ed6cf8f0dece2a998d60590e9098","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/uid":"d5b7e7679d9dac163ab327cbf9508501","../internals/symbol-constructor-detection":"6ac2d2fc70d8b5d387937249170ebb50","../internals/use-symbol-as-uid":"ea1988735f852716e8c2b0bf1a7f981c"}],"1950ed6cf8f0dece2a998d60590e9098":[function(require,module,exports) {
'use strict';
var store = require('../internals/shared-store');

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};

},{"../internals/shared-store":"050f18cf9a95404c13e77ce244078f47"}],"050f18cf9a95404c13e77ce244078f47":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var globalThis = require('../internals/global');
var defineGlobalProperty = require('../internals/define-global-property');

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.36.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.36.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/global":"7e78823454e7f795898745d93279f917","../internals/define-global-property":"50d58082cbae29381d938cba46b25eae"}],"f767c4b71b5cfe3ee6c1a7e54bdcafa0":[function(require,module,exports) {
'use strict';
module.exports = false;

},{}],"50d58082cbae29381d938cba46b25eae":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
module.exports = function (key, value) {
  try {
    defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }
  return value;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"d97bfcc83949e538357d288583678586":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var toObject = require('../internals/to-object');

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba"}],"2633fa4da95065e00ff87cc7cbdd56ba":[function(require,module,exports) {
'use strict';
var requireObjectCoercible = require('../internals/require-object-coercible');

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37"}],"d5b7e7679d9dac163ab327cbf9508501":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"e03ae13f7b17b2e21331d728bd059d1a":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/document-create-element":"cbe47a0c6cb67b97db834ad53049114a"}],"cbe47a0c6cb67b97db834ad53049114a":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');
var isObject = require('../internals/is-object');
var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-object":"03244e745134af366d66b74456891052"}],"b52adb17d2cebacfac251681882f0a33":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a"}],"645ef963c1e312a12b44589911036a7f":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug');
var anObject = require('../internals/an-object');
var toPropertyKey = require('../internals/to-property-key');

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/ie8-dom-define":"e03ae13f7b17b2e21331d728bd059d1a","../internals/v8-prototype-define-bug":"a678e0bae4e73cf403d7e7fa4baa92b0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-property-key":"df2b61336906907f777029fe90c882a8"}],"a678e0bae4e73cf403d7e7fa4baa92b0":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"4f20fc1a2160760f9e7961d272520cbd":[function(require,module,exports) {
'use strict';
var isObject = require('../internals/is-object');

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};

},{"../internals/is-object":"03244e745134af366d66b74456891052"}],"d3923d198bad49b68105f8821b624c6e":[function(require,module,exports) {
'use strict';
var isCallable = require('../internals/is-callable');
var definePropertyModule = require('../internals/object-define-property');
var makeBuiltIn = require('../internals/make-built-in');
var defineGlobalProperty = require('../internals/define-global-property');

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

},{"../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/make-built-in":"1fba32aaac09dddf56720a801bec611c","../internals/define-global-property":"50d58082cbae29381d938cba46b25eae"}],"1fba32aaac09dddf56720a801bec611c":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var hasOwn = require('../internals/has-own-property');
var DESCRIPTORS = require('../internals/descriptors');
var CONFIGURABLE_FUNCTION_NAME = require('../internals/function-name').CONFIGURABLE;
var inspectSource = require('../internals/inspect-source');
var InternalStateModule = require('../internals/internal-state');

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/function-name":"8c9a0dc6f151e22aaeb5f0e18e363d7d","../internals/inspect-source":"2632e39e653b5d5a3bae68e9954b90e4","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1"}],"8c9a0dc6f151e22aaeb5f0e18e363d7d":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var hasOwn = require('../internals/has-own-property');

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/has-own-property":"d97bfcc83949e538357d288583678586"}],"2632e39e653b5d5a3bae68e9954b90e4":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var isCallable = require('../internals/is-callable');
var store = require('../internals/shared-store');

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/shared-store":"050f18cf9a95404c13e77ce244078f47"}],"8b9f5ed7c6f8b05b4cd6ee1eefa801c1":[function(require,module,exports) {
'use strict';

var NATIVE_WEAK_MAP = require('../internals/weak-map-basic-detection');
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var hasOwn = require('../internals/has-own-property');
var shared = require('../internals/shared-store');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;
var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};
var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    }
    return state;
  };
};
if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}
module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};
},{"../internals/weak-map-basic-detection":"c91133453c70193889ef3532d275c90c","../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-object":"03244e745134af366d66b74456891052","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/shared-store":"050f18cf9a95404c13e77ce244078f47","../internals/shared-key":"18fb64363b0383efc58d7addc88469cd","../internals/hidden-keys":"7cf9eee6c00d9cc7018f7817cf84e3d6"}],"c91133453c70193889ef3532d275c90c":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');
var isCallable = require('../internals/is-callable');
var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f"}],"18fb64363b0383efc58d7addc88469cd":[function(require,module,exports) {
'use strict';
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":"1950ed6cf8f0dece2a998d60590e9098","../internals/uid":"d5b7e7679d9dac163ab327cbf9508501"}],"7cf9eee6c00d9cc7018f7817cf84e3d6":[function(require,module,exports) {
'use strict';
module.exports = {};

},{}],"df952df9fa85293fe01bbdf9f7116b1b":[function(require,module,exports) {
'use strict';
var hasOwn = require('../internals/has-own-property');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

},{"../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/own-keys":"a99313addb30af59e8e5785ab390671c","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f"}],"a99313addb30af59e8e5785ab390671c":[function(require,module,exports) {
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/object-get-own-property-names":"b422be4dea2e1243d9a0803066cc2d3d","../internals/object-get-own-property-symbols":"f759fc76793903b9cadc1e3a84780ff9","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"b422be4dea2e1243d9a0803066cc2d3d":[function(require,module,exports) {
'use strict';
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/object-keys-internal":"87cfa515865c83e03f632cbb3fb5fffb","../internals/enum-bug-keys":"f973a6d08ba70476eedabcaf4b58c5fb"}],"87cfa515865c83e03f632cbb3fb5fffb":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var hasOwn = require('../internals/has-own-property');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/array-includes":"8d0989f06759b3b2c526a5860656b2fc","../internals/hidden-keys":"7cf9eee6c00d9cc7018f7817cf84e3d6"}],"8d0989f06759b3b2c526a5860656b2fc":[function(require,module,exports) {
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666"}],"ff996ac5a229620b351a78c404035460":[function(require,module,exports) {
'use strict';
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f"}],"25e1ba8089f537c8bc0aca5bea74579f":[function(require,module,exports) {
'use strict';
var trunc = require('../internals/math-trunc');

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

},{"../internals/math-trunc":"87d3c3a59dd04075b6d350ab338f4db8"}],"87d3c3a59dd04075b6d350ab338f4db8":[function(require,module,exports) {
'use strict';
var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

},{}],"e316973a6f76533d644cd1ab97e51666":[function(require,module,exports) {
'use strict';
var toLength = require('../internals/to-length');

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};

},{"../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f"}],"68c0420762f5f4704115d4fb34e0ae7f":[function(require,module,exports) {
'use strict';
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f"}],"f973a6d08ba70476eedabcaf4b58c5fb":[function(require,module,exports) {
'use strict';
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],"f759fc76793903b9cadc1e3a84780ff9":[function(require,module,exports) {
'use strict';
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],"700278f8e2cb4c21784f4e50866ce0e4":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f"}],"dd47ece3e1296f193ccefcf3056d1754":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');
var apply = require('../internals/function-apply');
var bind = require('../internals/function-bind-context');
var isCallable = require('../internals/is-callable');
var hasOwn = require('../internals/has-own-property');
var fails = require('../internals/fails');
var html = require('../internals/html');
var arraySlice = require('../internals/array-slice');
var createElement = require('../internals/document-create-element');
var validateArgumentsLength = require('../internals/validate-arguments-length');
var IS_IOS = require('../internals/engine-is-ios');
var IS_NODE = require('../internals/engine-is-node');
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var $location, defer, channel, port;
fails(function () {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  $location = global.location;
});
var run = function (id) {
  if (hasOwn(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var runner = function (id) {
  return function () {
    run(id);
  };
};
var eventListener = function (event) {
  run(event.data);
};
var globalPostMessageDefer = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), $location.protocol + '//' + $location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable(handler) ? handler : Function(handler);
    var args = arraySlice(arguments, 1);
    queue[++counter] = function () {
      apply(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
    // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = eventListener;
    defer = bind(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && isCallable(global.postMessage) && !global.importScripts && $location && $location.protocol !== 'file:' && !fails(globalPostMessageDefer)) {
    defer = globalPostMessageDefer;
    global.addEventListener('message', eventListener, false);
    // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
    // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}
module.exports = {
  set: set,
  clear: clear
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/html":"1918dab06b404ee3e52f081d798c1688","../internals/array-slice":"d58518bc0d77fd7d4bbb2d854257bf40","../internals/document-create-element":"cbe47a0c6cb67b97db834ad53049114a","../internals/validate-arguments-length":"ade492a073f7546303a9902550807c71","../internals/engine-is-ios":"3156eb661c8c8e66a6d95c3b2d979fb4","../internals/engine-is-node":"42c67226e3ca045b9c35647f16133bfa"}],"a59096d8f45a668c44fc59d4e30bb557":[function(require,module,exports) {
'use strict';
var NATIVE_BIND = require('../internals/function-bind-native');

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});

},{"../internals/function-bind-native":"9fe384580e1b44a3b0b6ef5ec33478c3"}],"f9e6dc73b4a152f549e8299150ac260e":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this-clause');
var aCallable = require('../internals/a-callable');
var NATIVE_BIND = require('../internals/function-bind-native');

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/function-uncurry-this-clause":"2dd1946114c6bb9f18e9a285c7d6cf0d","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/function-bind-native":"9fe384580e1b44a3b0b6ef5ec33478c3"}],"2dd1946114c6bb9f18e9a285c7d6cf0d":[function(require,module,exports) {
'use strict';
var classofRaw = require('../internals/classof-raw');
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};

},{"../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"1918dab06b404ee3e52f081d798c1688":[function(require,module,exports) {
'use strict';
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164"}],"d58518bc0d77fd7d4bbb2d854257bf40":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = uncurryThis([].slice);

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"ade492a073f7546303a9902550807c71":[function(require,module,exports) {
'use strict';
var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw new $TypeError('Not enough arguments');
  return passed;
};

},{}],"3156eb661c8c8e66a6d95c3b2d979fb4":[function(require,module,exports) {
'use strict';
var userAgent = require('../internals/engine-user-agent');

// eslint-disable-next-line redos/no-vulnerable -- safe
module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);

},{"../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"42c67226e3ca045b9c35647f16133bfa":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');
var classof = require('../internals/classof-raw');
module.exports = classof(global.process) === 'process';
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/classof-raw":"901e5a25291bac244011feea921975b2"}],"a67d339cabe998f821b6e1c1d5d15c43":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');
var global = require('../internals/global');
var setTask = require('../internals/task').set;
var schedulersFix = require('../internals/schedulers-fix');

// https://github.com/oven-sh/bun/issues/1633
var setImmediate = global.setImmediate ? schedulersFix(setTask, false) : setTask;

// `setImmediate` method
// http://w3c.github.io/setImmediate/#si-setImmediate
$({
  global: true,
  bind: true,
  enumerable: true,
  forced: global.setImmediate !== setImmediate
}, {
  setImmediate: setImmediate
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/task":"dd47ece3e1296f193ccefcf3056d1754","../internals/schedulers-fix":"20c4a8f10d5f967dd1198f240f9c4e62"}],"20c4a8f10d5f967dd1198f240f9c4e62":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');
var apply = require('../internals/function-apply');
var isCallable = require('../internals/is-callable');
var ENGINE_IS_BUN = require('../internals/engine-is-bun');
var USER_AGENT = require('../internals/engine-user-agent');
var arraySlice = require('../internals/array-slice');
var validateArgumentsLength = require('../internals/validate-arguments-length');
var Function = global.Function;
// dirty IE9- and Bun 0.3.0- checks
var WRAP = /MSIE .\./.test(USER_AGENT) || ENGINE_IS_BUN && function () {
  var version = global.Bun.version.split('.');
  return version.length < 3 || version[0] === '0' && (version[1] < 3 || version[1] === '3' && version[2] === '0');
}();

// IE9- / Bun 0.3.0- setTimeout / setInterval / setImmediate additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
// https://github.com/oven-sh/bun/issues/1633
module.exports = function (scheduler, hasTimeArg) {
  var firstParamIndex = hasTimeArg ? 2 : 1;
  return WRAP ? function (handler, timeout /* , ...arguments */) {
    var boundArgs = validateArgumentsLength(arguments.length, 1) > firstParamIndex;
    var fn = isCallable(handler) ? handler : Function(handler);
    var params = boundArgs ? arraySlice(arguments, firstParamIndex) : [];
    var callback = boundArgs ? function () {
      apply(fn, this, params);
    } : fn;
    return hasTimeArg ? scheduler(callback, timeout) : scheduler(callback);
  } : scheduler;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/engine-is-bun":"b32e1fdc738b902c4f1105362bf17ebd","../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828","../internals/array-slice":"d58518bc0d77fd7d4bbb2d854257bf40","../internals/validate-arguments-length":"ade492a073f7546303a9902550807c71"}],"b32e1fdc738b902c4f1105362bf17ebd":[function(require,module,exports) {
'use strict';
/* global Bun -- Bun case */
module.exports = typeof Bun == 'function' && Bun && typeof Bun.version == 'string';

},{}],"bfa033f9ece057912b965a49e2a6b5fa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadRecipe = exports.updateServings = exports.state = exports.loadSearchResults = exports.loadRecipe = exports.getSearchResultsPage = exports.deleteBookmark = exports.addBookmarks = void 0;
var _config = require("./config.js");
var _helpers = require("./helpers.js");
// import { async } from "regenerator-runtime";

// Adding --> Business logics ==:>  here :)
const state = exports.state = {
  // state should contain all the data about the Application__:>
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: _config.RES_PER_PAGE // 10
  },
  bookmarks: []
};
const createRecipeObject = function (data) {
  const {
    recipe
  } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    // End Operator : short Circuits :> if(1 part) recipe.key is falsy/Doesn't exists then nothing happens here :>
    // if this is some value, then (2 part) of the operator is executed and returned __>    (IMPORTANT trick)
    ...(recipe.key && {
      key: recipe.key
    }) // (Trick : To conditionally add properties to an object)
  };
};

// NOTE : if you're using your own API key then of course you will not see this recipe here bcz this recipeis linked to my API key__ :>
const loadRecipe = async function (id) {
  try {
    const data = await (0, _helpers.AJAX)(`${_config.API_URL}/${id}?key=${_config.KEY}`);
    state.recipe = createRecipeObject(data);

    // Check if there's already recipe having same id in the bookmarks state ... if that's true then mark current recipe that we loaded from API as bookmarked set to true ...
    if (state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;else state.recipe.bookmarked = false;
    console.log(state.recipe);
  } catch (Error) {
    // Temp Error Handling :__ >
    console.error(`${Error} ****:)`);

    // In helpers func__ whenever we got this error, then that error was not automatically propagated down to model's(async func__) which was calling the hetJSON func__..  THEREFORE we Need to Re-throw Error Here :>>
    throw Error;
    // To mark this whole promise here, as rejected, So that Then here(module.js), we would get into catch block__>
  }
};

// Creating  function that will be exported, So that it can be used by the controller...
exports.loadRecipe = loadRecipe;
const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await (0, _helpers.AJAX)(`${_config.API_URL}?search=${query}&key=${_config.KEY}`);
    console.log(data);
    // Array of all the objects, now we need to create new array which contains the new Objects where property names are different :>
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && {
          key: rec.key
        }) // (Trick : To conditionally add properties to an object)
      };
    });
    state.search.page = 1; //  while doing new search page will reset to 1 :>
    // console.log(state.search.results);
  } catch (Error) {
    console.error(`${Error} ****:)`);
    throw Error;
  }
};

// Creating func__ which will take in the page that we want to render & which will then only return the results that we actually want to render for that page :)
exports.loadSearchResults = loadSearchResults;
const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  // First Page : return From result 1 to 10;  (0 to 9) cuz [Array is 0 based]
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

// Function will reach into the state, and in particular into the recipe ingrediets, and then change the quantity in each ingredient ...
exports.getSearchResultsPage = getSearchResultsPage;
const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // newQt = oldQt * newServings / oldServigs   //            2 * 8 / 4 = 4
    ing.quantity = ing.quantity * newServings / state.recipe.servings;
    state.recipe.servings = newServings;
  });
};

// 1st : get bookmarks out of the local storage & render them to the bookmarksView ___ :>
exports.updateServings = updateServings;
const presistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

// ADDING BOOKMARKS to the RECIPE ___ :)
const addBookmarks = function (recipe) {
  // ADD bookmark :>
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark :>
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  presistBookmarks();
};

// DELETING BOOKMARKS FROM the RECIPE ___ :)
exports.addBookmarks = addBookmarks;
const deleteBookmark = function (id) {
  // Delete bookmark :)
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT a bookmark (any more):>
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  presistBookmarks();
};
exports.deleteBookmark = deleteBookmark;
const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// For clearing bookmarks ! :>
const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};
// clearBookmarks()

const uploadRecipe = async function (newRecipe) {
  try {
    // 1 task : take the raw input data and transform it into same format as the data that we get from API :>
    // We want :1 part>  only the entries where first Ele of arr starts with ingredient / 2 part> should not be empty__:)
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith("ingredient") && entry[1] !== "").map(ing => {
      const ingArr = ing[1].split(",").map(el => el.trim());
      // const ingArr = ing[1].replaceAll(" ", "").split(",");
      // if array has length of 3 :>
      if (ingArr.length !== 3) throw new Error("Wrong ingredient format! Plz use the Correct Format :(");
      const [quantity, unit, description] = ingArr;
      return {
        quantity: quantity ? +quantity : null,
        unit,
        description
      };
    }); // opposite of Object.fromEntries() :>

    // Creating Object that is ready to be uploaded __ > sending this to API :>
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients
    };
    console.log(recipe);
    const data = await (0, _helpers.AJAX)(`${_config.API_URL}?key=${_config.KEY}`, recipe);
    state.recipe = createRecipeObject(data); //
    addBookmarks(state.recipe);
  } catch (Error) {
    throw Error; // this will throw Error message  ___ >
  }
};
exports.uploadRecipe = uploadRecipe;
},{"./helpers.js":"0e8dcd8a4e1c61cf18f78e1c2563655d","./config.js":"09212d541c5c40ff2bd93475a904f8de"}],"0e8dcd8a4e1c61cf18f78e1c2563655d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AJAX = void 0;
var _config = require("./config");
// The goal of this file/module is to contain a couple of functions that we reuse over and over again in our Project...

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData ? fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(uploadData)
    }) : fetch(url);
    const res = await Promise.race([fetchPro, timeout(_config.TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (Error) {
    throw Error;
  }
};

/*
// Using async func__ which will do fetching and also converting to JSON all in one step...
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (Error) {
    // console.log(Error);
    // let: we want to get the error message inside of modele :==>  So we can do :==>
    throw Error; // Now with this, the promise that's being returned from getJSON will actually reject.

    // So we basically propagated the error down from one async func__ to the other by re-throwing the error here in this catch block ___>
  }
  // Adding some timeOut : setting a time after which we make the request fail:> (IMP for bad internetConnections)
};

export const sendJSON = async function (url, uploadData) {
  // Learn : How we can send data to APT using Fetch fuc___ ==:
  try {
    const fetchPro = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (Error) {
    throw Error;
  }
};
*/
exports.AJAX = AJAX;
},{"./config":"09212d541c5c40ff2bd93475a904f8de"}],"09212d541c5c40ff2bd93475a904f8de":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIMEOUT_SEC = exports.RES_PER_PAGE = exports.MODEL_CLOSE_SEC = exports.KEY = exports.API_URL = void 0;
// In this file WE will put all the variables that should be constants and should be reused across the Project.

// Goal of this Js File with all the variables : >  Allows us to easily configure our project by simply changing some of the data that is here in this configuration file.

const API_URL = exports.API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
const TIMEOUT_SEC = exports.TIMEOUT_SEC = 10;
const RES_PER_PAGE = exports.RES_PER_PAGE = 10;
const KEY = exports.KEY = "1a4433b8-0613-4c53-a680-ffe0bbcecb14";
const MODEL_CLOSE_SEC = exports.MODEL_CLOSE_SEC = 2.5;
},{}],"bcae1aced0301b01ccacb3e6f7dfede8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _View = _interopRequireDefault(require("./View.js"));
var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// .. means to go to parent folder ___ : Parcel 2
// import { Fraction } from "fractional";
// console.log(Fraction);  // not working !

class RecipeView extends _View.default {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. Please try another one!";
  _message = "";
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach(ev => window.addEventListener(ev, handler));
  }
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      // EVENT DELEGATION :)
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;
      console.log(btn);
      const {
        updateTo
      } = btn.dataset;
      console.log(updateTo);
      if (+updateTo > 0) handler(+updateTo);
    });
  } // contecting this to controller ...

  _generateMarkup() {
    //  add hidden class is there is no-key on recipe, but if there is a key then we will add no class(to become visible :)
    // generating this method also in the resultsView :>
    return `
    <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
             <use href="${_icons.default}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${_icons.default}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
            <span class="recipe__info-text">servings</span>
            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
    // daash in property will be converted into CanelCase
    this._data.servings - 1}">
                <svg>
                  <use href="${_icons.default}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings"  data-update-to="${this._data.servings + 1}">
                <svg>
                  <use href="${_icons.default}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

         <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
            <svg>
              <use href="${_icons.default}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${_icons.default}#icon-bookmark${this._data.bookmarked ? "-fill" : ""}"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient) // ERROR
    .join("")}             
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${_icons.default}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }

  // Refacturing map :>
  _generateMarkupIngredient(ing) {
    return `
             <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${_icons.default}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity ? ing.quantity : ""}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
            `;
  }
}
var _default = exports.default = new RecipeView();
},{"url:../../img/icons.svg":"f0a7a8343f7e7995be30fe6eb1d4f65e","./View.js":"61b7a1b097e16436be3d54c2f1828c73"}],"f0a7a8343f7e7995be30fe6eb1d4f65e":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("ff67dc5ee3ea6fdf", "c0e2b7630833080c");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"2146da1905b95151ed14d455c784e7b7":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"1b9943ef25c7bbdf0dd1b9fa91880a6c":[function(require,module,exports) {
"use strict";

var resolve = require('./bundle-manifest').resolve;

module.exports = function (fromId, toId) {
  return relative(dirname(resolve(fromId)), resolve(toId));
};

function dirname(_filePath) {
  if (_filePath === '') {
    return '.';
  }

  var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
  var slashIndex = filePath.lastIndexOf('/');
  return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
}

function relative(from, to) {
  if (from === to) {
    return '';
  }

  var fromParts = from.split('/');

  if (fromParts[0] === '.') {
    fromParts.shift();
  }

  var toParts = to.split('/');

  if (toParts[0] === '.') {
    toParts.shift();
  } // Find where path segments diverge.


  var i;
  var divergeIndex;

  for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
    if (fromParts[i] !== toParts[i]) {
      divergeIndex = i;
    }
  } // If there are segments from "from" beyond the point of divergence,
  // return back up the path to that point using "..".


  var parts = [];

  for (i = 0; i < fromParts.length - divergeIndex; i++) {
    parts.push('..');
  } // If there are segments from "to" beyond the point of divergence,
  // continue using the remaining segments.


  if (toParts.length > divergeIndex) {
    parts.push.apply(parts, toParts.slice(divergeIndex));
  }

  return parts.join('/');
}

module.exports._dirname = dirname;
module.exports._relative = relative;
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"61b7a1b097e16436be3d54c2f1828c73":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import { mark } from "regenerator-runtime";
// .. means to go to parent folder ___ : Parcel 2

class View {
  _data;
  render(data, render = true) {
    // If there is no data OR there is data in array, but that data is an Array, & it's Empty :)   Error To be Shown :>>>
    if (!data || Array.isArray(data) && data.length === 0) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // CANNOT UNDERSTAND :(
  // update Method :> will only update text & attributes in DOM , without having to re-render the entire view...
  update(data) {
    // In This Method, We will create newMarkup but not render it. Instead : We Generate this Markup & then compare that new HTML to current HTML... then change text , Attributes that actully   have changed from the old version to the new version ... >>>
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    // Converting newMarkup to DOM Object :>
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // then compare it with actual DOM that's on the page :)
    const newElements = Array.from(newDOM.querySelectorAll("*")); // * for selecting all elements __>
    const currElements = Array.from(this._parentElement.querySelectorAll("*"));
    // console.log(currElements);
    // console.log(newElements);

    newElements.forEach((newEl, i) => {
      const curEl = currElements[i];

      // console.log(curEl, newEl.isEqualNode(curEl));

      // Comparing currEl with newEl ( using : isEqualNode __) && Only want elements that are TEXT  :>
      // Update changed TEXT :>
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") {
        // console.log("$$ :>", newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES :> Replacing all Attributes in the current elemet by attributes comming from the new element ...
      if (!newEl.isEqualNode(curEl)) {
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }
    });
  } // CANNOT UNDERSTAND (REVIEW THIS CODE LATER):(

  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderSpinner = function () {
    const markup = `<div class="spinner">
          <svg>
            <use href="${_icons.default}#icon-loader"></use>
          </svg>
        </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };

  // Error Message
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
    <div>
    <svg>
    <use href="${_icons.default}#icon-alert-triangle"></use>
    </svg>
    </div>
    <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // Success Message
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
    <div>
    <svg>
    <use href="${_icons.default}#icon-smile"></use>
    </svg>
    </div>
    <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
exports.default = View;
},{"url:../../img/icons.svg":"f0a7a8343f7e7995be30fe6eb1d4f65e"}],"c5d792f7cac03ef65de30cc0fbb2cae7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class SearchView {
  _parentEl = document.querySelector(".search");
  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentEl.querySelector(".search__field").value = "";
  }
  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}
var _default = exports.default = new SearchView();
},{}],"eacdbc0d50ee3d2819f3ee59366c2773":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _View = _interopRequireDefault(require("./View.js"));
var _previewView = _interopRequireDefault(require("./previewView.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ResultsView extends _View.default {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipies Found for your query! Please try Again :(";
  _message = "";
  _generateMarkup() {
    return this._data.map(result => _previewView.default.render(result, false)).join("");
  }
} // Want to Return Whole String which contains like one of these elements forEach of search results in Array...
var _default = exports.default = new ResultsView();
},{"./View.js":"61b7a1b097e16436be3d54c2f1828c73","./previewView.js":"e4d6583325a8b6c9380670c4f233bf07"}],"e4d6583325a8b6c9380670c4f233bf07":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _View = _interopRequireDefault(require("./View.js"));
var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// PreviewView will only generate the markup for one of these preview elements ... >

class PreviewView extends _View.default {
  _parentElement = "";
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `  
        <li class="preview">
          <a class="preview__link ${this._data.id === id ? "preview__link--active" : ""}" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${this._data.key ? "" : "hidden"}">
             <svg>
              <use href="${_icons.default}#icon-user"></use>
             </svg>
            </div>
         </div>
          </a>
        </li>
    `;
  }
}
var _default = exports.default = new PreviewView();
},{"./View.js":"61b7a1b097e16436be3d54c2f1828c73","url:../../img/icons.svg":"f0a7a8343f7e7995be30fe6eb1d4f65e"}],"d2063f3e7de2e4cdacfcb5eb6479db05":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _View = _interopRequireDefault(require("./View.js"));
var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  PAGINATION :>
// FIRST Senerio , Page 1 then only next button(Page 1) is Shown & No button to (GO back) __>
// SECOND Senerio ,  IF we have less then 10 Results then we have (No buttons At All) ___ >
// THIRD Senerio ,  We are in Other Page That NOt First Page theN Both Buttons Should be Shown (Button : Go Forward) & (Button : Go Back)
// FOURTH Senerio , if we Go to last Page then Only (GO back)button should be Shown :)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// .. means to go to parent folder ___ : Parcel 2
// import { Fraction } from "fractional";
// console.log(Fraction);  // not working !

class PaginationView extends _View.default {
  _parentElement = document.querySelector(".pagination");
  // Using PublisherSubcriber pattren : like recipeView :>
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      console.log(btn);
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  // Metod that render method is going to call to generate the markup for the View ;
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // ----------------- > CHALLENGE : # REFRACTURE the buttons code into Method(generateMarkupButton) :>>>
    // Page 1, and there are other pages : Current Page need to be less then number of Pages ___ >

    //  <!-- creating data-attribute on each btns,which contains the page that we want to go to  -->
    if (currPage === 1 && numPages > 1) {
      return ` <button data-goto="${currPage + 1}"  class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${_icons.default}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // Last Page :  current PAGE is same As Number of Pages :>
    if (currPage === numPages && numPages > 1) {
      return ` <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${_icons.default}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>`;
    }

    // Other Page : Current Page less then number of Pages :>
    if (currPage < numPages) {
      return `<button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${_icons.default}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
           <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${_icons.default}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    }

    // Page 1, and there are No other pages :
    return "";
  }
}
var _default = exports.default = new PaginationView();
},{"./View.js":"61b7a1b097e16436be3d54c2f1828c73","url:../../img/icons.svg":"f0a7a8343f7e7995be30fe6eb1d4f65e"}],"7ed9311e216aa789713f70ebeec3ed40":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _View = _interopRequireDefault(require("./View.js"));
var _previewView = _interopRequireDefault(require("./previewView.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class BookmarksView extends _View.default {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmarks it :)";
  _message = "";
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkup() {
    return this._data.map(bookmark => _previewView.default.render(bookmark, false)).join("");
  }
}
var _default = exports.default = new BookmarksView();
},{"./View.js":"61b7a1b097e16436be3d54c2f1828c73","./previewView.js":"e4d6583325a8b6c9380670c4f233bf07"}],"4dd83c2a08c1751220d223c54dc70016":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _View = _interopRequireDefault(require("./View.js"));
var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// .. means to go to parent folder ___ : Parcel 2
// import { Fraction } from "fractional";
// console.log(Fraction);  // not working !

class AddRecipeView extends _View.default {
  _parentElement = document.querySelector(".upload");
  _message = `Recipe was sucessfully uploaded :)`;
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      //  Using form data API  :=> in API pass in the element this a form == is ..(this) ..

      // Spreading the Object into Array :>
      const dataArr = [...new FormData(this)];
      // Method : to convert entries into an Object __>
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}
var _default = exports.default = new AddRecipeView();
},{"./View.js":"61b7a1b097e16436be3d54c2f1828c73","url:../../img/icons.svg":"f0a7a8343f7e7995be30fe6eb1d4f65e"}]},{},["63391e74c092396b97cd2042a8695493","b5864bd242e4a1e7a6e23d1a63a004cc","175e469a7ea7db1c8c0744d04372621f"], null)

//# sourceMappingURL=controller.0ed53df1.js.map
