chrome.runtime.onMessage.addListener(function(message, sender) {
	chrome.tabs.executeScript(sender.tab.id, {
		'code': 'document.body.id==="tinymce"?{"body": document.body.innerText}:null',
		'allFrames': true
	}, function(results) {
		for(var i = 0; i < results.length; i++) {
			if(results[i] && results[i].body) {
				message.body = results[i].body;
				send(message);
			}
		}
	});
});

function send(m) {console.log(m)}