# YT-Shorts-Blocker
Firefox extension hides YT videos with a play time below a specified duration.

> Version 1.4
> Manifest v2

## Summary
If you find yourself getting distracted by short videos while working/studing this addon can help you manage what content you are recommended when using Youtube. This addon was originally as a project for my own personal use but please feel free to use this addon yourself if you prefer to be recommended longer form content.

## Principles
The `manifest.json` defines CSS and JS files to be injected when either the desktop or mobile Youtube sites are opened. The JS files read the browser storage to retrieve the extension config which is then used to dynamically add custom CSS to the page header. The custom CSS selects videos from the page based on their `aria-label` and the extension config which are then obscured.
