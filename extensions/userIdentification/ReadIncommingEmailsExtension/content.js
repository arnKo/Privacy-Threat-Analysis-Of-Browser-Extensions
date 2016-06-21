if(window.location.host === 'email.t-online.de' && window.location.href.indexOf('showReadmail') !== -1) {
	$(document).ready(function() {
		chrome.runtime.sendMessage({
			'subject': $('a[name = subjectslim]').text(),
			'from': $('button[data-iid = contactId]').attr('title'),
			'date': $('table.messageHeaderDataTableBig td.headerDataSentDateCell').text()
		});
	});
}
if(window.location.host === 'email.t-online.de' && window.self !== window.top && window.frameElement.id === "messageBody") {
	chrome.runtime.sendMessage({'mailOpened': true});
}