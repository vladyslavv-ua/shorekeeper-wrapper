import assert from "node:assert/strict";
import test from "node:test";

import {
  CefUnavailableError,
  cefQuery,
  createCefClient,
  isCefAvailable,
} from "../dist/index.js";

test("reports when the CEF bridge is unavailable", async () => {
  delete globalThis.window;

  assert.equal(isCefAvailable(), false);
  await assert.rejects(cefQuery("request"), CefUnavailableError);
});

test("resolves a successful CEF query", async () => {
  globalThis.window = {
    cefQuery(options) {
      assert.equal(options.request, "request");
      assert.equal(options.persistent, false);
      options.onSuccess("response");
      return 1;
    },
  };

  await assert.doesNotReject(async () => {
    assert.equal(await cefQuery("request"), "response");
  });
});

test("rejects a failed CEF query", async () => {
  globalThis.window = {
    cefQuery(options) {
      options.onFailure(7, "native failure");
      return 2;
    },
  };

  await assert.rejects(
    cefQuery("request"),
    /CEF query failed \(7\): native failure/,
  );
});

test("encodes method calls and decodes JSON responses", async () => {
  const client = createCefClient({
    transport: async (request) => {
      assert.deepEqual(JSON.parse(request), {
        method: "getPlayer",
        params: { id: "42" },
      });

      return JSON.stringify({ id: "42", name: "Rover", level: 10 });
    },
  });

  assert.deepEqual(await client.call("getPlayer", { id: "42" }), {
    id: "42",
    name: "Rover",
    level: 10,
  });
});
