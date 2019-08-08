/* Driver Module - It runds the code*/

function renderView() {
    let params = getParams();
    let create = document.getElementById('timer-create');
    let clock = document.getElementById('timer-clock');
    let expired = document.getElementById('timer-expired');

    if (Object.values(params).length == 0) {
        clock.style.display = "none";
        expired.style.display = "none";
    } else {
        if (params.stamp == undefined || params.tz == undefined) {
            clock.style.display = "none";
            expired.style.display = "none";
        } else if (params.stamp < 1565069153 || isNaN(params.stamp) || !isNaN(params.tz)) {
            alert('Oops! It seems like your timer is broken. Please create a new one.');
            clock.style.display = "none";
            expired.style.display = "none";
        } else {
            create.style.display = "none";
            expired.style.display = "none";
            timer.clock(params);
        }
    }

}

renderView();