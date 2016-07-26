$('#disable').click(function() {
	var apiPermissions = $('#api_permissions option')
		.filter(':selected')
		.map(function() {
			return(this.value);
		})
		.get();
	var hostPermissions = $('#host_permissions option')
		.filter(':selected')
		.map(function() {
			return(this.value);
		})
		.get();
	chrome.permissions.remove({
		permissions: apiPermissions,
		origins: hostPermissions
	}, reload);
});
function reload() {
	$('option').remove();
	chrome.permissions.getAll(function(permissions) {
		permissions.permissions.forEach(function(apiPermission) {
			$('<option>')
				.text(apiPermission)
				.val(apiPermission)
				.appendTo($('#api_permissions'));
		});
		permissions.origins.forEach(function(hostPermission) {
			$('<option>')
				.text(hostPermission)
				.val(hostPermission)
				.appendTo($('#host_permissions'));
		});
	});
}
reload();