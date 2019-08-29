/* A Global Variabale used for displaying messages*/
let message = document.getElementById('timer-message');

/* Driver Module - It runds the code */
async function renderView() {
    let params = getParams();
    let create = document.getElementById('timer-create');
    let clock = document.getElementById('timer-clock');

    if (Object.values(params).length == 0) {
        create.style.display = "block";
    } else {
        if (params.stamp == undefined || params.tz == undefined) {
            create.className = "displayOn";
        } else if (isNaN(params.stamp) || !isNaN(params.tz) || params.stamp < (await getTime(params.tz)).unixtime) {

            message.className = "displayOn";
            message.innerText = "Your timer has been expired or is broken, please create a new one.";
            message.innerHTML += "<br/><a href=\"" + window.location.href + "\"> Create New  </a>";
        } else {
            clock.className = "displayOn";
            timer.clock(params);
        }
    }

}

renderView();