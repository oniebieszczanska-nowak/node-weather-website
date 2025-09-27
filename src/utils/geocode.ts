// @ts-ignore
import request from "postman-request";

interface GeocodeData {
    latitude: number;
    longitude: number;
}

interface MapboxResponse {
    features: Array<{
        center: [number, number];
    }>;
}

type GeocodeCallback = (error: string | undefined, data: GeocodeData | undefined) => void;

export const geocode = (address: string, callback: GeocodeCallback): void => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoib2xnYWJhaW4iLCJhIjoiY2xvNXJxZWhoMGN0dTJtbndtaGRibXh0eSJ9.N-H3Krf8ey5M2-tYgSOnzw&limit=1`;

    request({ url, json: true }, (error: any, { body }: { body: MapboxResponse }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search!', undefined);
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
            });
        }
    });
};

