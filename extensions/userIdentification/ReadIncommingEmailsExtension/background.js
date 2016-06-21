chrome.runtime.onMessage.addListener(function(message, sender) {
	if(message.mailOpened) {
		chrome.tabs.executeScript(sender.tab.id, { 'file': 'content.js'});
	}
	else {
		chrome.tabs.executeScript(sender.tab.id, {
			'code': 'window.frameElement && window.frameElement.id === "messageBody" ? {"body": document.body.innerText} : null',
			'allFrames': true
		}, function(results) {
			for(var i = 0; i < results.length; i++) {
				if(results[i] && results[i].body) {
					message.body = results[i].body;
					send(message);
				}
			}
		});
	}
});

function send(m) {console.log(m)}