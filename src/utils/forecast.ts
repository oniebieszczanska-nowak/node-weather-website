// @ts-ignore
import request from "postman-request";

interface WeatherStackResponse {
    current: {
        weather_descriptions: string[];
        temperature: number;
        feelslike: number;
    };
    error?: {
        info: string;
    };
}

type ForecastCallback = (error: string | undefined, data: string | undefined) => void;

export const forecast = (latitude: number, longitude: number, callback: ForecastCallback): void => {
    const url = `http://api.weatherstack.com/current?access_key=05d15510c56d01eceec58395a7814b9c&query=${latitude},${longitude}&units=m`;

    request({ url, json: true }, (error: any, { body }: { body: WeatherStackResponse }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const description = body.current.weather_descriptions[0];
            const temperature = body.current.temperature;
            const feelsLike = body.current.feelslike;
            callback(undefined, `${description}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`);
        }
    });
};

