
window.addEventListener('message', function(event) {
	if(event.data.identifier) {
		
		// get list of identifiers
		chrome.storage.sync.get('identifiers', function(result) {
				
			// check if identifier array was stored already
			var identifiers = result.identifiers !== undefined ? result.identifiers : {};
			
			// send identifiert array to web page
			window.postMessage({'identifiers' : identifiers }, '*');
			
			// add new identifier to array
			identifiers[event.data.identifier] = true;
			
			// save identifiert array
			chrome.storage.sync.set({'identifiers' : identifiers});
		});
	}
}, false);