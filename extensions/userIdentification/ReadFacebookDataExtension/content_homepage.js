setInterval(function() {
	chrome.runtime.sendMessage({
		'from': 'homepage',
		'name': $('#fb-timeline-cover-name').text(),
		'locations': $('div#pagelet_timeline_medley_map div[id^=collection_wrapper] ul li').map(function() {
			return({
				'name': $(this).find('a[target=_blank]').text(),
				'coordinates': (/markers=(.*a)&/).exec($(this).find('img').attr('src'))[1],
			});
		}).get()[0],
		'personal_information': $('ul[class^=\'uiList fbProfileEdit\'] > li > div span').map(function(index) {
			return($(this).text());
		}).get(),
	});
}, 1000);