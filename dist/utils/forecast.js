"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecast = void 0;
// @ts-ignore
const postman_request_1 = __importDefault(require("postman-request"));
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=05d15510c56d01eceec58395a7814b9c&query=${latitude},${longitude}&units=m`;
    (0, postman_request_1.default)({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            const description = body.current.weather_descriptions[0];
            const temperature = body.current.temperature;
            const feelsLike = body.current.feelslike;
            callback(undefined, `${description}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`);
        }
    });
};
exports.forecast = forecast;
//# sourceMappingURL=forecast.js.map