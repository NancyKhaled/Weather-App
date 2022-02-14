const request = require('request')

const geocode = (address, callback) => {
    
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibmtoYWxlZCIsImEiOiJja3pmYmF3bW8wMGNvMm5wZHRuN29wbzdjIn0.YPfkLHGlb8ucehUl-lVF0w'
    request({
        url: mapUrl,
        json: true
    }, (error, response) => {
        if (error) {
            callback('unable to connect location service', undefined)
        } else if (response.body.message) {
            callback(response.body.message, undefined)
        } else if (response.body.features.length == 0) {
            callback('unable to find location .. try again', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longtitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode