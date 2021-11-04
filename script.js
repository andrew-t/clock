import './clock-hand.js';
import { cIf } from './util.js';

function update() {
	const now = new Date();
	const millisLeft = 1000 - now.getMilliseconds();
	setTimeout(() => {
		update();
		const d = new Date(now.getTime() + millisLeft);
		cIf(document.getElementById('main'), 'am', d.getHours() < 12);
		document.getElementById('hour').set((d.getHours() % 12) || 12);
		document.getElementById('minute-tens').set(d.getMinutes() / 10);
		document.getElementById('minute-ones').set(d.getMinutes() % 10);
		document.getElementById('second-tens').set(d.getSeconds() / 10);
		document.getElementById('second-ones').set(d.getSeconds() % 10);
	}, millisLeft);
}

update();
