"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocode = void 0;
const postman_request_1 = __importDefault(require("postman-request"));
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoib2xnYWJhaW4iLCJhIjoiY2xvNXJxZWhoMGN0dTJtbndtaGRibXh0eSJ9.N-H3Krf8ey5M2-tYgSOnzw&limit=1`;
    (0, postman_request_1.default)({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to find location, try another search!', undefined);
        }
        else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
            });
        }
    });
};
exports.geocode = geocode;
//# sourceMappingURL=geocode.js.map