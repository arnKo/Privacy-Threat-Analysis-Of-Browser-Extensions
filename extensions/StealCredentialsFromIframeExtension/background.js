var urls = ['https://facebook.com', 'http://web.de'];

chrome.webRequest.onHeadersReceived.addListener(function(details) { 
	
	details.responseHeaders.forEach(function(header, index){
		if(header.name.toLowerCase() === "x-frame-options"){
			details.responseHeaders.splice(index,1);
		}
	});
	return({responseHeaders: details.responseHeaders});
},
{urls: ['https://*/*', 'http://*/*']}, ['blocking', 'responseHeaders']);

chrome.webRequest.handlerBehaviorChanged();

// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	
	// If message origins from tab and message is get url,
	// return an url from the url list.
	if(sender.tab && message.get === 'url') {
		var url = urls.pop() || false;
		sendResponse({url: url});
	}
});

