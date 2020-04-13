

class DatePicker {

	constructor() {
		this.Build = new BuildDatePicker();
		//this.Helpers = new Helpers();

		this.stylesheet;
		this.daysArray;
		this.monthsArray;
		this.date_picker;
		this.date_picker_width;
		this.output_day;
		this.output_month;
		this.output_year;
		this.calendar;
	}


	/*	Construction de la structure du datepicker,
	 	Initialisation des variables,
	 	Appel de la fonction start().
	*/
	initialisation() {

		// Construction du DatePicker.
		this.Build.build();

		// Création et récupération de la feuille de style (<style> dans le header).
		this.stylesheet = this.Build.createCSS();

		// Définition des tableaux.
		this.daysArray = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
		this.monthsArray = ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];

		// Datepicker général.
		this.date_picker = document.querySelector(".ldp");

		// Outputs de la date dans le "header".
		this.output_day = document.querySelector(".output-day");
		this.output_month = document.querySelector(".output-month");
		this.output_year = document.querySelector(".output-year");

		// Calendrier.
		this.calendar = document.querySelector(".ldp-calendar");

		// Lancement du programme.
		this.start();
	}


	// Lancement du programme.

	start() {
		// Lance le programme (formatedDate(), inputHeader(), buildCalendar())
		this.formatedDate("now", "build");

		// Sélection date depuis le header.
		this.selectHeader();

		// Sélection date depuis calendrier.
		this.selectCalendar();

		// Affichage du calendrier, output de la date.
		this.displayDatePicker();
	}



	/* Définition de la date - Retourne la fonction "inputHeader()" avec une date, ou retourne un "string" de date.

	date : "now" date actuelle
	   	   "2019-01-01" date formatée donnée
	action : "build" ordonne de construire la datePicker avec la date formatée passée à la fonction "inputHeader()"
			 "string" retourne la date formatée en string.
	*/
	formatedDate(date, action) {

		if (date == "now") var d = new Date();
		else var d = new Date(date);

		var year = d.getFullYear().toString();
		var month = (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1);
		var day = (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()).toString();
		var weekday = d.getDay();

		// Sunday = 0 devient Sunday = 7 pour que lundi soit 1 et non 2.
		if (weekday == 0) weekday = 7;
		
		if (action == "build") this.inputHeader(year + "-" + month + "-" + day);
		if (action == "string") return year + "-" + month + "-" + day;
		if (action == "array") return [year, month, day, weekday.toString()];

		else return "PARAMETERS: \"2019-01-01\" / \"now\" (date) AND \"build\" or \"string\" or \"array\"";
	}



	// Traitement de la date, ajoute les valeurs au header.

	inputHeader(date_string) {

		var date_array = date_string.split("-");

		// Ajoute la date dans le "data-value" dans le premier élément du header : "output-day".
		this.output_day.setAttribute("data-value", date_array[0] + "-" + date_array[1] + "-" + date_array[2]);

		// Contient le mois en majuscule réduit aux 3 premières lettres "Janvier" => "JAN".
		var month_short = this.monthsArray[date_array[1] -1].substring(0,4).toUpperCase();

		this.output_day.innerHTML = Helpers.removeZero(date_array[2]);
		this.output_month.innerHTML = month_short;
		this.output_year.innerHTML = date_array[0];

		// OUTPUT: ajout de la date dans l'input DOM sélectionnée.
		var active_input = document.querySelector(".lighty-datepicker.active");

		if (active_input !== null) { // Si l'input n'est pas null (quand elle est active, sélectionnée par l'utilisateur) on affiche la date dans l'input.
			active_input.value = Helpers.outputHeader("string");
		}

		// Appel de la fonction constructrice du calendrier.
		this.buildCalendar(date_string);
	}



	// Construction du calendrier.

	buildCalendar(date_string) {

		var date_array = date_string.split("-");

		var first_day_of_month = Helpers.getWeekday(date_array[0] + "-" + date_array[1] + "-01", "number"); // 2 = Mardi, 7 = Dimanche
		var total_days_of_month = Helpers.daysInMonth(date_array[0], date_array[1]);

		var day_count = 1; // Les cases comportant un jour.
		var cell_count = 1; // Les cases ajoutées.


		// Construction du header du calendrier (jours de la semaine).
		var header = document.createElement("div");

		header.setAttribute("class", "ldp-calendar-header");
		this.calendar.appendChild(header);

		for (var i = 0; i < this.daysArray.length; i++) {

			var header_cell = document.createElement("div");
			var text = document.createTextNode(this.daysArray[i]);

			header_cell.setAttribute("class", "ldp-cell");
			header.appendChild(header_cell);
			header_cell.appendChild(text);
		}

		// Construction du corps du calendrier.
		var body = document.createElement("div");

		body.setAttribute("class", "ldp-calendar-body");
		this.calendar.appendChild(body);

		for (var i = 1; i < 7; i++) {

			var row = document.createElement("div");

			row.setAttribute("class", "ldp-row");
			body.appendChild(row);

			for (var x = 1; x < 8; x++) {

				if (first_day_of_month <= cell_count && day_count <= total_days_of_month) {

					var cell = document.createElement("div");
					var text = document.createTextNode(day_count);

					cell.setAttribute("class", "ldp-cell ldp-filled");
					cell.setAttribute("data-value", date_array[0] + "-" + date_array[1] + "-" + Helpers.addZero(day_count));

					cell.appendChild(text);
					row.appendChild(cell);

					day_count++;
				}
				else {
					var cell = document.createElement("div");
					var dot = document.createElement("div");

					cell.setAttribute("class", "ldp-cell");
					dot.setAttribute("class", "ldp-dot");

					row.appendChild(cell);
					cell.appendChild(dot);
				}
				
				cell_count++;
			}
		}

		// Ajout de la case "pré-selectionnée".
		
		var selected = document.querySelector(".ldp-row [data-value='" + date_string + "']");

		selected.classList.add("ldp-selected");
	}



	// Sélection de la date depuis les bouttons du "header". Appelle la fonction reBuild() qui reconstruit le tableau.
	
	selectHeader() {

		document.querySelector(".ldp-header").addEventListener("click", (e) => {

			// Si la classe "day-up" est pressé (présente sur les bouttons et logos SVG).
			if (e.target.classList[1] == "day-up") this.reBuild("day", "up");
			if (e.target.classList[1] == "day-down") this.reBuild("day", "down");

			if (e.target.classList[1] == "month-up") this.reBuild("month", "up");
			if (e.target.classList[1] == "month-down") this.reBuild("month", "down");

			if (e.target.classList[1] == "year-up") this.reBuild("year", "up");
			if (e.target.classList[1] == "year-down") this.reBuild("year", "down");
		});
	}


	// Sélection de la date depuis le "calendrier". Recontruit la tableau avec les nouvelles valeurs.
	
	selectCalendar() {

		this.calendar.addEventListener("click", (e) => {
			/* Si l'utilisateur clique sur un élément du calendrier où sa seconde classe est "ldp-filled" :
			(La classe "ldp-filled" est uniquement ajoutée aux "cell" qui peuvent être sélectionnée) */
			if (e.target.classList[1] == "ldp-filled") {

				var date = e.target.dataset.value;

				Helpers.removeTable();

				this.formatedDate(date, "build");
			}
		});
	}
	

	/* FONCTION REBUILD 

		Elle est appellée lors de la pression d'un bouton pour
	 	incrémenter / décrémenter la date d'un jour / mois / an.

		Elle récupère en paramètres les changements à opérer sur la date,
		puis re-construit le nouveau datepicker avec la nouvelle date.

		date = "year", "month" ou "day"
		action = "up" ou "down"
	*/
	reBuild(date, action) {
		var string = "",
			newYear = "",
			newMonth = "",
			newDay = "",
			number = 0;

		// Ajoute 1 ou soustrait 1 au nombre.
		number = parseInt(Helpers.outputHeader(date));
		(action == "up" ? number += 1 : number -= 1);

		// Construit la date avec le nouveau nombre.
		if (date == "year") string = number + "-" + Helpers.outputHeader("month") + "-01" /* + Helpers.outputHeader("day")*/;

		if (date == "month") {
			if (number == 13) {
				string = (parseInt(Helpers.outputHeader("year")) + 1) + "-01-01";
			}
			else if (number == 0) {
				string = (parseInt(Helpers.outputHeader("year")) - 1) + "-12-01";
			}
			else {
				string = Helpers.outputHeader("year") + "-" + Helpers.addZero(number) + "-01";
			}
		}

		if (date == "day") {

			// Si nombre du jour est supérieur au jour max de ce mois-ci.
			if (number > Helpers.daysInMonth(Helpers.outputHeader("year"), Helpers.outputHeader("month"))) {

				// Si le mois est décembre, on incémente d'un an.
				if (Helpers.outputHeader("month") == "12") {
					newYear = (parseInt(Helpers.outputHeader("year")) + 1).toString();
					string = newYear + "-01-01";
				}
				else {
					string = Helpers.outputHeader("year") + "-" + (parseInt(Helpers.outputHeader("month")) + 1) + "-01";
				}
			}
			// Si le nombre du jour est 0.
			else if (number == 0) {
			
				// Si le mois est janvier, on décrémente d'un an.
				if (Helpers.outputHeader("month") == "01") {
					newYear = (parseInt(Helpers.outputHeader("year")) - 1).toString();
					string = newYear + "-12-" + Helpers.daysInMonth(newYear, "12");
				}
				// Sinon, on décrémente d'un mois et on cherche le nombre de jour en fonction de la nouvelle année et du nouveau mois.
				else {
					newMonth = (parseInt(Helpers.outputHeader("month")) - 1).toString();
					newDay = Helpers.daysInMonth(Helpers.outputHeader("year"), newMonth);
					string = Helpers.outputHeader("year") + "-" + Helpers.addZero(newMonth) + "-" + newDay;
				}
			}
			else {
				string = Helpers.outputHeader("year") + "-" + Helpers.outputHeader("month") + "-" + Helpers.addZero(number);
			}
		}

		// Supprime le tableau et le reconstruit avec la nouvelle date.
		Helpers.removeTable();
		this.formatedDate(string, "build");
	}


	// Traitement de l'affichage du datepicker en fonction de ou des inputs.
	
	displayDatePicker() {

		/* Re-déclaration de "date_picker" car "this.date_picker" n'atteint pas
		le scope de la fonction déclarée ci-dessous. */
		var date_picker = document.querySelector(".ldp");

		// Fonction instanciée dans l'addEventListener ci dessous. Affiche ou non le datepicker.
		function displayYesNo(param) {

			if (param == "yes") {
				// date_picker est le sélecteur général du date_picker.
				date_picker.style.display = "block";
				setTimeout(function(){ date_picker.style.opacity = "1"}, 1);
			}
			else {
				date_picker.style.opacity = "0";
				setTimeout(function(){ date_picker.style.display = "none"}, 500);
			}
		}

		// Cache le datepicker.
		displayYesNo("no");

		document.addEventListener("mousedown", (e) => {

			/* 1) Si l'élément contient la classe "lighty-datepicker". */
			if (e.target.classList.contains("lighty-datepicker")) {

				var removeClasses = document.querySelectorAll(".lighty-datepicker");

				// Supprime toutes les classes "active" des inputs contenant "lighty-datepicker".
				for (var i = 0; i < removeClasses.length; i++) {
					removeClasses[i].classList.remove("active");
				}

				// Ajoute la classe "active" sur l'input cliquée pour dire que l'input est sélectionnée, et le datepiker pourra s'y afficher à côté.
				e.target.classList.add("active");

				// Si l'input contient déjà une date : suppression du calendrier du datepicker, puis recontruction avec la date de l'input.
				if (e.target.value !== "") {
					Helpers.removeTable();
					this.formatedDate(e.target.value, "build");
				}
				// Sinon suppression et recontruction avec la date du jour.
				else {
					Helpers.removeTable();
					this.formatedDate("now", "build");
				}
			}

			
			// 2) Si le clic est sur "input" active OU les éléments de "datepicker".
			if ((e.target.classList.contains("lighty-datepicker") && e.target.classList.contains("active")) || e.target.closest('.ldp')) {

				// Lors d'un clic sur "input" active : on re-positionne le datepicker.
				if (e.target.classList.contains("lighty-datepicker") && e.target.classList.contains("active")) {

					// Lance la fonction de customisation qui change la taille, les couleurs, etc.
					this.customisation();

					// Récupère la position de l'input.
					var elementData = e.target.getBoundingClientRect();

					// "datepicker" dimensions.
					this.date_picker.style.display = "block"; // Affichage instantané pour obtenir les dimensions (si le datepicker n'a pas encore été affiché).
					var dpWidth = this.date_picker_width;
					var dpHeight = this.date_picker_width * 1.3571;
					this.date_picker.style.display = "none"; // On le cache juste après pour continuer les calculs avant l'affichage.

					// "input" dimensions.
					var elWidth = elementData.width;
					var elHeight = elementData.height;

					// Écran dimensions.
					var clWidth = window.innerWidth;
					var clHeight = window.innerHeight;

					// Distances de l'input.
					var el_top_to_top = elementData.bottom - elHeight;
					var el_left_to_left = elementData.left;
					var el_right_to_right = clWidth - elementData.right;
					var el_bottom_to_bottom = clHeight - elementData.bottom;


					/* /!\ Les opérateur ci-dessous ont "dpHeight + 20" car on ne compte pas les 20px ajoutés
					lors du style (ont les ajoute après car ont ne veut pas que le DP se colle à l'input) */

					// BAS - Si place en dessous supérieur à hauteur datepicker.
					if (el_bottom_to_bottom > (dpHeight + 20)) {//log("BAS");
						this.date_picker.style.top = (el_top_to_top + elHeight + 20) + "px";
						this.date_picker.style.left = (el_left_to_left - ((dpWidth - elWidth) / 2)) + "px";
					}
					// HAUT ou DROITE - Si place en dessous inférieur à hauteur datepicker.
					else if (el_bottom_to_bottom < (dpHeight + 20)) {

						// HAUT - Si place en dessous inférieur à (hauteur datepicker / 2).
						if (el_bottom_to_bottom < (dpHeight - 20) / 2) {
							this.date_picker.style.top = (el_top_to_top - dpHeight - 20) + "px";
							this.date_picker.style.left = (el_left_to_left - ((dpWidth - elWidth) / 2)) + "px";
						}
						// DROITE
						else {
							var el_height_middle = el_top_to_top + (elHeight / 2);
							this.date_picker.style.top = el_height_middle - dpHeight / 2 + "px";
							this.date_picker.style.left = (el_left_to_left + elWidth + 20) + "px";
						}
					}
					// HAUT...
					else {
						this.date_picker.style.top = (el_top_to_top + elHeight + 20) + "px";
						this.date_picker.style.left = (el_left_to_left - ((dpWidth - elWidth) / 2)) + "px";
					}
				}

				displayYesNo("yes");
			}

			// Si le clic n'est pas sur "input active" ou "datepicker" on cache le datepicker.
			else {
				displayYesNo("no");
			}

		}, false);
	}





	/* CUSTOMISATION des couleurs
	La fonction n'est déclenchée que lors d'un clic sur une input. */

	customisation() {

		// Remise en place du CSS d'origine.

		// Dimensions
		Helpers.setProperty(this.stylesheet, ".ldp", "width", "280px");
		Helpers.setProperty(this.stylesheet, ".ldp", "height", "380px");

		// Font size
		Helpers.setProperty(this.stylesheet, ".ldp-output", "font-size", "33px");
		Helpers.setProperty(this.stylesheet, ".ldp-calendar-header", "font-size", "19px");
		Helpers.setProperty(this.stylesheet, ".ldp-cell", "font-size", "16px");

		// Header colors
		Helpers.setProperty(this.stylesheet, ".ldp-header", "background", "#01B1AE");
		Helpers.setProperty(this.stylesheet, ".ldp-header", "color", "white");

		// Body colors
		Helpers.setProperty(this.stylesheet, ".ldp-calendar", "background", "white");
		Helpers.setProperty(this.stylesheet, ".ldp-calendar", "color", "grey");

		// Pastille sélection colors
		Helpers.setProperty(this.stylesheet, ".ldp-selected", "background", "#01B1AE");
		Helpers.setProperty(this.stylesheet, ".ldp-selected", "color", "white");

		// Border, points calendrier, icon flèche
		Helpers.setProperty(this.stylesheet, ".ldp-calendar-header", "border-bottom", "1px solid grey");
		Helpers.setProperty(this.stylesheet, ".ldp-dot", "background", "lightgrey");
		Helpers.setProperty(this.stylesheet, ".ldp-icon-color", "fill", "#e0e0e0");


		// Input sélectionnée.
		var active_input = document.querySelector(".lighty-datepicker.active");
		
		// Si l'attribut "data" est présent dans l'input :
		if (active_input.getAttribute("data-lighty_datepicker") !== null) {

			// Si son contenu est vide, STOP.
			if (active_input.dataset.lighty_datepicker == "") {
				log("LDP: No data in \"data-lighty_datepicker\" attribute at the selected input.");
				return;
			}
		}
		// Si pas d'attribut "data", STOP.
		else {
			return;
		}


		// Récupère la "data-lighty_datepicker" depuis l'input
		var raw_data = active_input.dataset.lighty_datepicker.split(";");
		
		// Suppression du dernier élément si il vide.
		if (raw_data[raw_data.length - 1] == "") 
		raw_data.pop();

		// Création de l'objet.
		var data = new Object();
		var data_length = 0;

		// Remplissage de l'objet { color: "red", background: "#fefefe" }
		for (var x = 0; x < raw_data.length; x++) {
			
			var split = raw_data[x].split(":");

			var property = split[0];
			var value = split[1];

			// Supprime les espaces indésirables.
			if (property[0] == " ") property = property.substring(1);
			if (value[0] == " ") value = value.substring(1);

			data[property] = value;
			data_length++;
		}

		// log(data)

		if (data.bg_header !== undefined) {
			Helpers.setProperty(this.stylesheet, ".ldp-header", "background", data.bg_header);
			Helpers.setProperty(this.stylesheet, ".ldp-selected", "background", data.bg_header);
		}
		if (data.color_header !== undefined) {
			Helpers.setProperty(this.stylesheet, ".ldp-header", "color", data.color_header);
			Helpers.setProperty(this.stylesheet, ".ldp-selected", "color", data.color_header);
		}
		if (data.bg_body !== undefined) {
			Helpers.setProperty(this.stylesheet, ".ldp-calendar", "background", data.bg_body);
		}
		if (data.color_body !== undefined) {
			Helpers.setProperty(this.stylesheet, ".ldp-calendar", "color", data.color_body);
			Helpers.setProperty(this.stylesheet, ".ldp-calendar-header", "border-bottom", "1px solid " + data.color_body);
			Helpers.setProperty(this.stylesheet, ".ldp-dot", "background", data.color_body);
		}
		if (data.bg_icon !== undefined) {
			Helpers.setProperty(this.stylesheet, ".ldp-icon-color", "fill", data.bg_icon);
		}
		if (data.width !== undefined) {
			this.date_picker_width = data.width;
			Helpers.setProperty(this.stylesheet, ".ldp", "width", data.width + "px");
			Helpers.setProperty(this.stylesheet, ".ldp", "height", (data.width * 1.3571) + "px");

			// Calcul de proportionalité de changement de taille du texte.
			function calcFont(original_font_size) {
				var original_width = 280;
				var new_width = data.width;
				return ((new_width * original_font_size) / original_width);
			}

			Helpers.setProperty(this.stylesheet, ".ldp-output", "font-size", calcFont(33) + "px");
			Helpers.setProperty(this.stylesheet, ".ldp-calendar-header", calcFont(19) + "px");
			Helpers.setProperty(this.stylesheet, ".ldp-cell", "font-size", calcFont(16) + "px");
		}
		else {
			// Si aucune valeur n'est donnée pour la largeur, on set la largeur de base pour que le calcul de position puisse de faire.
			// La largeur doit être fixe avant que l'animation déplace le datepicker, sinon la valeur de largeur se modifie pendant
			// le déplacement et le calcul est erroné.
			this.date_picker_width = 270;
		}
	}
}



/* Initialise le datepicker seulement si une <input>
   porte la classe "lighty-datepicker"> */

var nodes = document.querySelectorAll(".lighty-datepicker");

if (nodes[0]) {
	// Instanciation de l'objet.
	var datepicker = new DatePicker();
	// Lancement de la fonction initialisation de la classe. (Début du programme.)
	datepicker.initialisation();
}