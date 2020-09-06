const path = require('path')
const express = require('express')
const hbs = require('hbs')
const {forecast, geocoding} = require('./utils/commonFunction')

const app = express()

//Define paths for Express config
const PublicDirctoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(PublicDirctoryPath))

app.get('', (req, res) => {
    res.render('index', {
        forcast: 'forecast',
        locations: 'Berlin',
        title: 'Main Page',
        name: 'ABC'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        text: 'weather forcast',
        title: 'about Page',
        name: 'ABC'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'helpText render',
        title: 'help Page',
        name: 'ABC'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send(
            {
                error: "Please provide the address"
            }
        )
    }

    geocoding(req.query.address, (error, {latitude, longitude} = {}) => {
        if (error) {
            return res.send({
                    error: error
                }
            )
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                        error: error
                    }
                )
            }
            res.send({
                forecastData,
                address: req.query.address,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Error  404 Not Found',
        title: 'Error Page',
        name: 'ABC'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Error  404 Not Found',
        title: 'Error Page',
        name: 'ABC'
    })
})

app.listen(3000, () => {
    console.log('Serve is up nd running');

})