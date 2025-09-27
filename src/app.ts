import path from 'path';
import express, { Request, Response } from 'express';
// @ts-ignore
import hbs from 'hbs';
import { geocode } from './utils/geocode';
import { forecast } from './utils/forecast';

const app = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

console.log('🚀 Server starting with TypeScript hot reloading enabled!');

// Define paths for Express config
const publicDirPath: string = path.join(__dirname, '../public');
const viewsPath: string = path.join(__dirname, '../templates/views');
const partialsPath: string = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));

// Interface for query parameters
interface WeatherQuery {
    address?: string;
}

interface ProductsQuery {
    search?: string;
}

// Interface for response data
interface WeatherResponse {
    address?: string;
    forecast?: string;
    error?: string;
}

interface ProductsResponse {
    products: {};
    error?: string;
}

app.get('', (req: Request, res: Response) => {
    res.render('index', {
        title: "Weather App",
        name: "Olga Niebieszczanska-Nowak"
    });
});

app.get('/about', (req: Request, res: Response) => {
    res.render('about', {
        title: "Weather App",
        name: "Olga Niebieszczanska-Nowak"
    });
});

app.get('/help', (req: Request, res: Response) => {
    res.render('help', {
        helpMessage: "Help message",
        title: 'Help',
        name: "Olga Niebieszczanska-Nowak"
    });
});

app.get('/products', (req: Request<{}, ProductsResponse, {}, ProductsQuery>, res: Response<ProductsResponse>) => {
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

app.get('/weather', (req: Request<{}, WeatherResponse, {}, WeatherQuery>, res: Response<WeatherResponse>) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address'
        });
        return;
    }

    const address = req.query.address;

    geocode(address, (error: string | undefined,
                      data: { latitude: number; longitude: number } | undefined) => {
        if (error) {
            res.send({
                error: error
            });
            return;
        }

        if (data) {
            forecast(data.latitude, data.longitude, (error: string | undefined, forecastData: string | undefined) => {
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

app.use((req: Request, res: Response) => {
    res.status(404).send('My 404 page');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
