chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.script) {
		eval(request.script);
	}
});