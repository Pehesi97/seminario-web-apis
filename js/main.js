window.addEventListener('unload', function(event) {
    var data = captureAnalyticsData(event);
    navigator.sendBeacon('/log.html', data);
});

var deck = bespoke.from('#presentation', [bespoke.themes.nebula(), bespoke.plugins.keys(), bespoke.plugins.progress(), bespoke.plugins.hash()]);

function captureAnalyticsData(event)
{
    var d = new Date();
    return d;
}

var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
}
else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
}
else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
}
else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

var musicElement = document.getElementById("musicElement");

function handleVisibilityChange() {
    if (document[hidden]) {
        musicElement.pause();
    } else {
        musicElement.play();
    }
}

if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
    alert("Esse navegador não suporta a Page Visibility API.");
}
else {
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
}

navigator.getBattery().then(function(battery) {
    document.getElementById('batteryst').innerHTML = 'Status da bateria: <strong>' + battery.level * 100 + ' %</strong>. ';

    battery.addEventListener('levelchange', function() {
        document.getElementById('batteryst').innerHTML = 'Status da bateria: <strong>' + battery.level * 100 + ' %</strong>. ';
    });
});
