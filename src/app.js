
const express = require('express')
// access
const app = express()
const port = process.env.PORT || 3000

// Serve html,json
const path = require('path')
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

// Templatee engine (html + dyncamic features)
// hbs
app.set('view engine', 'hbs');
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

const hbs = require('hbs')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'weather app'
    })
})

const geocode = require('./tools/geocode')
const forecast = require('./tools/forecast')
app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'no location, please write location'
        })
    }
    geocode(req.query.location, (error, data) => {
        if(error) {
            return res.send({error: error})
        }
        forecast(data.latitude, data.longtitude, (erorr, forecastData) => {
            if(erorr) {
                return res.send({erorr})
            }
            res.send({
                location: req.query.location,
                forecast:forecastData
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'page not found',
        name: '404 error'
    })
})

// localhost:3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})