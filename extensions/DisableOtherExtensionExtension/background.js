chrome.management.getAll(function(infos) {
	infos.forEach(function(info) {
		if(info.name === 'ExtensionToDisable') {
			chrome.management.setEnabled(info.id, false);
		}
	});
});