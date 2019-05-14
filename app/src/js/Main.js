const app = () => {
	let buttonArr = [];
	for (let i = 0; i < 6; i++) {
		buttonArr[i] = [];
		for (let j = 0; j < 6; j++) {
			buttonArr[i][j] = document.getElementById(`module-${i + 1}-${j + 1}`);
		}
	}
};

app();
