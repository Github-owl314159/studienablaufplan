const app = () => {
	// add eventListener to every grid-cell
	let buttonArr = [];
	for (let i = 0; i < 6; i++) {
		buttonArr[i] = [];
		for (let j = 0; j < 6; j++) {
			buttonArr[i][j] = document.getElementById(`module-${i + 1}-${j + 1}`);
			buttonArr[i][j].addEventListener("click", event => {
				console.log(event);
			});
		}
	}
	// add eventListener to buttons
	const btnCancel = document.getElementById("first").addEventListener(
		"click",
		() => {
			console.log("clicked: btnCancel");
			location.href = "#";
		},
		false
	);

	// sidebar
	$("button").on("click", function () {
		$(".sidebar").toggleClass("show");
	});

	$(".expander h4").on("click", function () {
		$(this)
			.siblings("ul")
			.toggleClass("seen");
	});
	$(".expander li").on("click", function () {
		$(this)
			.toggleClass("selected")
			.siblings("li")
			.removeClass("selected");
	});
	// sidebar end
};

app();

// Testumgebung
const tabsystem = $(".tabsystem");
const tabs = $("div.tabs");
const addTab = $("#add").on("click", () => {
	// create tab
	$("#add").before('<li class="tabs"><a href="#">TEST</a></li>');
	if ($(".tabs").length === 5) {
		$("#add").detach();
	}
});
//  Ende von Testumgebung
