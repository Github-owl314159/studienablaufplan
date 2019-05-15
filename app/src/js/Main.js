const app = () => {
	let buttonArr = [];
	for (let i = 0; i < 6; i++) {
		buttonArr[i] = [];
		for (let j = 0; j < 6; j++) {
			buttonArr[i][j] = document.getElementById(`module-${i + 1}-${j + 1}`);
			buttonArr[i][j].addEventListener("click", (event) => {
				console.log(event);
			});
		}
	}

	// Testumgebung
	buttonArr[0][0].addEventListener("click", () => {
		const body = document.getElementsByTagName("body");
		const testDiv =	document.createElement("div");
		body[0].appendChild(testDiv);
	});
	//  Ende von Testumgebung
};

app();
