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
            message.innerHTML = '<div> Your timer has been expired or is broken, please create a new one. </div><br/> <a class="button" style="padding-top:0;" href="/"> Create New Timer </a> ';
        } else {
            clock.className = "displayOn";
            timer.clock(params);
        }
    }

}

renderView();


function copy() {
    let link = document.querySelector('#timer-link > input');
    link.value = window.location.href;
    link.select();
    link.setSelectionRange(0, 9999);
    document.execCommand("copy");

    alert('The shareable link has been successfully copied. \n Share Now!');
}