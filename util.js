export function el(parent, ...classNames) {
	const el = document.createElement('div');
	for (const className of classNames)
		el.classList.add(className);
	parent.appendChild(el);
	return el;
}

export function cIf(el, className, condition) {
	if (condition) el.classList.add(className);
	else el.classList.remove(className);
}

export function style(css) {
	const el = document.createElement('style');
	el.appendChild(document.createTextNode(css));
	return el;
}
