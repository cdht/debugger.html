/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* vim: set ft=javascript ts=2 et sw=2 tw=80: */
/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

"use strict";

// shared-head.js handles imports, constants, and utility functions
Services.scriptloader.loadSubScript("chrome://mochitests/content/browser/devtools/client/framework/test/shared-head.js", this);
var { Toolbox } = require("devtools/client/framework/toolbox");
const EXAMPLE_URL = "http://example.com/browser/devtools/client/debugger/new/test/mochitest/";

function waitForThreadEvents(thread, eventName) {
  info("Waiting for thread event '" + eventName + "' to fire.");

  return new Promise(function(resolve, reject) {
    thread.addListener(eventName, function onEvent(eventName, ...args) {
      info("Thread event '" + eventName + "' fired.");
      ok(true, "Thread event '" + eventName + "' have been fired.");
      thread.removeListener(eventName, onEvent);
      resolve.apply(resolve, args);
    });
  });
}

Services.prefs.setBoolPref("devtools.debugger.new-debugger-frontend", true);
registerCleanupFunction(() => {
  Services.prefs.setBoolPref("devtools.debugger.new-debugger-frontend", false);
})
