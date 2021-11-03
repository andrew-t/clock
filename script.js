import './clock-hand.js';
import { cIf } from './util.js';

setInterval(() => {
	const d = new Date();
	cIf(document.getElementById('main'), 'am', d.getHours() < 12);
	document.getElementById('hour').set((d.getHours() + 12) % 12);
	document.getElementById('minute-tens').set(d.getMinutes() / 10);
	document.getElementById('minute-ones').set(d.getMinutes() % 10);
	document.getElementById('second-tens').set(d.getSeconds() / 10);
	document.getElementById('second-ones').set(d.getSeconds() % 10);
}, 1000);
