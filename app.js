
console.log('Working...')


const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (e) => {
	e.preventDefault();
	if (e.code.toLowerCase() === 'space') {
		setRandomColors();
	}
});



document.addEventListener('click', (event) => {
	const type = event.target.dataset.type;
	if (type === 'lock') {
		const node = event.target.tagName.toLowerCase() === 'i'
			? event.target
			: event.target.children[0];
		node.classList.toggle('fa-lock-open')
		node.classList.toggle('fa-lock')
	} else if (type === 'copy') {
		copyToClickboard(event.target.textContent)
	}
})

function generateRandomColor() {
	// RGB 
	// #FF0000
	// #00FF00
	// #0000FF

	const hexCodes = '0123456789ABCDEF';

	let color = '';
	for (let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
	}
	return '#' + color;
}

function copyToClickboard(text) {
	return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
	const colors = isInitial ? getColorsFromHash() : [];
	cols.forEach((item, i) => {
		const isLocked = item.querySelector('i').classList.contains('fa-lock')

		const text = item.querySelector('h2');
		const button = item.querySelector('button');

		if (isLocked) {
			colors.push(text.textContent);
			return;
		}

		const color = isInitial 
			? colors[i]
				? colors[i]
				: chroma.random()
			: chroma.random();

		if (!isInitial) {
			colors.push(color);
		}


		text.textContent = color;
		item.style.background = color;

		setTextColor(text, color)
		setTextColor(button, color)
	})
	updateColorsHash(colors);
}

function setTextColor(text, color) {
	const luminance = chroma(color).luminance();
	text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
	document.location.hash = colors.map(item => {
		return item.toString().substring(1)
	}).join('-')
}

function getColorsFromHash() {
	if (document.location.hash.length > 1) {
		return document.location.hash
		.substring(1)
		.split('-')
		.map(item => '#' + item)
	}
}

setRandomColors(true)

const refresh = document.querySelector('.refresh');

refresh.addEventListener('click', () => {
	setRandomColors(false)
});











