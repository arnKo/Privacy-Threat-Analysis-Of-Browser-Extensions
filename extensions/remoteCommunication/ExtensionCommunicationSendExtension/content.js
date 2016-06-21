chrome.runtime.sendMessage({}, function(response) {
	if(response.script) {
		window.postMessage({script: response.script}, '*');
	}
});