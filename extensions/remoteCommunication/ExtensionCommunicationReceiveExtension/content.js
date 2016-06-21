window.addEventListener('message', function(event) {
	if(event.data.script) {
		chrome.runtime.sendMessage({script: event.data.script});
	}
});