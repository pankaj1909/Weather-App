const request = require('request')

const forecast = (lattitide, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8b76e16b6ffef53a6379064fa1ff93cd/' + lattitide + ',' + longitude

    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service !', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            let data = body.currently.summary
            callback(undefined, data)
        }
    })
}

const geocoding = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGFua2FqMDkiLCJhIjoiY2s3bjJwdmpsMDA4ODNucHJpdWE3OG0wdSJ9.GCBw_ncZPbijkJQf4cP9EQ&limit=1'

    request({url: geoUrl, json: true}, (error, {body}) => {
        console.log(body)
        if (error) {
            callback('Unable to connect to geoCode service !', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find geoUrl location', undefined);
        } else {
            let data = body.features[0].center
            callback(undefined, {
                latitude: data[1],
                longitude: data[0],
                location: data.place_name
            })
        }

    })
}

module.exports = {
    forecast: forecast,
    geocoding: geocoding
}