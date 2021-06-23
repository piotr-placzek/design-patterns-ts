/** https://refactoring.guru/pl/design-patterns/proxy */

export type Coords = { latitude: string, longitude: string };

export enum City {
    AMSTERDAM,
    LONDON,
    PARIS,
    BERLIN
}

export class Geo {
    private readonly map: Map<City, Coords> = new Map<City, Coords>();

    constructor() {
        this.map.set(City.AMSTERDAM,
            { latitude: "52.3700° N", longitude: "4.8900° E" });
        this.map.set(City.LONDON,
            { latitude: "51.5171° N", longitude: "0.1062° W" });
        this.map.set(City.PARIS,
            { latitude: "48.8742° N", longitude: "2.3470° E" });
        this.map.set(City.BERLIN,
            { latitude: "52.5233° N", longitude: "13.4127° E" });
    }

    getCoords(city: City): Coords {
        return this.map.has(city) ? 
            this.map.get(city) :
            {longitude: "?", latitude: "?"}
    }
}

export class GeoProxy {
    private srv: Geo = new Geo();
    private cache: Map<City, Coords> = new Map<City, Coords>();

    getCoords(city: City): Coords {
        if(!this.cache.has(city)) {
            this.cache.set(city, this.srv.getCoords(city))
        }

        return this.cache.get(city);
    }
}

/** USAGE */
export function main(): void {
    const geoSrv: GeoProxy = new GeoProxy();
    console.log(geoSrv.getCoords(City.PARIS));
}