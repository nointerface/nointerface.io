'use strict';

const jump = require('jump.js');

var mq = window.matchMedia( "(max-width: 768px)" );

var e = document.getElementById('header-down');

function toggleNavVisibility() {
	console.log('toggling!');
	if ( window.getComputedStyle(e).display.startsWith('none') ) {
		e.classList.remove("d-none","d-md-flex");
	} else {
		e.classList.add("d-none","d-md-flex");
	}
};

if (mq.matches) {

	// Show/hide nav if user taps on menu button
	document.getElementById('menuButton').onclick = function() {
		toggleNavVisibility();
	};

	// Close nav if user taps out of it
	document.getElementById('main').onclick = function() {
		if ( !window.getComputedStyle(e).display.startsWith('none') ) {
			e.classList.add("d-none","d-md-flex");
		};
	};

};

// Tapping in nav scrolls down to anchor
// No-JS browsers jump directly to anchor
Array.from(document.getElementById('header-down').children).forEach(
	(elem, index) => {
		elem.onclick = function() {
			toggleNavVisibility();
			jump(elem.getAttribute("href"), {
				// a11y: true
			});
			return false;
		};
	}
);

// Tapping header scrolls back to top
document.getElementById('logo').onclick = () => {
	jump("header");
	return false;
};
