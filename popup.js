globalThis.browser ??= chrome; // Chromium has only `chrome`
const box = document.getElementById("persist");
const msg = document.getElementById("msg");

browser.storage.local.get("persist").then((s) => (box.checked = !!s.persist));

document.getElementById("toggle").addEventListener("click", async () => {
  await browser.runtime.sendMessage("toggle");
  window.close();
});

box.addEventListener("change", () => {
  // Save first: Firefox may close the popup when the permission prompt opens.
  browser.storage.local.set({ persist: box.checked });
  // Restoring needs access to every site; ask only when the setting is turned on.
  if (box.checked) browser.permissions.request({ origins: ["<all_urls>"] });
});

document.getElementById("clearPage").addEventListener("click", async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  const u = new URL(tab.url);
  await browser.storage.local.remove(u.origin + u.pathname + u.search); // same key as content.js
  browser.tabs.reload(tab.id); // show the original page again
  window.close();
});

document.getElementById("clear").addEventListener("click", async () => {
  await browser.storage.local.clear();
  await browser.storage.local.set({ persist: box.checked });
  msg.textContent = "Saved edits cleared.";
});
