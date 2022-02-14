const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=06fa7ba285f2aa82feca6f78c306bfd8&query=' + latitude + ',' + longtitude
    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('unable to connect location service', undefined)
        } else if (response.body.error) {
            callback(response.body.error.type, undefined)
        } else {
            callback(undefined, 'In ' + response.body.location.country + ' the temperature is ' + response.body.current.temperature)
        }
    })
}

module.exports = forecast