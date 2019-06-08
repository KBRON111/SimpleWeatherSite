const request = require('request');

const geocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const geocodeToken = 'pk.eyJ1Ijoia2Jyb24xMTEiLCJhIjoiY2p3aWRuYWpqMDM2MjN5cGM2anBoNWd1cSJ9.w5U8Bpzr0ugb5tVUH7Dgcg';
    const limit = 1;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${geocodeToken}&limit=${limit}`;

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback(error, undefined);
        } else if(body.message){
            callback(body.message, undefined);
        } else if (body.features.length === 0){
            callback('Unable to find location', undefined);
        } else {
            const { center, place_name: place }  = body.features[0];
            callback(undefined, {latitude: center[1], longitude: center[0], location: place});
        }
    });
}

module.exports = geocode;