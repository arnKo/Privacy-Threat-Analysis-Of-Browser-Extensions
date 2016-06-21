var TARGET_URL = 'https://localhost:3001/spam';
var counter = 0;

var iframe = document.createElement('iframe');
iframe.setAttribute('style', 'display:none;');
document.body.appendChild(iframe);
	
var interval = setInterval(function() {	
	iframe.setAttribute('src', TARGET_URL + '?seed=' + Math.random());
	
	counter++;
	if(counter === 100) {
		clearInterval(interval);
	}
}, 50);