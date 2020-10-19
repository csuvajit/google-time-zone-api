import fetch from 'node-fetch';
import qs from 'querystring';

interface Location {
    dstOffset: number;
    rawOffset: number;
    status: string;
    timeZoneId: string;
    timeZoneName: string;
}

export class Client {
    authToken: string;
    constructor(authToken: string) {
        this.authToken = authToken;
    }

    private async location(query: string) {
        const params = qs.stringify({
            address: query,
            key: this.authToken
        });
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`);
        const data = await res.json();
        if (data.status === 'OK' && data.results[0]) return data.results[0];
        throw new Error('Unknown Location');
    }

    public async search(query: string): Promise<Location> {
        const location = await this.location(query);
        const params = qs.stringify({
            key: this.authToken,
            timestamp: Date.now() / 1000
        });
        const res = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?${params}&location=${location.geometry.location.lat},${location.geometry.location.lng}`);
        return res.json();
    }
}
