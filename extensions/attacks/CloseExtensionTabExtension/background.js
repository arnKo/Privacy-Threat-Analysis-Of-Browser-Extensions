chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(tab.url == 'chrome://extensions/') {
		chrome.tabs.update(tabId, {url: 'chrome://newtab'});
	}
});