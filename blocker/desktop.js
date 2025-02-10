/*   ###   Redirect /shorts/ page   ###   */

function redirect () {
    const url = window.location.href;
    if (url.includes("/shorts/")) window.location.replace(url.replace("shorts/", "watch?v="));
}

window.addEventListener('yt-navigate-start', redirect);
redirect();


/*   ###   Filter Videos   ###   */

function applyFilter() {
    browser.storage.sync.get().then( res => {

        // Set inital values if first usage
        if (typeof res.length != "number") {
            browser.storage.sync.set({
                length: 2,
                opacity: 5,
                homepage: true
            });
            location.reload();
        }

        // Remove existing sheet
        try {document.getElementById("shorts-blocker-stylesheet").remove() } catch {}

        // Create and add new sheet
        let style = document.head.appendChild(document.createElement("style"))
        style.id = "shorts-blocker-stylesheet"

        // Populate sheet
        var index = [...Array(res.length).keys()].flatMap(i=>[i+1,i+1])
        style.sheet.insertRule(`
            ${res.homepage ? "" : 'ytd-browse[page-subtype="home"],'}
            ${res.length > 0 ? 'ytd-rich-item-renderer:has(span[aria-label^="# minute"]),ytd-compact-video-renderer:has(span[aria-label^="# minute"]),'.repeat(res.length).replace(/#/g, () => index.pop()  )
            + 'ytd-rich-item-renderer:has(span[aria-label*="second"]:not([aria-label*="minute"]):not([aria-label*="hour"])),ytd-compact-video-renderer:has(span[aria-label*="second"]:not([aria-label*="minute"]):not([aria-label*="hour"])),': ""}
            ytd-rich-grid-slim-media, .shorts-blocker-target
            {
                user-select: none;
                pointer-events: none !important;
                opacity: ${res.opacity}% !important;
                ${(res.opacity == 3 ? "display: none !important": "")}
            }`
        )
    });
}

// Apply changes immediately
browser.storage.onChanged.addListener(applyFilter)
applyFilter()