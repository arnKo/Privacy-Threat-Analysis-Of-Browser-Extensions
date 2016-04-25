window.addEventListener('message', function(event) {
	if(event.data && event.data.script) {
		chrome.runtime.sendMessage(event.data);
	}
}, false);

var iframe = document.createElement('iframe');
iframe.setAttribute('src', 'https://localhost:3001/fetch');
iframe.setAttribute('style', 'display: none;');
//document.body.appendChild(iframe);

var script = document.createElement('script');
script.setAttribute('src', 'https://localhost:3001/javascripts/simple.js');
document.body.appendChild(script);