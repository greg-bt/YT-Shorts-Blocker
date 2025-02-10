# YT-Shorts-Blocker
Firefox extension hides YouTube shorts and any videos with a play time below the user specified duration. Functional on both mobile and desktop versions of Firefox and YouTube through the use of dynamically generated CSS.

> Version 1.4

> Manifest v2

## Download

**Daily Users:** `1,320 👥`
**Rating:** `4.1 ⭐`
**Weekly Downloads:** `27 💽`

Install via the [Mozilla Addons Page](https://addons.mozilla.org/en-GB/firefox/addon/yt-shorts-blocker/).

*If you find yourself getting distracted by short videos while working/studying this addon can help you manage what content you are recommended when using YouTube. This addon was originally as a project for my own personal use but please feel free to use this addon yourself if you prefer to be recommended longer form content.*


## Principles

> `./manifest.json`

Defines the CSS and JS files to be injected when either the desktop or mobile YouTube sites are opened. Established required browser permissions.

> `./blocker/selector.js`

Dynamically generates CSS based on the user's addon configuration and device when a new YouTube page is opened. The generated style is appended to the `<head>` document and selects video tiles based upon their `aria-label` content. Piggybacks off the `yt-navigate-start` window event to detect if a short has been opened.

> `./popup/*`

The HTML and JS behind the popup menu available in the browser extensions menu when browsing YouTube. Utilises the Web Storage API to store and retrieve user settings between sessions.

### Build
To build this project run:

```web-ext build```