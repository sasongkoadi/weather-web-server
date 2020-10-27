const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = 3500 
//Define request method
const geocode = require('./Utility/geocode')
const forecast = require('./Utility/weather')
//Define Path a folder
const publicPath = path.join(__dirname, '../public/') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialView = path.join(__dirname, '../templates/partials')
//Setup to use view using handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialView)
//Setup to use file on public folder
app.use(express.static(publicPath))
//Route to make endpoint
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sasongko Adi'
    })
})
app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Need Help?',
        helpText: 'Frequently Ask Question',
        name: 'Sasongko Adi'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sasongko Adi'
    })
})

/*IMPORTANT NOTE 
    weather?loc= method using callback function
    it starts from address passing to geocode method, there are two condition
    value of address and callback. When request geocode true, callback will give values of place_name, latitude, and longitude
    but if it's false, it will give error information.
    
    When that methods true, it will passing values of latitude and longitude to forecast methods
    forecast method using a same way with geocode method.


*/
app.get('/weather', (req, res) => {
    const address = req.query.loc
    if (!address) {
        return res.send({
            error: 501,
            message: 'Please input your location'
        })
    } else {
        geocode(address, (error, { place_name, latitude, longitude }) => {
            if (error) {
                return  res.send({
                    error: error
                });
            }
            forecast(
                latitude,
                longitude,
                (error, { temp, feelslike, weatherDescription }) => {
                    if (error) {
                        return res.send({
                            error: error});
                    }
                    res.send({
                        location: place_name,
                        temperature: temp,
                        description: weatherDescription,
                        feels: feelslike
                    })
                }
            );
        });
    }
})

//Error handle 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Sasongko Adi',
        errorMessage: 'Help Article is not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Sasongko Adi',
        errorMessage: 'Your page is not Found'
    })
})

//Setup to run on port using listen function
app.listen(port, () => console.log(`Example app listening on port ${port}!`))