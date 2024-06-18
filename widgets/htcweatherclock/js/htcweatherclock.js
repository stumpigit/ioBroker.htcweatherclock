/*
    ioBroker.vis htcweatherclock Widget-Set

    version: "0.0.1"

    Copyright 2024 Christoph Suter christoph@suter-burri.ch
*/
"use strict";

var old_time = {}
var intervalSetNewTime = '';

const weatherDefaults = {
    widgetPath: './widgets/htcweatherclock/',
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
    _config : weatherDefaults,
    version: "0.0.1",
    old_time: {},
    showVersion: function () {
        if (vis.binds["htcweatherclock"].version) {
            console.log('Version htcweatherclock: ' + vis.binds["htcweatherclock"].version);
            vis.binds["htcweatherclock"].version = null;
        }
    },
    createWidget: function (widgetID, view, data, style) {
        
        old_time = this.getOldTime();
        this.old_time = old_time;

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

        const htc_clock_hours = document.createElement('div')
        htc_clock_hours.id = 'hours'
        htc_clock.appendChild(htc_clock_hours)

        const htc_clock_hours_line = document.createElement('div')
        htc_clock_hours_line.classList.add('line')
        htc_clock_hours.appendChild(htc_clock_hours_line)

        const hours_bg = document.createElement('div')
        hours_bg.id = 'hours_bg'
        htc_clock_hours.appendChild(hours_bg)

        const hours_bg_img = document.createElement('img')
        hours_bg_img.src = `${this._config.clockImagesPath + 'clockbg1.png'}`
        htc_clock_hours.appendChild(hours_bg_img)

        const hours_bg_first = document.createElement('img')
        hours_bg_first.id = 'fhd';
        hours_bg_first.src = `${this._config.clockImagesPath + old_time.firstHourDigit + '.png'}`
        hours_bg_first.classList.add('first_digit')
        htc_clock_hours.appendChild(hours_bg_first)

        const hours_bg_second = document.createElement('img')
        hours_bg_second.id = 'shd'
        hours_bg_second.src = `${this._config.clockImagesPath + old_time.secondHourDigit + '.png'}`
        hours_bg_second.classList.add('second_digit')
        htc_clock_hours.appendChild(hours_bg_second)

        const htc_clock_minutes = document.createElement('div')
        htc_clock_minutes.id = 'minutes'
        htc_clock.appendChild(htc_clock_minutes)

        const htc_clock_minutes_bg = document.createElement('div')
        htc_clock_minutes_bg.id = 'minutes_bg'
        htc_clock_minutes.appendChild(htc_clock_minutes_bg)
        

        const hours_min_img = document.createElement('img')
        hours_min_img.src = `${this._config.clockImagesPath + 'clockbg1.png'}`
        htc_clock_minutes.appendChild(hours_min_img)

        const htc_clock_minutes_line = document.createElement('div')
        htc_clock_minutes_line.classList.add('line')
        htc_clock_minutes.appendChild(htc_clock_minutes_line)
        
        if(this._config.am_pm !== false){

            const htc_clock_am_pm = document.createElement('div')
            htc_clock_am_pm.id = 'am_pm'
            htc_clock.appendChild(htc_clock_am_pm)

            const am_pm_img = document.createElement('img')
            am_pm_img.src = `${this._config.clockImagesPath +'am.png'}`
            htc_clock_am_pm.appendChild(am_pm_img)
        }

        const min_bg_first = document.createElement('img')
        min_bg_first.id = 'fmd'
        min_bg_first.src = `${this._config.clockImagesPath + old_time.firstMinuteDigit + '.png'}`
        min_bg_first.classList.add('first_digit')
        htc_clock_minutes.appendChild(min_bg_first)

        const min_bg_second = document.createElement('img')
        min_bg_second.id = 'smd'
        min_bg_second.src = `${this._config.clockImagesPath + old_time.secondMinuteDigit + '.png'}`
        min_bg_second.classList.add('second_digit')
        htc_clock_minutes.appendChild(min_bg_second)

        const htc_weather = document.createElement('div')
        htc_weather.id = 'htc-weather'
        htc_weather.classList.add(`htc-weather-${this.numberElements}`)
        container.appendChild(htc_weather)

        const spinner = document.createElement('p')
        spinner.classList.add('loading')
        spinner.innerHTML = `Fetching weather...`
        htc_weather.appendChild(spinner)

        $(container).appendTo('#' + widgetID);

        this.setNewTime($('#' + widgetID));

        this.updateTime($('#' + widgetID));
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
    },
    updateTime: function(widgetID) {
        setTimeout(function () {


            var now_time = vis.binds.htcweatherclock.getNewTime();
            // check if old minutes differ from current minutes. Then display the new time
            if (now_time.now_minutes != vis.binds.htcweatherclock.old_time.old_minutes) vis.binds.htcweatherclock.setNewTime(widgetID);

            var timer = widgetID.data('timer');
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                widgetID.data('timer', null);
                vis.binds.htcweatherclock.updateTime(widgetID);
            }, 1000);
            widgetID.data('timer', timer);

            if (!widgetID.data('destroy')) {
                widgetID.data('destroy', function (widgetID) {
                    var timer = $('#' + widgetID).data('timer');
                    if (timer) {
                        timer && clearTimeout(timer);
                        $('#' + widgetID).data('timer', null);
                    }
                });
            }

        }, 110);
    },
    getOldTime: function() {
        var config = this._config
        var old = new Date();
        old.setTime(old.getTime() - 60000);
        
        var old_hours, old_minutes, timeOld = '';
        old_hours =  old.getHours();
        old_minutes = old.getMinutes();

        if (config.am_pm) {
            old_hours = ((old_hours > 12) ? old_hours - 12 : old_hours);
        } 

        old_hours   = ((old_hours <  10) ? "0" : "") + old_hours;
        old_minutes = ((old_minutes <  10) ? "0" : "") + old_minutes;

        var firstHourDigit = old_hours.substr(0,1);
        var secondHourDigit = old_hours.substr(1,1);
        var firstMinuteDigit = old_minutes.substr(0,1);
        var secondMinuteDigit = old_minutes.substr(1,1);
        var old_time = {
            firstHourDigit : firstHourDigit,
            secondHourDigit: secondHourDigit,
            firstMinuteDigit : firstMinuteDigit,
            secondMinuteDigit: secondMinuteDigit,
            old_hours:old_hours,
            old_minutes:old_minutes
        }
        return old_time
    },
    getNewTime: function() {
        var config = this._config
        var now = new Date();
        
        var now_hours, now_minutes, timenow = '';
        now_hours =  now.getHours();
        now_minutes = now.getMinutes();

        if (config.am_pm) {
            now_hours = ((now_hours > 12) ? now_hours - 12 : now_hours);
        } 

        now_hours   = ((now_hours <  10) ? "0" : "") + now_hours;
        now_minutes = ((now_minutes <  10) ? "0" : "") + now_minutes;

        var firstHourDigit = now_hours.substr(0,1);
        var secondHourDigit = now_hours.substr(1,1);
        var firstMinuteDigit = now_minutes.substr(0,1);
        var secondMinuteDigit = now_minutes.substr(1,1);
        var now_time = {
            firstHourDigit : firstHourDigit,
            secondHourDigit: secondHourDigit,
            firstMinuteDigit : firstMinuteDigit,
            secondMinuteDigit: secondMinuteDigit,
            now_hours:now_hours,
            now_minutes:now_minutes,
            old_hours:now_hours,
            old_minutes:now_minutes
        }
        return now_time
    },
    setNewTime: function(elem) {
        var config = this._config
        var now = new Date();
        var old_time = this.old_time;
        
        var now_hours, now_minutes;
        now_hours =  now.getHours();
        now_minutes = now.getMinutes();

        if (config.am_pm) {
            var am_pm = now_hours > 11 ? 'pm' : 'am';
            $(elem).find("#am_pm").find('img').attr("src",config.clockImagesPath + am_pm+".png")
            now_hours = ((now_hours > 12) ? now_hours - 12 : now_hours);
        } 

        now_hours   = ((now_hours <  10) ? "0" : "") + now_hours;
        now_minutes = ((now_minutes <  10) ? "0" : "") + now_minutes;

        var firstHourDigit = old_time.firstHourDigit;
        var secondHourDigit = old_time.secondHourDigit;
        var firstMinuteDigit = old_time.firstMinuteDigit;
        var secondMinuteDigit = old_time.secondMinuteDigit;

        if (secondMinuteDigit != '9') {
            firstMinuteDigit = firstMinuteDigit + '1';
        }

        if (old_time.old_minutes == '59') {
            firstMinuteDigit = '511';
        }
        var fmd = $(elem).find("#fmd")
        var smd = $(elem).find("#smd")
        
        setTimeout(function() {
            $(fmd).attr('src', config.clockImagesPath + firstMinuteDigit + '-1.png');
            $(elem).find('#minutes_bg').find('img').attr('src', config.clockImagesPath + 'clockbg2.png');
        },200);
        setTimeout(function() { $(elem).find('#minutes_bg').find('img').attr('src', config.clockImagesPath + 'clockbg3.png')},250);
        setTimeout(function() {
            $(fmd).attr('src', config.clockImagesPath + firstMinuteDigit + '-2.png');
            $(elem).find('#minutes_bg').find('img').attr('src', config.clockImagesPath + 'clockbg4.png');
        },400);
        setTimeout(function() { $(elem).find('#minutes_bg').find('img').attr('src', config.clockImagesPath + 'clockbg5.png')},450);
        setTimeout(function() {
            $(fmd).attr('src', config.clockImagesPath + firstMinuteDigit + '-3.png');
            $(elem).find('#minutes_bg').find('img').attr('src', config.clockImagesPath + 'clockbg6.png');
        },600);

        setTimeout(function() {
            $(smd).attr('src', config.clockImagesPath + secondMinuteDigit + '-1.png');
            $(elem).find('#minutes_bg').find('img').attr('src', config.clockImagesPath + 'clockbg2.png');
        },200);
        setTimeout(function() { $(elem).find('#minutes_bg').find('img').attr('src', config.clockImagesPath + 'clockbg3.png')},250);
        setTimeout(function() {
            $(smd).attr('src', config.clockImagesPath + secondMinuteDigit + '-2.png');
            $(elem).find('#minutes_bg').find('img').attr('src', config.clockImagesPath + 'clockbg4.png');
        },400);
        setTimeout(function() { $(elem).find('#minutes_bg').find('img').attr('src', config.clockImagesPath + 'clockbg5.png')},450);
        setTimeout(function() {
            $(smd).attr('src', config.clockImagesPath + secondMinuteDigit + '-3.png');
            $(elem).find('#minutes_bg').find('img').attr('src', config.clockImagesPath + 'clockbg6.png');
        },600);

        setTimeout(function() {$(fmd).attr('src', config.clockImagesPath + now_minutes.substr(0,1) + '.png')},800);
        setTimeout(function() {$(smd).attr('src', config.clockImagesPath + now_minutes.substr(1,1) + '.png')},800);
        setTimeout(function() { $(elem).find('#minutes_bg').find('img').attr('src', config.clockImagesPath + 'clockbg1.png')},850);

        if (now_minutes == '00') {
           
            if (config.am_pm) {
                if (now_hours == '00') {                   
                    firstHourDigit = firstHourDigit + '1';
                    now_hours = '12';
                } else if (now_hours == '01') {
                    firstHourDigit = '001';
                    secondHourDigit = '111';
                } else {
                    firstHourDigit = firstHourDigit + '1';
                }
            } else {
                if (now_hours != '10') {
                    firstHourDigit = firstHourDigit + '1';
                }

                if (now_hours == '20') {
                    firstHourDigit = '1';
                }

                if (now_hours == '00') {
                    firstHourDigit = firstHourDigit + '1';
                    secondHourDigit = secondHourDigit + '11';
                }
            }
            var fhd = $(elem).find('#fhd')
            var shd = $(elem).find('#shd')
            setTimeout(function() {
                $(fhd).attr('src', config.clockImagesPath + firstHourDigit + '-1.png');
                $(elem).find('#hours_bg').find('img').attr('src', config.clockImagesPath + 'clockbg2.png');
            },200);
            setTimeout(function() { $(elem).find('#hours_bg').find('img').attr('src', config.clockImagesPath + 'clockbg3.png')},250);
            setTimeout(function() {
                $(fhd).attr('src', config.clockImagesPath + firstHourDigit + '-2.png');
                $(elem).find('#hours_bg').find('img').attr('src', config.clockImagesPath + 'clockbg4.png');
            },400);
            setTimeout(function() { $(elem).find('#hours_bg').find('img').attr('src', config.clockImagesPath + 'clockbg5.png')},450);
            setTimeout(function() {
                $(fhd).attr('src', config.clockImagesPath + firstHourDigit + '-3.png');
                $(elem).find('#hours_bg').find('img').attr('src', config.clockImagesPath + 'clockbg6.png');
            },600);

            setTimeout(function() {
                $(shd).attr('src', config.clockImagesPath + secondHourDigit + '-1.png');
                $(elem).find('#hours_bg').find('img').attr('src', config.clockImagesPath + 'clockbg2.png');
            },200);
            setTimeout(function() { $(elem).find('#hours_bg').find('img').attr('src', config.clockImagesPath + 'clockbg3.png')},250);
            setTimeout(function() {
                $(shd).attr('src', config.clockImagesPath + secondHourDigit + '-2.png');
                $(elem).find('#hours_bg').find('img').attr('src', config.clockImagesPath + 'clockbg4.png');
            },400);
            setTimeout(function() { $(elem).find('#hours_bg').find('img').attr('src', config.clockImagesPath + 'clockbg5.png')},450);
            setTimeout(function() {
                $(shd).attr('src', config.clockImagesPath + secondHourDigit + '-3.png');
                $(elem).find('#hours_bg').find('img').attr('src', config.clockImagesPath + 'clockbg6.png');
            },600);

            setTimeout(function() {$(fhd).attr('src', config.clockImagesPath + now_hours.substr(0,1) + '.png')},800);
            setTimeout(function() {$(shd).attr('src', config.clockImagesPath + now_hours.substr(1,1) + '.png')},800);
            setTimeout(function() { $(elem).find('#hours_bg').find('img').attr('src', config.clockImagesPath + 'clockbg1.png')},850);

        }
        // save current time as old_time
        this.old_time = this.getNewTime();
    }
};

vis.binds["htcweatherclock"].showVersion();