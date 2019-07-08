const app = () => {
	// global variable: NUMBER_OF_MODULES, shows the current number of children of the grid-container
	NUMBER_OF_MODULES = 0;
	$("#addModule").on("click", evt => {
		evt.preventDefault();
		$(".grid-container").append(
			`<a href='#' id='module-${NUMBER_OF_MODULES}'><p>WPF</p></a>`
		);
		$(`#module-${NUMBER_OF_MODULES}`).on("click", () => {
			$(".addModule-modal")
				.attr("data-module", `${NUMBER_OF_MODULES}`)
				.css("display", "flex");
			$(".bg-dimmed").css("display", "initial");
		});
		NUMBER_OF_MODULES++;
	});

	// add eventListener to buttons
	$("#first").on("click", () => {
		$(".addModule-modal").css("display", "none");
		$(".bg-dimmed").css("display", "none");
	});

	$("#second").on("click", evt => {
		evt.preventDefault();
		let modulName = $("#modul-name-div input").val();
		let ects = $("#modul-ects-div").val();
		if (modulName && ects) {
			console.log("ok");
			return;
		}
		console.log("Please fill in all fields.");
		$(".addModule-modal-content").append(
			"<p id='reqWarning' style='margin-top: 20%;'>Please fill in all fields.</p>"
		);
	});

	$("#x").on("click", () => {
		$(".addModule-modal").css("display", "none");
		$(".bg-dimmed").css("display", "none");
	});

	$(".fa-pencil-alt").on("click", () => {
		let content = $("#schedule-name").text();
		$("#schedule-name").replaceWith(
			`<input id='schedule-name-input' type='text' value='${content}'>`
		);
		$("#schedule-name-input").focus();
		$("#schedule-name-input")
			.css("font-size", "145%")
			.css("margin", "3% 0 3% 0")
			.css("font-weight", "bold")
			.on("focusout keypress", evt => {
				if (evt.type === "focusout" || evt.keyCode === 13) {
					let content = $("#schedule-name-input").val();
					$("#schedule-name-input").replaceWith(
						`<p id='schedule-name'>${content}</p>`
					);
				}
			})
			.on("change", () => {
				console.log("change");
			});
	});

	// sidebar
	$("#sidebarButton").on("click", () => {
		if (!$(".sidebar").hasClass("show")) {
			$(".sidebar").addClass("show");
		}
		else {
			$(".sidebar").removeClass("show");
		}
	});

	$(".expander h4").on("click", () => {
		$(this)
			.siblings("ul")
			.toggleClass("seen");
	});
	$(".expander li").on("click", () => {
		$(this)
			.toggleClass("selected")
			.siblings("li")
			.removeClass("selected");
	});
	// sidebar end
};

app();
