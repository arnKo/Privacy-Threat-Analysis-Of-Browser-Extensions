var script = null;

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		script = xhr.responseText;
	}
}
xhr.open('GET', 'https://localhost:3001/javascripts/extensionCommunication.js');
xhr.send();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(script) {
		sendResponse({script: script});
	}
});