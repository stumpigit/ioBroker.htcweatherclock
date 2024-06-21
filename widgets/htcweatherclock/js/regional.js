const regional = {
	'ro': {
		monthNames: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sept', 'Oct', 'Noi', 'Dec'],
		dayNames: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sam'],
		windDirections: ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSV','SV','VSV','V','VNV','NV','NVW','N'],
		lang: 'ro'
	},
	'en': {
		monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		windDirections: ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'],
		lang: 'en'
	},
	'nl' : {
		monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
		dayNames: ['Zon', 'Maa', 'Din', 'Woe', 'Don', 'Vrij', 'Zat'],
		windDirections: ['N', 'NNO', 'NO', 'ONO', 'O', 'OZO', 'ZO', 'ZZO', 'Z', 'ZZW', 'ZW', 'WZW', 'W', 'WNW', 'NW', 'NNW', 'N'],
		lang: 'nl'
	},
	'cz':{
		monthNames: ['Led', 'Ún', 'Bře', 'Dub', 'Kvě', 'Črv', 'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'],
		dayNames: ['Ne', 'Po', 'Út', 'Stř', 'Čt', 'Pá', 'So'],
		windDirections: ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'],
		lang: 'cz'
	},
	'sv':{
		monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
		dayNames: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
		windDirections: ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'],
		lang: 'sv'
	},
	'it':{
		monthNames: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
		dayNames: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
		windDirections: ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'],
		lang: 'it'
	},
	'pt':{
		monthNames: ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'],
		dayNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
		windDirections: ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'],
		lang: 'pt'
	},
	'no':{
		monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
		dayNames: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
		windDirections: ['N','NNØ','NØ','ØNØ','Ø','ØSØ','SØ','SSØ','S','SSV','SV','VSV','V','VNV','NV','NNV','N'],
		lang: 'no'
	},
	'dk':{
		monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
		dayNames: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
		windDirections: ['N','NNØ','NØ','ØNØ','Ø','ØSØ','SØ','SSØ','S','SSV','SV','VSV','V','VNV','NV','NNV','N'],
		lang: 'dk'
	},
	'de': {
		monthNames: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'],
		dayNames: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        windDirections: ['N','NNO','NO','ONO','O','OSO','SO','SSO','S','SSW','SW','WSW','W','WNW','NW','NNW','N'],
        lang: 'de'
	},
	'fi': {
		monthNames: ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kesä', 'Heinä', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu'],
		dayNames: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
		windDirections: ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'],
		lang: 'fi'
	}
};

if (vis.editMode) {
	$.extend(systemDictionary, {
		"oid-currenttemp"      : {"en": "Current Temperature",         "de": "Aktuelle Temperatur",   "ru": "Скрыть секунды"},
		"location"      : {"en": "Location",         "de": "Ort",   "ru": "Скрыть секунды"},
		"group_CurrentWeather"      : {"en": "Current Weather",         "de": "Aktuelles Wetter",   "ru": "Скрыть секунды"},
		"oid-lastupdated"      : {"en": "Last updated",         "de": "Letztes Wetterupdate",   "ru": "Скрыть секунды"},
		"oid-currentmintemp"      : {"en": "Min temperature of day",         "de": "Tagestiefsttemperatur",   "ru": "Скрыть секунды"},
		"oid-currentmaxtemp"      : {"en": "Max temperature of day",         "de": "Tageshöchsttemperatur",   "ru": "Скрыть секунды"},
		"api-type"      : {"en": "Type of weather api",         "de": "Wetter-API Typ",   "ru": "Скрыть секунды"},
		"oid-currentsymbol"      : {"en": "Symbol code of current weather",         "de": "Symbol Code des aktuellen Wetters",   "ru": "Скрыть секунды"},
	});
}