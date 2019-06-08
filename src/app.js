const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kevin Bronson'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kevin Bronson'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Message for testing',
        name: 'Kevin Bronson'
    });
})

app.get('/weather', (req,res) => {
    const address = req.query.address;
    if(!address){
        return res.send({error: 'No address provided!'});
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecast) => {
            if(error) {
                return res.send({error});
            }

            res.send({forecast, location});               
        });
    });
})

app.get('/help/*', (req, res) => {
    res.status(404).render('notFound', {title: '404 NOT FOUND', name: 'Kevin Bronson', message: 'Help page not found'});
})

app.get('*', (req, res) => {
    res.status(404).render('notFound', {title: '404 NOT FOUND', name: 'Kevin Bronson', message: 'Sorry, page not found'});
})


app.listen(3000, () => {
    console.log('Listening on port 3000');
});