
var queryInfo = {
	currentWindow : false,
	windowType: "normal"
}

var createProperties = {
	url: "http://localhost:3000/login"
}

var done = false;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	
	if(!done) {
		chrome.tabs.query(queryInfo, function (tabs) {
			if(tabs.length > 0) {
				var tab = tabs[0];
				createProperties.windowId = tab.windowId;
				done = true;
				chrome.tabs.create(createProperties, function(tab) {		
					setTimeout(function() {
						chrome.tabs.remove(tab.id)
					}, 2000);
				});
				
			} 
		});
	}
});