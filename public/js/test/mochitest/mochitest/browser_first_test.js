/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* vim: set ft=javascript ts=2 et sw=2 tw=80: */
/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

const TAB_URL = EXAMPLE_URL + "doc_event-listeners-02.html";

add_task(function* () {
  let toolbox = yield openNewTabAndToolbox(TAB_URL, "jsdebugger");
  let threadClient = toolbox.threadClient;

  ContentTask.spawn(gBrowser.selectedBrowser, null, function* () {
    content.document.querySelector("button").click()
  });

  yield waitForThreadEvents(threadClient, "paused");
  yield toolbox.destroy().then(finish);
});
