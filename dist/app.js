"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
// @ts-ignore
const hbs_1 = __importDefault(require("hbs"));
const geocode_1 = require("./utils/geocode");
const forecast_1 = require("./utils/forecast");
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3000', 10);
console.log('🚀 Server starting with TypeScript hot reloading enabled!');
// Define paths for Express config
const publicDirPath = path_1.default.join(__dirname, '../public');
const viewsPath = path_1.default.join(__dirname, '../templates/views');
const partialsPath = path_1.default.join(__dirname, '../templates/partials');
// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs_1.default.registerPartials(partialsPath);
app.use(express_1.default.static(publicDirPath));
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Olga Niebieszczanska-Nowak"
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: "Weather App",
        name: "Olga Niebieszczanska-Nowak"
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: "Help message",
        title: 'Help',
        name: "Olga Niebieszczanska-Nowak"
    });
});
app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            products: {},
            error: 'You must provide a search term'
        });
        return;
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address'
        });
        return;
    }
    const address = req.query.address;
    (0, geocode_1.geocode)(address, (error, data) => {
        if (error) {
            res.send({
                error: error
            });
            return;
        }
        if (data) {
            (0, forecast_1.forecast)(data.latitude, data.longitude, (error, forecastData) => {
                if (error) {
                    res.send({
                        error: error
                    });
                    return;
                }
                res.send({
                    address: address,
                    forecast: forecastData,
                });
            });
        }
    });
});
app.use((req, res) => {
    res.status(404).send('My 404 page');
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
//# sourceMappingURL=app.js.map