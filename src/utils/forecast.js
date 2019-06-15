const request = require('request');

const forecast = (lat, long, callback) => {
    const apiKey = '25964703c006f3ef71be9e224b590e53';
    const url = `https://api.darksky.net/forecast/${apiKey}/${lat},${long}`;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined);
        } else if(body.error){
            callback(body.error, undefined);
        } else {
            const current = body.currently;
            const todayData = body.daily.data[0];
            const results = `${todayData.summary}
The high for today is ${todayData.temperatureHigh} and the low is ${todayData.temperatureLow}, currently it is ${current.temperature} degrees out. 
The humidity is ${current.humidity * 100}%.
There is a ${current.precipProbability * 100}% chance of rain.`;
            callback(undefined, results);
        }
    });
}

module.exports = forecast;