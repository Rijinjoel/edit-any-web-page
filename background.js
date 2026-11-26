// designMode makes the whole page editable.
async function toggle() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  const [{ result: on }] = await browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      document.designMode = document.designMode === "on" ? "off" : "on";
      return document.designMode === "on";
    },
  });
  browser.action.setBadgeText({ tabId: tab.id, text: on ? "ON" : "" });
}

browser.commands.onCommand.addListener((name) => name === "toggle-edit" && toggle());
browser.runtime.onMessage.addListener((msg) => msg === "toggle" && toggle());
