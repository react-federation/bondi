global.__webpack_require__ = function (id) {
  return () => console.log(id);
};

__webpack_require__.f = {};

const ensureChunk = (chunkId) => {
  return Promise.all(
    Object.keys(__webpack_require__.f).reduce((promises, key) => {
      __webpack_require__.f[key](chunkId, promises);
      return promises;
    }, [])
  );
};

__webpack_require__.S = {};
__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

// The chunk loading function for additional chunks
__webpack_require__.e = ensureChunk;
var initPromises = {};
var initTokens = {};

__webpack_require__.I = (name, initScope) => {
  if (!initScope) initScope = [];
  // handling circular init calls
  var initToken = initTokens[name];
  if (!initToken) initToken = initTokens[name] = {};
  if (initScope.indexOf(initToken) >= 0) return;
  initScope.push(initToken);
  // only runs once
  if (initPromises[name]) return initPromises[name];
  // creates a new share scope if needed
  if (!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
  // runs all init snippets from all modules reachable
  var scope = __webpack_require__.S[name];
  var uniqueName = "layout-shell";
  var register = (name, version, factory, eager) => {
    var versions = (scope[name] = scope[name] || {});
    var activeVersion = versions[version];
    if (
      !activeVersion ||
      (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))
    )
      versions[version] = { get: factory, from: uniqueName, eager: !!eager };
  };

  var promises = [];
  switch (name) {
    case "default":
      {
        register("@emotion/react", "11.4.1", () =>
          Promise.all([__webpack_require__.e(903), __webpack_require__.e(927), __webpack_require__.e(943)]).then(
            () => () => __webpack_require__(6903)
          )
        );
        register("react-dom", "17.0.2", () =>
          Promise.all([__webpack_require__.e(316), __webpack_require__.e(927), __webpack_require__.e(320)]).then(
            () => () => __webpack_require__(8316)
          )
        );
        register("react-router-dom", "5.3.0", () =>
          Promise.all([__webpack_require__.e(607), __webpack_require__.e(927), __webpack_require__.e(896)]).then(
            () => () => __webpack_require__(6607)
          )
        );
        register("react", "17.0.2", () => __webpack_require__.e(784).then(() => () => __webpack_require__(2784)));
      }
      break;
  }
  if (!promises.length) return (initPromises[name] = 1);
  return (initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1)));
};

global.__webpack_init_sharing__ = __webpack_require__.I;
global.__webpack_share_scopes__ = __webpack_require__.S;
