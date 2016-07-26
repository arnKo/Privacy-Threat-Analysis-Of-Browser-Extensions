chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.permissions.request({
		permissions: ['tabs'],
		origins: [tab.url]
	},function(granted) {
		if(granted) {
			chrome.tabs.executeScript(tab.id, {file: 'jquery.js'});
		}
	});
});