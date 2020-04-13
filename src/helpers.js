

class Helpers {

	// Returns the given numbers of days in a month.
	static daysInMonth(year, month) {
		return new Date(year, month, 0).getDate();
	}

	// Returns the weekday as a string or a number from a given date.
	static getWeekday(date, type) {
		var weekday = new Date(date).getDay();

		if (weekday == 0) weekday = 7;

		if (type == "string") return isNaN(weekday) ? null : ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'][weekday -1];
		if (type == "number") return weekday;

		else return "PARAMETERS: \"string\" or \"number\"";
	}

	// Adds a zero to a string if it is shorter than 1. (ex: 3 => 03)
	static addZero(number) {
		return (number.toString().length == 1) ? "0" + number : number.toString();
	}

	// Removes a useless zero in position 0 of a string.
	static removeZero(number) {
		return (number[0] == "0") ? number[1] : number;
	}

	// Delete all childNodes of the calendar so it can be built again with new values.
	static removeTable() {
		var calendar = document.querySelector(".ldp-calendar");
		var length = calendar.childNodes.length;

		for (var x = 0; x < length; x++) {
			calendar.removeChild(calendar.childNodes[0]);
		}
	}

	// Returns a date string of the date displayed in the header.
	static outputHeader(param) {
		// Le dataset "data-value" de "output_day" contient la date du header (date actuellement sélectionnée).
		var output_day = document.querySelector(".output-day");
		
		var date_array = output_day.dataset.value.split("-");

		if (param == "year") return date_array[0].toString();
		if (param == "month") return date_array[1].toString();
		if (param == "day") return date_array[2].toString();
		if (param == "string") return output_day.dataset.value;
		if (param == "array") return date_array;

		else return "PARAMETERS: \"year\" or \"month\" or \"day\" or \"string\" or \"array\""
	}

	static setProperty(stylesheet, selector, property, value) {

		for (var x = 0; x < stylesheet.cssRules.length; x++) {

			if (stylesheet.cssRules[x].selectorText == selector) {

				stylesheet.cssRules[x].style[property] = value;

				return;
			}
		}
	}
}