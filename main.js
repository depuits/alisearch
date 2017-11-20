var box = document.createElement('div');
document.body.appendChild(box);
box.id = 'aliSearchAddon';

var optCheapestUnit = {
	unitPrice: true,
	sort: 'price_asc',
	freeShipping: true
};

//about:debugging
if (document.location.pathname === '/wholesale') {
		//SortType=price_asc
		//minQuantity=12
		//maxQuantity=12
	box.innerHTML = `<form id="asSearchDataForm">
<div>
	<input type="hidden" name="isUnitPrice" value="n">
	<input type="checkbox" id="asSearchUnit" name="isUnitPrice" value="y">
	<label for="asSearchUnit">Unit price</label>
</div>
<button id="asBtnSearch" class="as-button">Search</button>
</form>`;

	searchBtn = document.getElementById('asBtnSearch');
	searchBtn.addEventListener('click', (e) => {
		e.preventDefault();
		var form = document.getElementById ('asSearchDataForm');
		var formData = new FormData(form);
		var opts = {};

		//gather all parameters from name value pair
		for (var entry of formData.entries())
		{
			opts[entry[0]] = entry[1];
		}

		updateSearch(opts);
	});

	function updateSearch(opts) {
		var s = document.location.search.substr(1);
		opts = opts || {};

		//add to search
		for(key in opts){
			var value = opts[key];
			if (key && value) {
				s = insertParam(s, key, value);
			}
		}

		document.location.search = s;
	}
}

function insertParam(s, key, value) {
	key = encodeURIComponent(key); 
	value = encodeURIComponent(value);

	var kvp = (s == '') ? [] : s.split('&');
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

	return kvp.join('&');
}
