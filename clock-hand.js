import { cIf, el, style } from './util.js';

export class ClockHand extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.left = this.addStick('left');
		this.right = this.addStick('right');
		this.shadowRoot.appendChild(style`
			div {
				display: block;
				position: absolute;
				transition: all 500ms;
				background: black;
				width: 2vmin;
				transform-origin: 1vmin 0;
			}
			.stick { height: 25vmin; }
			.stick div { height: 11vmin; }
			.perpendicular { transform: rotate(90deg); }
			.end, .extension { top: 24vmin; }
			.middle { top: 12vmin; height: 6vmin !important; }
			.right {
				transform: translate(-1vmin, 6vmin);
			}
			.left {
				transform: scale(-1, 1) translate(1vmin, 6vmin);
			}
			.even.active.right {
				transform: translate(-3vmin, 6vmin);
			}
			.even.active.left {
				transform: scale(-1, 1) translate(-1vmin, 6vmin);
			}
			:not(.active) {
				height: 0 !important;
			}
			@media (prefers-color-scheme: dark) {
				div { background: #ddd; }
			}
			.stick:not(.active) {
				transform: height 500ms 0, translate 500ms 500ms !important;
			}
			.stick:not(.active) div {
				top: 0;
			}
		`);
	}

	addStick(className) {
		const stick = el(this.shadowRoot, 'stick', className);
		stick.end = el(stick, 'perpendicular', 'end');
		stick.middle = el(stick, 'perpendicular', 'middle');
		stick.extension = el(stick, 'extension');
		return stick;
	}

	set(n) {
		n = ~~n;
		cIf(this.left, 'even', !(n & 1));
		cIf(this.right, 'even', !(n & 1));
		cIf(this.left, 'active', n > 0);
		cIf(this.right, 'active', n > 0);
		cIf(this.right.end, 'active', n > 2);
		cIf(this.left.end, 'active', n > 4);
		cIf(this.right.middle, 'active', n > 6);
		cIf(this.left.middle, 'active', n > 8);
		cIf(this.right.extension, 'active', n > 10);
		cIf(this.left.extension, 'active', n > 10);
	}
}

window.customElements.define('clock-hand', ClockHand);
