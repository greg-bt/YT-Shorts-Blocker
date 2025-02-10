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
            ${res.homepage ? "" : 'div[tab-title="Home"],'}
            ${res.length > 0 ? 'ytm-rich-item-renderer[timestamp^="#:"],ytm-video-with-context-renderer[timestamp^="#:"],'.repeat(res.length).replace(/#/g, () => index.pop()  ): ""}

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

// Attach video length to elements for filtering
function findVideos() {
    for (let timestamp of document.getElementsByTagName("ytm-thumbnail-overlay-time-status-renderer")) {
        try {
            if ( (timestamp.textContent.match(/:/g)||[]).length > 1 ) continue;
            timestamp.closest(`ytm-${/watch/.test(window.location.href) ? "video-with-context" : "rich-item"}-renderer`).setAttribute("timestamp", timestamp.textContent)
        } catch { break }
    }
    window.setTimeout(findVideos, 100);
}
findVideos()