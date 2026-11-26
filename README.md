# Zen Edit Mode

Click any webpage and edit its text in place. A tiny add-on for [Zen Browser](https://zen-browser.app) and Firefox, with an optional setting to keep your edits after the page reloads.

Handy for mocking up copy changes, trying out headlines, cleaning a page before a screenshot, or just having fun with the news.

## Features

- **Edit any page.** Turn on edit mode and click anywhere to type, delete or paste.
- **Keyboard shortcut.** Press `Alt+Shift+E` to toggle editing without opening the popup.
- **Keep edits (optional).** Your edited version comes back when you reopen the page.
- **Clear saved edits** for the current page or for every page.
- **Light and dark popup** that follows your system theme.

## Install

### Try it now (temporary)

1. Download or clone this repo.
2. In Zen, open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on…** and choose `manifest.json`.
4. Pin the button: click the extensions (puzzle) icon and pin **Edit Mode**.

A temporary add-on is removed when the browser restarts.

### Keep it installed

Zen and Firefox only keep add-ons that Mozilla has signed. You can sign this one for free as an unlisted (private) add-on:

1. Create API keys at [addons.mozilla.org/developers/addon/api/key](https://addons.mozilla.org/developers/addon/api/key/).
2. From the repo folder, run:

   ```bash
   npx web-ext sign --channel=unlisted --api-key=YOUR_KEY --api-secret=YOUR_SECRET
   ```

3. Open the signed `.xpi` file from the `web-ext-artifacts` folder in Zen to install it.

## Usage

Click the **Edit Mode** toolbar button to open the popup:

| Control | What it does |
| --- | --- |
| **Toggle editing on this page** | Turns editing on or off. The button shows **ON** while editing. |
| **Keep my edits after reload** | Saves your edits and restores them when you reopen the page. Zen asks for access to all websites the first time. |
| **Clear saved edits for this page** | Deletes this page's saved version and reloads the original. |
| **Clear all saved edits** | Deletes every saved page. |

To change the shortcut, go to `about:addons`, click the gear icon, then **Manage Extension Shortcuts**.

## How it works

Edit mode switches on the browser's built-in [`document.designMode`](https://developer.mozilla.org/docs/Web/API/Document/designMode), which makes the whole page editable.

When **Keep my edits** is on, the add-on saves the page's content half a second after you stop typing. It puts the saved content back when you open the page again. Pages are matched by their address, ignoring anything after `#`.

Everything is stored locally in your browser. Nothing is sent anywhere.

## Limitations

- Edits are only visible to you, in your browser. The real website doesn't change.
- Sites that keep redrawing themselves with JavaScript (Gmail, X, most web apps) may overwrite restored edits or stop working properly after a restore. Mostly static pages work best.
- Browser pages such as `about:` pages and addons.mozilla.org can't be edited.

## Files

| File | Purpose |
| --- | --- |
| `manifest.json` | Add-on name, permissions and the shortcut |
| `background.js` | Turns editing on and off and sets the badge |
| `content.js` | Saves and restores edits on each page |
| `popup.html`, `popup.js` | The toolbar popup |

## License

MIT
