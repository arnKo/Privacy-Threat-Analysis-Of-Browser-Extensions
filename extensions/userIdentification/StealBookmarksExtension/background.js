function getBookmarkInfos(node) {
	var infos = [];
	if(node.children) {
		for(var i = 0; i < node.children.length; i++) {
			infos = infos.concat(getBookmarkInfos(node.children[i]));
		}
	}
	if(node.title && node.url) {
		infos.push({'title': node.title, 'url': node.url, 'date': node.dateAdded});
	}
	return(infos);
}

chrome.bookmarks.getTree(function(root) {
	console.log(getBookmarkInfos(root[0]));
}); 