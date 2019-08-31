// todo: Error & Messages needs to be displayed in the UI view

let timer = {
    data: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        values: {
            difference: 0,
            current: 0,
            percentage: 100
        }

    },
    create: async function (event) {
        event.preventDefault();

        let formData = document.querySelectorAll("#timer-form > input");
        for (let i in formData) {
            if (formData[i].value == '') {
                formData[i].value = 0;
            }
        }


        this.data.days = parseInt(formData[0].value);
        this.data.hours = parseInt(formData[1].value);
        this.data.minutes = parseInt(formData[2].value);
        this.data.seconds = parseInt(formData[3].value);

        if (helpers.create.validate()) {
            // displays loader
            let create = document.getElementById('timer-create');
            create.style.backgroundColor = "inherit";
            create.style.maxWidth = "none";
            create.innerHTML = '<img src="./docs/loading.gif" style="max-width:' + create.clientWidth + ';" />';


            let currentTime = await getLocalTime();
            let stamp = currentTime.unixtime;
            console.log('Stamp', stamp);
            let timezone = currentTime.timezone;
            // adjusts timeStamp to ending time
            stamp += parseInt(await helpers.create.getTimestampDifference(this.data));

            window.location = '?stamp=' + stamp + "&tz=" + timezone;
        } else {
            console.log('Error with Timer parameters.')
        }
    },

    clock: async function (params) {
        console.log(params);
        let difference = await helpers.clock.calcDifference(params);
        let data = await helpers.clock.generate(difference);
        helpers.clock.inject(data);
        helpers.clock.update(data);
        helpers.clock.push(this.data, data);

        console.log('this.data -->', this.data);
    }

}

let helpers = {
    create: {
        validate: function () {

            let data = timer.data;
            let validation = true;
            if (isNaN(data.days) || data.days < 0 || data.days > 366) validation = false;
            if (isNaN(data.hours) || data.hours < 0 || data.hours > 23) validation = false;
            if (isNaN(data.minutes) || data.minutes < 0 || data.minutes > 59) validation = false;
            if (isNaN(data.seconds) || data.seconds < 0 || data.seconds > 59) validation = false;

            if (!validation) {
                message.classList = "displayOn";
                message.innerText = "The timer values are incorrect. Please make sure timer values don't exceed 365 days, 23 hours, 59 minutes, 59 seconds.";
            }
            return validation;
        },
        getTimestampDifference: function (data) {
            return ((24 * 60 * 60 * data.days) + (60 * 60 * data.hours) + (60 * data.minutes) + (data.seconds));
        }
    },

    clock: {
        calcDifference: async function (params) {
            if (params.tz == "" || params.tz == undefined)
                return "Timezone not provided or incorrect";
            else {
                let time = {
                    current: parseInt((await getTime(params.tz)).unixtime),
                    future: parseInt(params.stamp)
                }

                if (time.future > time.current) {
                    return (time.future - time.current);
                } else {
                    return "Your timer has expired...";
                }
            }
        },

        // injects clock values
        inject: function (data) {
            let ele = document.querySelectorAll('#timer-clock > span');
            ele[0].textContent = helpers.clock.convert(data.hours);
            ele[1].textContent = helpers.clock.convert(data.minutes);
            ele[2].textContent = helpers.clock.convert(data.seconds);

            if (data.days > 0) {
                document.getElementById('clock-days').innerText = data.days + ' DAYS';

            }
        },

        // generates the clock
        generate: async function (difference) {
            const days = 24 * 60 * 60;
            const hours = 60 * 60;
            const minutes = 60;

            console.log(difference);
            let hms = difference % days;
            let ms = hms % hours;

            let data = {
                days: difference / days,
                hours: hms / hours,
                minutes: ms / minutes,
                seconds: ms % minutes
            }

            for (let key in data) {
                data[key] = parseInt(data[key]);
            }

            console.log(data);
            return data;
        },

        // updates clock every second
        update: function (data) {
            let id = setInterval(async () => {
                if (data.seconds > 0) data.seconds--;
                else if (data.minutes > 0) {
                    data.minutes--;
                    data.seconds = 59;
                } else if (data.hours > 0) {
                    data.hours--;
                    data.minutes = 59;
                    data.seconds = 59;
                } else if (data.days > 0) {
                    data.days--;
                    data.hours = 23;
                    data.minutes = 59;
                    data.seconds = 59;
                } else {
                    data = {
                        days: 0,
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    }
                    message.className = "displayOn";
                    message.innerText = "Your timer has expired.";
                    clearInterval(id);
                }
                this.inject(data);

            }, 1000, data, this.inject)
        },

        push: function (timerData, data) {

            timerData.days = data.days;
            timerData.hours = data.hours;
            timerData.minutes = data.minutes;
            timerData.seconds = data.seconds;
        },

        convert: function (num) {
            if (num < 10) return '0' + num;
            else return num;
        }
    }
}