/* let canvas = document.getElementById('background-canvas');
canvas.width = window.innerWidth - 10;
canvas.height = 500;

let ctx = canvas.getContext('2d');
ctx.font = "36px Literata, sans-serif";
ctx.fillStyle = '#001534';

*/

navigator.serviceWorker.register('sw.js');

function showNotification() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
    }
  });
}