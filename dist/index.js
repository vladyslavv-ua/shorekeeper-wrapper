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
export {
  CefUnavailableError,
  cefQuery,
  executeRawQuery,
  isCefAvailable
};
//# sourceMappingURL=index.js.map