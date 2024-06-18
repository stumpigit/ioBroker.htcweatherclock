/*
    ioBroker.vis htcweatherclock Widget-Set

    version: "0.0.1"

    Copyright 2024 Christoph Suter christoph@suter-burri.ch
*/
"use strict";

var old_time = {}
var intervalSetNewTime = '';

const weatherDefaults = {
    widgetPath: '/local/custom_ui/htc-weather/',
    lang: 'en',
    am_pm: false,
    svrOffset: 0,
    render: true,
    renderClock: true,
    renderDetails: true,
    high_low_entity: false,
    theme: {
        name: 'default',
        weather_icon_set: 'default'
    }
};
weatherDefaults['imagesPath'] = weatherDefaults.widgetPath + 'themes/' + weatherDefaults.theme['name'] + '/'
weatherDefaults['clockImagesPath'] = weatherDefaults.imagesPath + 'clock/'
weatherDefaults['weatherImagesPath'] = weatherDefaults.imagesPath + 'weather/' + weatherDefaults.theme['weather_icon_set'] + '/'
const htcVersion = "1.3.2";


const weatherIconsDay = {
    clear: "sunny",
    "clear-night": "night",
    cloudy: "cloudy",
    fog: "fog",
    hail: "hail",
    lightning: "thunder",
    "lightning-rainy": "thunder",
    partlycloudy: "partlycloudy",
    pouring: "pouring",
    rainy: "pouring",
    snowy: "snowy",
    "snowy-rainy": "snowy-rainy",
    sunny: "sunny",
    windy: "cloudy",
    "windy-variant": "cloudy-day-3",
    exceptional: "na"
};

const weatherIconsNight = {
    ...weatherIconsDay,
    fog: "fog",
    clear: "night",
    sunny: "night",
    partlycloudy: "cloudy-night-3",
    "windy-variant": "cloudy-night-3"
};

/* global $, vis, systemDictionary */

// add translations for edit mode
$.extend(
    true,
    systemDictionary,
    {
        // Add your translations here, e.g.:
        // "size": {
        // 	"en": "Size",
        // 	"de": "Größe",
        // 	"ru": "Размер",
        // 	"pt": "Tamanho",
        // 	"nl": "Grootte",
        // 	"fr": "Taille",
        // 	"it": "Dimensione",
        // 	"es": "Talla",
        // 	"pl": "Rozmiar",
        //  "uk": "Розмір"
        // 	"zh-cn": "尺寸"
        // }
    }
);


// this code can be placed directly in htcweatherclock.html
vis.binds["htcweatherclock"] = {
    version: "0.0.1",
    showVersion: function () {
        if (vis.binds["htcweatherclock"].version) {
            console.log('Version htcweatherclock: ' + vis.binds["htcweatherclock"].version);
            vis.binds["htcweatherclock"].version = null;
        }
    },
    createWidget: function (widgetID, view, data, style) {
        console.log("Bin mal drin");
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds["htcweatherclock"].createWidget(widgetID, view, data, style);
            }, 100);
        }

        const htcclock_style = document.createElement('style');
        htcclock_style.textContent = themes['default']['css'];
        root.appendChild(htcclock_style);
        var container_size = '470px';
        const container = document.createElement('div');
        container.id = 'htc-weather-card-container';
        // container.onclick = this._handleClick(this._config.entity)
        container.style = `height: ${container_size};`
        
        const htc_clock = document.createElement('div')
        htc_clock.id = 'htc-clock'
        htc_clock.classList.add(`htc-clock-0`)
        container.appendChild(htc_clock)

        $(container).appendTo('#' + widgetID);


        // subscribe on updates of value
        function onChange(e, newVal, oldVal) {
            $div.find('.template-value').html(newVal);
        }
        if (data.oid) {
            vis.states.bind(data.oid + '.val', onChange);
            //remember bound state that vis can release if didnt needed
            $div.data('bound', [data.oid + '.val']);
            //remember onchange handler to release bound states
            $div.data('bindHandler', onChange);
        }
    }
};

vis.binds["htcweatherclock"].showVersion();