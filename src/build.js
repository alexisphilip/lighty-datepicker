

class BuildDatePicker {

	/*  Construction de la structure stable du datepicker (partie non modifiée).
		La partie "calendar" sera recrée dynamiquement dans la fonction "buildCalendar()".
	*/
	build() {

		var date_picker = document.createElement("div");
		var date_picker_header = document.createElement("div");
		var date_picker_calendar = document.createElement("div");

		date_picker.setAttribute("class", "ldp");
		date_picker_header.setAttribute("class", "ldp-header");
		date_picker_calendar.setAttribute("class", "ldp-calendar");

		document.body.appendChild(date_picker);
		date_picker.appendChild(date_picker_header);
		date_picker.appendChild(date_picker_calendar);

		for (var i = 0; i < 3; i++) {

			var classArray = ["day", "month", "year"];

			// Ajout de la colonne.
			var column = document.createElement("div");
			column.setAttribute("class", "ldp-header-row");
			date_picker_header.appendChild(column);

			// Ajout des trois blocs (bloc-logo, bloc-output, bloc-logo).
			var row_box_1 = document.createElement("div");
			var row_box_2 = document.createElement("div");
			var row_box_3 = document.createElement("div");
			row_box_1.setAttribute("class", "ldp-btn " + classArray[i] + "-up");
			row_box_2.setAttribute("class", "ldp-output output-" + classArray[i]);
			row_box_3.setAttribute("class", "ldp-btn " + classArray[i] + "-down");
			column.appendChild(row_box_1);
			column.appendChild(row_box_2);
			column.appendChild(row_box_3);

			// Ajout des logos SVG.
			function createSVG(where, className) {
				var svg = "<svg class=\"" + className + "\" width=\"64\" height=\"64\" viewBox=\"0 0 64 64\"><path class=\"ldp-icon-color\" d=\"M3.352,48.296l28.56-28.328l28.58,28.347c0.397,0.394,0.917,0.59,1.436,0.59c0.52,0,1.04-0.196,1.436-0.59   c0.793-0.787,0.793-2.062,0-2.849l-29.98-29.735c-0.2-0.2-0.494-0.375-0.757-0.475c-0.75-0.282-1.597-0.107-2.166,0.456   L0.479,45.447c-0.793,0.787-0.793,2.062,0,2.849C1.273,49.082,2.558,49.082,3.352,48.296z\"></svg>";
				
				// Insère directement dans l'HTML la variable ci-dessus.
				where.insertAdjacentHTML("afterbegin", svg);
			}
			
			createSVG(row_box_1, "ldp-icon-arrow-up " + classArray[i] + "-up");
			createSVG(row_box_3, "ldp-icon-arrow-down " + classArray[i] + "-down");
		}
	}


	createCSS() {
		// GET CSS PROPERTIES - window.getComputedStyle(element)
		// MODIFY CSS RULES - document.styleSheets[0].cssRules

		var css = ".ldp{user-select: none;-moz-user-select: none;font-family:Calibri;font-size:1em;width:280px;height:380px;position:absolute;display:inline-block;box-shadow:0 0 35px 2px rgba(0,0,0,.38)}.ldp-header{background:#01b1ae;color:#fff;height:25%;position:relative;display:flex;box-shadow:0 15px 32px -16px rgba(0,0,0,.54)}.ldp-header-row{width:calc(100% / 3)}.ldp-btn{height:30%;display:flex;justify-content:center;align-items:center}.ldp-btn:hover{background:#fff;opacity:.1;cursor:pointer}.ldp-icon-arrow-down,.ldp-icon-arrow-up{width:65%;height:65%;user-select:none;-moz-user-select:none;-webkit-user-select:none}.ldp-icon-arrow-down{transform:rotate(180deg)}.ldp-icon-color{fill:#e0e0e0}.ldp-output{display:flex;justify-content:center;align-items:center;height:40%;text-align:center;font-size:33px}.ldp-calendar{height:75%;color:grey;background:#fff}.ldp-cell{display:flex;justify-content:center;align-items:center}.ldp-calendar-header{display:flex;height:14.2857%;border-bottom:1px solid #d3d3d3;font-size:19px}.ldp-calendar-header .ldp-cell{height:100%;width:14.2857%}.ldp-calendar-body{height:85.7143%;font-size:16px}.ldp-row{display:flex;height:16.6666%}.ldp-cell{height:100%;width:14.2857%}.ldp-filled:hover{cursor:pointer}.ldp-selected{background:#01b1ae;color:#fff;border-radius:100px;font-weight:700}.ldp-dot{width:12.5%;height:12.5%;border-radius:100%;background:#d3d3d3}.ldp,.ldp-btn:hover,.ldp-calendar,.ldp-dot,.ldp-header,.ldp-icon-color,.ldp-selected{transition:.5s}";
		var style = document.createElement("style");

		style.type = "text/css";
		style.title = "lighty-datepicker";
		style.appendChild(document.createTextNode(css));

		document.querySelector("head").appendChild(style);

		var stylesheet;

		// Parcours toutes les feuilles de style et sélectionne celle "lighty-datepicker".
		for (var i = 0; i < document.styleSheets.length; i++) {

			if (document.styleSheets[i].title == style.title) {
				stylesheet = document.styleSheets[i];
			}
		}

		return (stylesheet)
	}
}