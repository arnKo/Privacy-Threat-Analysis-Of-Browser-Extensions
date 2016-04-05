function printWarnings(extension, extensionDiv) {
	chrome.management.getPermissionWarningsById(extension.id, function(warnings) {			
			if(warnings.length === 0) {
				extensionDiv.innerHTML += '<p> No Warnings </p>';
			}
			else {
				extensionDiv.innerHTML += '<p> Warnings: </p> <ul><li>' + warnings.join('</li><li>') + '</li></ul>';
			}
		});	
}

function printExtensions(extensions) {
	for(var i in extensions) {
		var extension = extensions[i];

		var extensionDiv = document.createElement('div');
		document.body.appendChild(extensionDiv);
		
		extensionDiv.innerHTML = '<h3>' + extension.name + '</h3>';
		
		var permissions = extension.permissions.concat(extension.hostPermissions);
		
		for(var j in permissions) {
			permissions[j] = permissions[j].replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
		
		if(permissions.length === 0 ) {
			extensionDiv.innerHTML += '<p> No Permmissions </p>';
		}
		else {
			extensionDiv.innerHTML += '<p> Permissions: </p> <ul><li>' + permissions.join('</li><li>') + '</li></ul>';
		}

		
		printWarnings(extension, extensionDiv);
	}
}
document.addEventListener('DOMContentLoaded', function () {	
	chrome.management.getAll(function(extensions) {
		printExtensions(extensions);
	});
});