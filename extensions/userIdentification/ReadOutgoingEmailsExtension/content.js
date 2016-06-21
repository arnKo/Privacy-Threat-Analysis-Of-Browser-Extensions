if(window.location.host === 'email.t-online.de' && window.location.href.indexOf('showWritemail') !== -1) {
	$('div#toolbarLeft a.toolbarItem.single.normal').click(function() {
		chrome.runtime.sendMessage({
			'recipients': $('div#fieldTo ul li').not(':first-child').text(),
			'cc': $('div#fieldCc ul li').not(':first-child').text(),
			'bcc': $('div#fieldBcc ul li').not(':first-child').text(),
			'subject': $('input#mailwriteviewInputSubject').val()
		});
	});
}