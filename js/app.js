const arr = Array(9).fill(0);
let step = 1;

arr.forEach((el, i) => {
	const div = document.createElement('div');
	div.setAttribute('data-n', i);
	ttt.append(div);
});

function click (e) {
	const target = +e.target.getAttribute('data-n');
	if (arr[target] !== 0) return;
	arr[target] = step;
	draw();
	winner(step);
	step = step === 1 ? 2 : 1;
};

const tttDiv = ttt.querySelectorAll('div');

function draw () {
	arr.forEach((el, i) => {
		switch (el) {
			case 1:
				tttDiv[i].textContent = 'X';
				break;
			case 2:
				tttDiv[i].textContent = 'O';
				break;
		}
	});
};

function winner (step) {
	const winnerArr = ['012', '345', '678', '036', '147', '258', '048', '246'];
	const index = [];
	arr.forEach((el, i) => {
		if(el === step) index.push(i);
	});
	for (let j = 0; j < winnerArr.length; j++) {
		const winPattern = winnerArr[j];
		let count = 0;
		winPattern.split('').forEach(item => {
			if (index.includes(+item)) count++;
		});
		if (count === 3) {
			showWin(step);
			return
		};
	}
	if (!arr.includes(0)) showDraw();
};

function showWin(step) {
	document.querySelector('.out').textContent = 'Победил ' + (step === 1 ? 'крестик !' : 'нолик !');
	ttt.removeEventListener('click', click);
	ttt.style.opacity = .5;
};

function showDraw () {
	document.querySelector('.out').textContent = 'Ничья';
	ttt.removeEventListener('click', click);
	ttt.style.opacity = .5;
}

ttt.addEventListener('click', click);
document.querySelector('.reset').addEventListener('click', () => location.reload());