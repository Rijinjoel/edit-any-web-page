// Saved edits are keyed by page URL without the #hash.
// shortcut: restores the whole <body> HTML, so pages that re-render with JS (React etc.)
// may overwrite or break; upgrade to per-text-node patches if that bites.
const key = location.origin + location.pathname + location.search;

browser.storage.local.get(["persist", key]).then((s) => {
  if (s.persist && s[key]) document.body.innerHTML = s[key];
});

let timer;
document.addEventListener("input", () => {
  if (document.designMode !== "on") return; // ignore normal form typing
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const { persist } = await browser.storage.local.get("persist");
    if (persist) browser.storage.local.set({ [key]: document.body.innerHTML });
  }, 500);
}, true);
