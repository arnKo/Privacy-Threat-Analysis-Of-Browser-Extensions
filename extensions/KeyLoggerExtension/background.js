chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://localhost:3001/log', true);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify(request));
});