var box = document.createElement('div');
document.body.appendChild(box);
box.id = 'aliSearchAddon';

console.log(document.location);
if (document.location.pathname === '/wholesale') {
	var btn = document.createElement('button');
	btn.id = 'btnUnitPrice';
	btn.appendChild(document.createTextNode('Unit price'));
	btn.classList.add('as-button');
	box.appendChild(btn);

	btn.addEventListener('click', updateUrl);

	function updateUrl() {
		//add to search
		document.location.search = insertParam('isUnitPrice', 'y');

		//SortType=price_asc
		//about:debugging
	}
}

function insertParam(key, value) {
	key = encodeURIComponent(key); 
	value = encodeURIComponent(value);

	var kvp = document.location.search.substr(1).split('&');
	var i = kvp.length; 
	while (i--) {
		var x = kvp[i].split('=');

		if (x[0] === key) {
			x[1] = value;
			kvp[i] = x.join('=');
			break;
		}
	}

	if (i < 0) { 
		kvp[kvp.length] = [key, value].join('='); 
	}

	//this will reload the page, it's likely better to store this until finished
	return kvp.join('&');
}
