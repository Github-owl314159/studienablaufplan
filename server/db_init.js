// Install MongoDB, start service: mongod --dbpath "/home/user/mongodbdata"
// Create database 'Library': mongo && use Library
// npm install mongodb

const dbClient = require("mongodb").MongoClient;

dbClient.connect("mongodb://localhost:27017", (error, client) => {
	if (error) {
		console.error(error);
		process.exit(-1);
	}
	const db = client.db("studymanagerDB");
	console.log("Connected to MongoDB.");
	try {
		// TODO: check if data is not already in DB
		let schedules = db.collection("schedules");
		schedules.insertMany([
			{
				name: "Informatik (B.Sc.)",
				semester: "6",
				ectsProSemester: "30",
				modules: [
					{ name: "Abschlussarbeit", ects: "15" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Wahlpflichtfach", ects: "5" },
					{ name: "Wahlpflichtfach", ects: "5" },
					{ name: "Wahlpflichtfach", ects: "5" },
					{ name: "Teamprojekt", ects: "10" },
					{ name: "Web-Entwcklung", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" },
					{ name: "Fachseminar", ects: "5" }
				]
			}
		]);

		let modules = db.collection("modules");
		modules.insertMany([
			{ name: "Abschlussarbeit", ects: "15" },
			{ name: "Advanced C++ Programming", ects: "5" },
			{ name: "Algorithmen-Design", ects: "5" },
			{ name: "Anforderungsmanagement", ects: "5" },
			{ name: "Angewandte Logik", ects: "5" },
			{ name: "Angewandte Mathematik", ects: "5" },
			{ name: "Arbeitsrecht", ects: "5" },
			{ name: "Benutzerinterface-Design", ects: "5" },
			{ name: "Benutzung von Gestaltungswerkzeugen", ects: "5" },
			{ name: "Betriebssysteme", ects: "5" },
			{ name: "Betriebswirtschaft", ects: "5" },
			{ name: "Big-Data-Technologien", ects: "5" },
			{ name: "Biosignalverarbeitung", ects: "5" },
			{ name: "Business Information Systems", ects: "5" },
			{ name: "C/C++ Programmierung", ects: "5" },
			{ name: "Datenbanken", ects: "5" },
			{ name: "Datenstrukturen und Algorithmen", ects: "5" },
			{ name: "Digitale Medien", ects: "5" },
			{ name: "Digitale Spiele", ects: "5" },
			{ name: "Einführung in die Computergrafik", ects: "5" },
			{ name: "Eingebettete Echtzeitsysteme", ects: "5" },
			{ name: "Englisch", ects: "5" },
			{ name: "Entwicklung mobiler Anwendungen", ects: "5" },
			{ name: "Entwicklung verteilter Anwendungen", ects: "5" },
			{ name: "Fachseminar", ects: "5" },
			{ name: "Funktionelle Anatomie muskuloskelettales System", ects: "5" },
			{ name: "Gameplay Prototyping und Game Metrics", ects: "5" },
			{ name: "Geometrische Modellierung", ects: "5" },
			{ name: "Gesundheitsinformationssysteme", ects: "5" },
			{ name: "Gesundheitstelematik", ects: "5" },
			{ name: "Gesundheitswesen und Medizinrecht", ects: "5" },
			{ name: "Grafische Benutzeroberflächen", ects: "5" },
			{ name: "Grundlagen der Gestaltung", ects: "5" },
			{ name: "Grundlagen der Mathematik", ects: "5" },
			{ name: "Grundlagen der Medizin B", ects: "5" },
			{ name: "Information Retrieval/Text Mining", ects: "5" },
			{ name: "Interdisziplinäres Teamprojekt", ects: "10" },
			{ name: "IT-Sicherheit", ects: "5" },
			{ name: "IT-Sicherheit mobiler Systeme", ects: "5" },
			{ name: "Kryptologisches Programmierpraktikum", ects: "5" },
			{ name: "Künstliche Intelligenz für Spiele", ects: "5" },
			{ name: "Labor Robotik", ects: "5" },
			{ name: "Lineare Algebra", ects: "5" },
			{ name: "Medienprojekt", ects: "10" },
			{ name: "Medizinische Bildgebung", ects: "5" },
			{ name: "Medizinische Bildverarbeitung", ects: "5" },
			{ name: "Medizinische Computergrafik", ects: "5" },
			{ name: "Medizinische Statistik", ects: "5" },
			{ name: "Mobile Kommunikationssysteme", ects: "5" },
			{ name: "Natural Language Processing", ects: "5" },
			{ name: "Objektorientierte Programmierung", ects: "10" },
			{ name: "Objektrelationale Datenbanken", ects: "5" },
			{ name: "Online- und Medienrecht", ects: "5" },
			{ name: "Ortsabhängige Systeme", ects: "5" },
			{ name: "Parallele Programmierung", ects: "5" },
			{ name: "Physiologielabor", ects: "5" },
			{ name: "Praktikum IT-Sicherheit", ects: "10" },
			{ name: "Produktionswirtschaft", ects: "5" },
			{ name: "Programmierparadigmen", ects: "5" },
			{ name: "Real-Time Rendering", ects: "5" },
			{ name: "Rechnernetze", ects: "5" },
			{ name: "Rhetorik für Informatiker", ects: "5" },
			{ name: "Serious Games", ects: "5" },
			{ name: "Softwareentwurf und -test", ects: "5" },
			{ name: "Softwaremanagement", ects: "5" },
			{ name: "Spielekonsolenprogrammierung", ects: "5" },
			{ name: "Spieleprogrammierung", ects: "5" },
			{ name: "Strategiemodelle", ects: "5" },
			{ name: "Systemadministration", ects: "5" },
			{ name: "Teamprojekt", ects: "10" },
			{ name: "Technische Informatik", ects: "5" },
			{ name: "Theoretische Informatik", ects: "5" },
			{ name: "Therapeutic Games", ects: "5" },
			{ name: "Tool- und Plugin-Programmierung", ects: "5" },
			{ name: "Unternehmensmodellierung", ects: "5" },
			{ name: "User-Centered Design & Design Thinking", ects: "5" },
			{ name: "Visualisierung", ects: "5" },
			{ name: "Web-Entwicklung", ects: "5" },
			{ name: "Web-Technologien", ects: "5" },
			{ name: "Wissenschaftiches Arbeiten", ects: "5" }
		]);
	}
	finally {
		client.close();
	}
});
