let canvas = document.getElementById('clock-canvas');
canvas.width = window.innerWidth - 10;
canvas.height = 500;

let ctx = canvas.getContext('2d');
ctx.font = "36px Literata, sans-serif";
ctx.fillStyle = '#001534';

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(timer.data.days + ' DAYS', canvas.width / 2+20, canvas.height / 2 - 50);
    ctx.fillText(convert(timer.data.hours) + ' : ' + convert(timer.data.minutes) + ' : ' + convert(timer.data.seconds), canvas.width / 2, canvas.height / 2);
    requestAnimationFrame(draw);
}

draw();

function convert(num) {
    if (num < 10) {
        return '0' + num;
    } else return num;
}