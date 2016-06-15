function directCopy(str, mimetype) {
  document.oncopy = function(event) {
    event.clipboardData.setData(mimetype, str);
    event.preventDefault();
  };
  document.execCommand("Copy", false, null);
  document.oncopy = undefined;
}

function genericOnClick(info, tab) {
	var expr = "http://www.elitetorrent.net/torrent/([0-9]+)/.+";
	var re = new RegExp(expr);

	var res = re.exec(info.linkUrl);
	if (res != null) {
		//var repl = "$host/gt/et/$1.torrent";
		var repl = "http://www.elitetorrent.net/get-torrent/$1";
		var destUrl = repl;
		for (var ndx = 1; ndx < res.length; ndx++) {
			destUrl = destUrl.replace('$' + ndx, res[ndx]);
		}
		directCopy(destUrl, "Text");
	}
}

var id = chrome.contextMenus.create({"title": "Copia link al torrent", "contexts":["link"], "onclick": genericOnClick});
