// Range input elements
var lengthInput = document.getElementsByTagName("input")[0]
var opacityInput = document.getElementsByTagName("input")[1]
var videosInput = document.getElementsByTagName("input")[2]
var homepageInput = document.getElementsByTagName("input")[3]

// Update bottom text on change
videosInput.oninput = () => { videosInput.nextElementSibling.textContent = ( videosInput.checked ? "Filtering All YT Videos" : "Filtering Recomended Only") }
homepageInput.oninput = () => { homepageInput.nextElementSibling.textContent = ( homepageInput.checked ? "Enabled" : "Disabled") }
lengthInput.oninput = () => { lengthInput.nextElementSibling.textContent = ( lengthInput.value == 0 ? "All videos are fully visible" : `Hiding videos under ${lengthInput.value} minutes` ) }
opacityInput.oninput = () => {
	opacityInput.nextElementSibling.textContent = ( opacityInput.value == 3 ? "Fully Hidden" : "This visible" )
	opacityInput.nextElementSibling.style.opacity = ( opacityInput.value == 3 ? 1 : opacityInput.value / 100 )
}

// Save changes to browser storage
lengthInput.onchange = saveChanges
opacityInput.onchange = saveChanges
videosInput.onchange = saveChanges
homepageInput.onchange = saveChanges

async function saveChanges() {
	await browser.storage.sync.set({
		length:  lengthInput.valueAsNumber-1,
		opacity: opacityInput.valueAsNumber,
		allvideos: videosInput.checked,
		homepage: homepageInput.checked
	});
}

// Update input elements when popup opens
document.addEventListener("DOMContentLoaded", ()=> {
	browser.storage.sync.get().then( res => {

		lengthInput.value = res.length+1;
		lengthInput.oninput()

		opacityInput.value = res.opacity;
		opacityInput.oninput()

		videosInput.checked = res.allvideos;
		videosInput.oninput()

		homepageInput.checked = res.homepage;
		homepageInput.oninput()

	});
})