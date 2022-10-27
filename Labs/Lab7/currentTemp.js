/*Aufgabe 2: REST-Zugriff aus einem Script (Abgabe)
Schreiben Sie ein Node.js-Script currentTemp.js, welches wttr.in verwendet, um die aktuelle Temperatur an einem bestimmten Ort auszugeben:1
$ node currentTemp.js Winterthur
11°
$ node currentTemp.js Madrid
15°
Verwenden Sie https.get des https-Moduls von Node.js. Die Daten des eingehenden Streams können
Sie einsammeln, indem Sie data-Events bearbeiten. Das end-Event zeigt den Abschluss des Streams
an, so dass die Daten mit JSON.parse ausgewertet werden können.*/

function currentTemp(location) {
    const https = require('https');
    const url = `https://wttr.in/${location}?format=j1`;
    https.get(url, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const weather = JSON.parse(data);
            console.log(weather.current_condition[0].temp_C);
        });
    });
}