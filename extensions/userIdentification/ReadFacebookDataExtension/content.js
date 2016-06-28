if(window.location.host === 'www.facebook.com') {
	$(document).ready(function() {
		chrome.runtime.sendMessage({
			'name': $('#fb-timeline-cover-name').text(),
			'homepage': $('div[data-click = profile_icon] a').attr('href'),

		});
	});

	setInterval(function() {
		var locations = $('div#pagelet_timeline_medley_map div[id^=collection_wrapper] ul li').map(function() {
			var name = $(this).find('a[target=_blank]').text();
			var coordinates = (/markers=(.*)&/).exec($(this).find('img').attr('src'));
			return({ 'name': name, 'coordinates': coordinates ? coordinates[1] : 'not found' });
		}).get();
		var personalInformation = $('ul[class^=\'uiList fbProfileEdit\'] > li > div').map(function(index) {
			var entry = $(this).find('span');
			return({ 'name': $(entry[0]).text(), 'value': $(entry[1]).text() });
		}).get();
		var friends = $('div.fbChatOrderedList ul li a div:nth-child(3)').map(function(){
			return({ 'name': $(this).text() });
		}).get();
		
		chrome.runtime.sendMessage({
			'dynamic': {
				'locations': locations,
				'personal_information': personalInformation,
				'friends': friends,
			}
		});
	}, 1000);
}