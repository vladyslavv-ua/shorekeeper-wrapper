"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CefUnavailableError: () => CefUnavailableError,
  cefQuery: () => cefQuery,
  executeRawQuery: () => executeRawQuery,
  isCefAvailable: () => isCefAvailable
});
module.exports = __toCommonJS(index_exports);

// src/cef.ts
var CefUnavailableError = class extends Error {
  constructor() {
    super(
      "window.cefQuery is unavailable. Open this page inside the configured CEF host."
    );
    this.name = "CefUnavailableError";
  }
};
function isCefAvailable() {
  return typeof window !== "undefined" && typeof window.cefQuery === "function";
}
function cefQuery(request) {
  if (!isCefAvailable()) {
    return Promise.reject(new CefUnavailableError());
  }
  return new Promise((resolve, reject) => {
    window.cefQuery({
      request,
      persistent: false,
      onSuccess: resolve,
      onFailure: (errorCode, errorMessage) => {
        reject(new Error(`CEF query failed (${errorCode}): ${errorMessage}`));
      }
    });
  });
}

// src/queryExecution/executeRawQuery.ts
function executeRawQuery(query, params, outputFormat) {
  if (!isCefAvailable()) {
    return Promise.reject({
      success: false,
      failureReason: 2 /* CEF_UNAVAILABLE */
    });
  }
  return new Promise((resolve, reject) => {
    window.cefQuery({
      request: JSON.stringify({
        method: "executeRawQuery",
        params: {
          query,
          params,
          output: outputFormat
        }
      }),
      onSuccess: function(response) {
        resolve(JSON.parse(response));
      },
      onFailure: function(errorCode, errorMessage) {
        reject({
          success: false,
          failureReason: 2 /* CEF_UNAVAILABLE */
        });
      }
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CefUnavailableError,
  cefQuery,
  executeRawQuery,
  isCefAvailable
});
//# sourceMappingURL=index.cjs.map