/*   ###   Redirect /shorts/ page   ###   */

function redirect() {
	const url = window.location.href
	if (url.includes("/shorts/")) window.location.replace(url.replace("shorts/", "watch?v="))
}

window.addEventListener('yt-navigate-start', redirect)
redirect()

/*   ###   Filter Videos   ###   */

console.log("YT-Shorts-Blocker Active")

function applyFilter() {
	browser.storage.sync.get().then(res => {

		// Set inital values if first usage
		if (typeof res.length != "number") {
			browser.storage.sync.set({
				length: 2,
				opacity: 5,
				allvideos: false,
				homepage: true
			});
			location.reload()
		}

		// Remove existing sheet
		try { document.getElementById("shorts-blocker-stylesheet").remove() } catch { }

		// Create and add new sheet
		let style = document.head.appendChild(document.createElement("style"))
		style.id = "shorts-blocker-stylesheet"

		console.log(res.length)

		// Populate sheet
		var index = [...Array(res.length).keys()].flatMap(i => [i + 1, i + 1, i + 1])

		let plat = (window.location.host.includes("www") ? "ytd" : "ytm")
		style.sheet.insertRule(

			// Generate CSS selectors

			// Homepage
			(res.homepage ? "" : "ytd-browse[page-subtype='home'],div[tab-title='Home'],") +
	
			// Filter Videos
			(res.length >= 0 ?

				// All Videos
				((res.allvideos ? `${(plat == "ytm" ? "ytm-compact" : "ytd")}-video-renderer:has(${(plat == "ytm"? "h4 span" : "h3 a")}[aria-label*=" # minute"]:not([aria-label*="minutes ago"]):not([aria-label*=" hour,"]):not([aria-label*=" hours,"])),` : "") +

				// Recommended Videos
				`${plat}-rich-item-renderer:has(h3 ${(plat == "ytm"? "span" : "a")}[aria-label*=" # minute"]:not([aria-label*="minutes ago"]):not([aria-label*=" hour,"]):not([aria-label*=" hours,"])),${plat}-${(plat=="ytm"?"video-with-context":"compact-video")}-renderer:has(h3 span[aria-label*=" # minute"]:not([aria-label*="minutes ago"]):not([aria-label*=" hour,"]):not([aria-label*=" hours,"])),`).repeat(res.length).replace(/#/g, () => index.pop()) +
				`${plat}-rich-item-renderer:has(h3 ${(plat == "ytm"? "span" : "a")}[aria-label*=" seconds"]:not([aria-label*=" minutes,"]):not([aria-label*=" hour,"]):not([aria-label*=" hours,"])),${plat}-${(plat=="ytm"?"video-with-context":"compact-video")}-renderer:has(h3 span[aria-label*=" seconds"]:not([aria-label*=" minutes,"]):not([aria-label*=" hour,"]):not([aria-label*=" hour,"])),`
			: "") +

			// Style
			`ytd-rich-grid-slim-media, .shorts-blocker-target {
				user-select: none;
				pointer-events: none !important;
				opacity: ${res.opacity}% !important;
				${(res.opacity == 3 ? "display: none !important" : "")}
			}`
		)
	})
}

// Apply changes immediately
browser.storage.onChanged.addListener(applyFilter)
applyFilter()