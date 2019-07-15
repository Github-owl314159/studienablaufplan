const $ = require("../../libs/jquery-3.4.1.js");
// global variable: NUMBER_OF_MODULES, shows the current number of children of the grid-container
let NUMBER_OF_MODULES = 0;

const app = () => {
	// eventlisteners
	$(".addModuleButton").on("click", addModule);

	$(".cancelButton").on("click", cancel);

	$(".confirmButton").on("click", confirm);

	$("#x").on("click", cancel);

	$("#cancel-sM").on("click", cancelSM);

	$(".fa-pencil-alt").on("click", changeText);

	$("#sidebarButton").on("click", toggleSidebar);

	$(".saveScheduleButton").on("click", saveSchedule);

	$("#deleteScheduleButton").on("click", deleteSchedule);

	$("#changeScheduleButton").on("click", changeScheduleButton);

	$("#cancel-scheduleModal").on("click", cancelScheduleModal);

	$("#confirmScheduleButton").on("click", confirmSchedule);

	$(".fa-arrow-left").on("click", leftArrow);

	$(".fa-arrow-right").on("click", rightArrow);

	// functions
	function addModule() {
		event.preventDefault();
		let i = NUMBER_OF_MODULES;
		$(".grid-container").append(
			`<a href='#' class='modules' id='module-${i}'><p>Wahlpflichtfach</p></a>`
		);
		$(`#module-${i}`).on("click", () => {
			let currentModule = `#${event.currentTarget.id}`;
			if ($(currentModule).text() === "Wahlpflichtfach") {
				$("#addModule").attr("data-module", currentModule);
				showModal("#addModule");
			}
			else if (!$("#sM-name p").length) {
				$("#showModule").attr("data-module", currentModule);
				$("#sM-name").append(
					`<p>${$(currentModule).attr("data-moduleName")}</p>`
				);
				$("#sM-name").append("<i class='fas fa-pencil-alt' id='iconSM'></i>");
				$("#sM-ects").append(`<p>${$(currentModule).attr("data-ects")}</p>`);
				$("#iconSM").on("click", changeTextSM);
				$("#deleteModuleButton").on("click", deleteModule);
				showModal("#showModule");
			}
			else {
				$("#showModule").attr("data-module", currentModule);
				$("#sM-name p").text($(currentModule).attr("data-moduleName"));
				$("#sM-ects p").text($(currentModule).attr("data-ects"));
				showModal("#showModule");
			}
		});
		NUMBER_OF_MODULES++;
		if (NUMBER_OF_MODULES === 1) {
			$(".saveScheduleButton").toggleClass("disabled");
		}
		if (NUMBER_OF_MODULES === 36) {
			$(".addModuleButton").toggleClass("disabled");
		}
	}

	function cancel() {
		hideModal("#addModule");
	}

	function cancelSM() {
		hideModal("#showModule");
	}

	function confirm(evt) {
		evt.preventDefault();
		let modulName = $("#addModule input[name=modulName]").val();
		let ects = $("#addModule input[name=modulEcts]").val();
		if (
			modulName
			&& ects
			&& modulName.search(",") === -1
			&& !duplicateExists(modulName)
		) {
			// AJAX call
			$.ajax({
				url: "/modules",
				type: "POST",
				data: JSON.stringify({ name: modulName, ects: ects }),
				cache: false,
				processData: false,
				contentType: "application/json",
				success: function () {
					let currentModule = $(".confirmButton")
						.parents("#addModule")
						.attr("data-module");
					$(currentModule).attr("data-moduleName", modulName);
					$(currentModule).attr("data-ects", ects);
					$(currentModule).text(modulName);
					hideModal("#addModule");
				},
				error: function (jqXHR, textStatus, err) {
					alert("Text status: " + textStatus + " , Error: " + err);
				}
			});
		}
		else {
			if (!$(".reqWarning").length) {
				$("#aM-content").append(
					"<p class='reqWarning' style='margin-top: 20%;'>Please fill in all fields and no special characters are allowed.</p>"
				);
			}
		}
	}

	function duplicateExists(name) {
		let n = NUMBER_OF_MODULES;
		for (let i = 0; i < n; i++) {
			if ($(`#module-${i}`).text() === name) {
				return true;
			}
		}
		return false;
	}

	function changeText() {
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
	}

	function changeTextSM() {
		let content = $("#sM-name p").text();
		$("#sM-name p").replaceWith(
			`<input id='sM-input' type='text' value='${content}'>`
		);
		$("#sM-input").focus();
		$("#sM-input")
			.css("font-weight", "bold")
			.on("focusout keypress", evt => {
				if (evt.type === "focusout" || evt.keyCode === 13) {
					let content = $("#sM-input").val();
					$("#sM-input").replaceWith(`<p>${content}</p>`);
				}
			})
			.on("change keypress", evt => {
				if (evt.keyCode === 13 || evt.type === "change") {
					let currentModule = $("#showModule").attr("data-module");
					let oldContent = $(currentModule).text();
					let newContent = $("#sM-input").val();
					let modulName = $(currentModule).attr("data-moduleName");
					// AJAX
					$.ajax({
						url: "/modules",
						type: "PUT",
						data: JSON.stringify({
							oldContent: oldContent,
							newContent: newContent
						}),
						cache: false,
						processData: false,
						contentType: "application/json",
						success: function () {
							console.log(`Changed name of module "${modulName}" in database.`);
							$(currentModule).attr("data-moduleName", newContent);
							$(currentModule).text(newContent);
						},
						error: function (jqXHR, textStatus, err) {
							alert("Text status: " + textStatus + " , Error: " + err);
						}
					});
				}
			});
	}

	function deleteModule() {
		event.preventDefault();
		let currentModule = $("#showModule").attr("data-module");
		let modulName = $(currentModule).attr("data-moduleName");
		let ects = $(currentModule).attr("data-ects");
		// AJAX
		$.ajax({
			url: "/modules",
			type: "DELETE",
			data: JSON.stringify({ name: modulName, ects: ects }),
			cache: false,
			processData: false,
			contentType: "application/json",
			success: function () {
				console.log(`Deleted module "${modulName}" in database.`);
			},
			error: function (jqXHR, textStatus, err) {
				alert("Text status: " + textStatus + " , Error: " + err);
			}
		});
		$(currentModule).text("Wahlpflichtfach");
		$(currentModule).attr("data-moduleName", "");
		$(currentModule).attr("data-ects", "");
		hideModal("#showModule");
	}

	function saveSchedule() {
		event.preventDefault();
		// create object which contains the data of the schedule
		// check for duplicates
		let data = {};
		data.name = $("#schedule-name").text();
		data.modules = [];
		data.semester = 1;
		let totalEcts = 0;
		for (let i = 0; i < NUMBER_OF_MODULES; i++) {
			if ($(`#module-${i} p`).text() === "Wahlpflichtfach") {
				data.modules.push({ name: "Wahlpflichtfach", ects: 5 });
				totalEcts += 5;
			}
			else {
				let moduleName = $(`#module-${i}`).attr("data-moduleName");
				let moduleEcts = $(`#module-${i}`).attr("data-ects");
				data.modules.push({
					name: moduleName,
					ects: moduleEcts
				});
				totalEcts += moduleEcts;
			}
			if (totalEcts / 30 > 1) {
				data.semester++;
				let rest = totalEcts % 30;
				totalEcts = rest;
			}
		}
		// AJAX
		$.ajax({
			url: "/schedules",
			type: "POST",
			data: JSON.stringify({ data }),
			cache: false,
			processData: false,
			contentType: "application/json",
			success: function () {
				console.log("Saved new schedule.");
				alert(`Successfully saved "${data.name}".`);
			},
			error: function (jqXHR, textStatus, err) {
				alert("Text status: " + textStatus + " , Error: " + err);
			}
		});
	}

	function deleteSchedule() {
		let scheduleName = $("#schedule-name").text();
		$.ajax({
			url: "/schedules",
			type: "DELETE",
			data: JSON.stringify({ scheduleName }),
			cache: false,
			processData: false,
			contentType: "application/json",
			success: function () {
				alert(`Successfully deleted "${scheduleName}".`);
				$(".grid-container")
					.children()
					.remove();
				$("#schedule-name").text("My first schedule");
			},
			error: function (jqXHR, textStatus, err) {
				alert("Text status: " + textStatus + " , Error: " + err);
			}
		});
	}

	function changeScheduleButton() {
		$.ajax({
			url: "/schedules",
			type: "GET",
			cache: false,
			success: function (res) {
				console.log(res);
				if (res.length === 0) {
					$("#scheduleModal-list").append("<p>NO DATA</p>");
				}
				else if (res.length > 8) {
					// pagination
					$("#scheduleModal-list").attr("data-list", res);
					$("#scheduleModal-list").attr("data-page", 1);
					for (let i = 0; i < 8; i++) {
						$("#scheduleModal-list").append(`
          <div class="scheduleModal-entry" id="schedule-${i}">
            <label>Name:</label>
            <p>${res[i]}</p>
          </div>
						`);
						$(`#schedule-${i}`).on("click", chooseSchedule);
					}
					if (!$(".fa-arrow-right").hasClass("disabled")) {
						$(".fa-arrow-right").toggleClass("disabled");
					}
				}
				else {
					// render list with entries
					for (let i = 0; i < res.length; i++) {
						$("#scheduleModal-list").append(`
          <div class="scheduleModal-entry" id="schedule-${i}">
            <label>Name:</label>
            <p>${res[i]}</p>
          </div>
						`);
						$(`#schedule-${i}`).on("click", chooseSchedule);
					}
				}
				showModal("#scheduleModal");
			},
			error: function (jqXHR, textStatus, err) {
				alert("Text status: " + textStatus + " , Error: " + err);
			}
		});
	}

	function chooseSchedule() {
		let currentSchedule = "#" + event.currentTarget.id;
		let siblings = $(currentSchedule).siblings(".focusSchedule");
		siblings.removeClass("focusSchedule");
		if (!$(currentSchedule).hasClass("focusSchedule")) {
			$(currentSchedule).toggleClass("focusSchedule");
		}
		console.log(event.target);
		if ($("#confirmScheduleButton").hasClass("disabled")) {
			$("#confirmScheduleButton").toggleClass("disabled");
		}
	}

	function confirmSchedule() {
		// wip
	}

	function cancelScheduleModal() {
		if (!$("#confirmScheduleButton").hasClass("disabled")) {
			$("#confirmScheduleButton").addClass("disabled");
		}
		$("#scheduleModal-list")
			.children()
			.remove();
		hideModal("#scheduleModal");
	}

	function leftArrow() {
		if (!$("#confirmScheduleButton").hasClass("disabled")) {
			$("#confirmScheduleButton").addClass("disabled");
		}
		$("#scheduleModal-list")
			.children()
			.remove();

		let currentPage = $("#scheduleModal-list").attr("data-page");
		currentPage--;

		// let n = ["a","b","c","d","e","f","g","h","i","j","k"];
		// let arr2 = [];
		// let cache2 = [];
		// for(let i = 0; i < n.length;i++) {
		// 	if(i%8 === 0 && i !== 0){
		// 		arr2.push(cache2);
		// 		cache2 = [];
		// 	}
		// 	cache2.push(n[i]);
		// }

		let i = currentPage * 8;
		let list = $("#scheduleModal-list").attr("data-list");
		let listArray = list.split(",");
		let newListArray = listArray.slice(i, listArray.length);
		if (newListArray.length > 8) {
			for (let i = 0; i < 8; i++) {
				$("#scheduleModal-list").append(`
          <div class="scheduleModal-entry" id="schedule-${i}">
            <label>Name:</label>
            <p>${newListArray[i]}</p>
          </div>
						`);
				$(`#schedule-${i}`).on("click", chooseSchedule);
			}
			$("#scheduleModal-list").attr("data-page", currentPage + 1);
		}
		else {
			for (let i = 0; i < newListArray.length; i++) {
				$("#scheduleModal-list").append(`
          <div class="scheduleModal-entry" id="schedule-${i}">
            <label>Name:</label>
            <p>${newListArray[i]}</p>
          </div>
						`);
				$(`#schedule-${i}`).on("click", chooseSchedule);
			}
			$(".fa-arrow-right").toggleClass("disabled");
		}
	}

	function rightArrow() {
		if (!$("#confirmScheduleButton").hasClass("disabled")) {
			$("#confirmScheduleButton").addClass("disabled");
		}
		$("#scheduleModal-list")
			.children()
			.remove();

		let currentPage = $("#scheduleModal-list").attr("data-page");
		let list = $("#scheduleModal-list").attr("data-list");
		let listArray = list.split(",");
		let i = currentPage * 8;
		let newListArray = listArray.slice(i, listArray.length);
		if (newListArray.length > 8) {
			for (let i = 0; i < 8; i++) {
				$("#scheduleModal-list").append(`
          <div class="scheduleModal-entry" id="schedule-${i}">
            <label>Name:</label>
            <p>${newListArray[i]}</p>
          </div>
						`);
				$(`#schedule-${i}`).on("click", chooseSchedule);
			}
			$("#scheduleModal-list").attr("data-page", currentPage + 1);
		}
		else {
			for (let i = 0; i < newListArray.length; i++) {
				$("#scheduleModal-list").append(`
          <div class="scheduleModal-entry" id="schedule-${i}">
            <label>Name:</label>
            <p>${newListArray[i]}</p>
          </div>
						`);
				$(`#schedule-${i}`).on("click", chooseSchedule);
			}
			$(".fa-arrow-right").toggleClass("disabled");
		}
	}

	function toggleSidebar() {
		if (!$(".sidebar").hasClass("show")) {
			$(".sidebar").addClass("show");
		}
		else {
			$(".sidebar").removeClass("show");
		}
	}

	function showModal(className) {
		$(className).css("display", "flex");
		$(".bg-dimmed").css("display", "initial");
	}

	function hideModal(className) {
		if ($(".reqWarning").length) {
			$(".reqWarning").detach();
		}
		$(className).css("display", "none");
		$(".bg-dimmed").css("display", "none");
	}
};

app();
