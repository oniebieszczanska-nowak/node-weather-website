interface GeocodeData {
    latitude: number;
    longitude: number;
}
type GeocodeCallback = (error: string | undefined, data: GeocodeData | undefined) => void;
export declare const geocode: (address: string, callback: GeocodeCallback) => void;
export {};
//# sourceMappingURL=geocode.d.ts.map