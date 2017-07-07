// TODO: listen for clicks out of nav

'use strict';

document.getElementById('menuButton').onclick = function() {
	var e = document.getElementById('header-down');

	if ( window.getComputedStyle(e).display.startsWith('none') ) {
		e.classList.remove("hidden-sm-down");
	} else {
		e.classList.add("hidden-sm-down");
	}
};