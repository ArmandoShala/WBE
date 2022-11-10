 const https = require('node:https');

function logWeatherIn() {
    const name = process.argv[2] || 'Zurich';
    const URL = 'https://wttr.in/' + name + '?format=j1';
    https.get(URL, (res) => {
        let data = '';
        if (res.statusCode !== 200) {
            throw new Error('Request failed');
        }
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const weather = JSON.parse(data);
            console.log(`${weather.current_condition[0].FeelsLikeC}°C`);
        });
    }).on('error', (e) => {
        console.error(e);
    });
}

logWeatherIn();
