var script = "";

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
	//chrome.tabs.executeScript(tabId, {code : script});
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	script = request.script;
});

