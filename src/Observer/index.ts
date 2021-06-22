/** https://refactoring.guru/pl/design-patterns/observer */

import { UUID, createUuid } from "../.common";

export type Callback = () => void;
export type GeoLocationPos = { longitude: number, latitude: number };

export interface IEvent {
    subscribe(fn: Callback): UUID;
    unsubscribe(uuid: UUID): void;
    notify(): void;
}

export class Event implements IEvent {
    private subscribers: Map<string, Callback>;

    constructor() {
        this.subscribers = new Map<string, Callback>();
    }

    subscribe(fn: Callback): UUID {
        const uuid = createUuid();
        this.subscribers.set(uuid, fn);
        return uuid;
    }

    unsubscribe(uuid: UUID): void {
        this.subscribers.delete(uuid);
    }

    notify(): void {
        this.subscribers.forEach(
            (fn: Callback) => {
                fn();
            });
    }
}

export class GeoLocation {
    readonly locationChangedEvent: Event = new Event();
    readonly longitudeChangedEvent: Event = new Event();
    readonly latitudeChangedEvent: Event = new Event();

    constructor(private longitude: number, private latitude: number) { }

    setLongitude(longitude: number): void {
        this.longitude = longitude;
        this.longitudeChangedEvent.notify();
    }

    setLatitude(latitude: number): void {
        this.latitude = latitude;
        this.latitudeChangedEvent.notify();
    }

    setPos(longitude: number, latitude: number): void {
        this.setLongitude(longitude);
        this.setLatitude(latitude);
        this.locationChangedEvent.notify();
    }

    getPos(): GeoLocationPos {
        return {
            longitude: this.longitude,
            latitude: this.latitude
        };
    }
}

/** USAGE */
export function main(): void {
    const gl = new GeoLocation(50.05644641224292, 19.93759619863448);
    
    const pos: UUID = gl.locationChangedEvent.subscribe(
        (): void => {
            console.log("coords:", gl.getPos());
        }
    );
    
    const lon: UUID = gl.locationChangedEvent.subscribe(
        (): void => {
            console.log("longitude:",gl.getPos().longitude);
        }
    );
    
    const lat: UUID = gl.locationChangedEvent.subscribe(
        (): void => {
            console.log("latitude:",gl.getPos().latitude);
        }
    );

    gl.setPos(52.22040884696181, 21.01974942634759);
    gl.locationChangedEvent.unsubscribe(lon);
    gl.locationChangedEvent.unsubscribe(lat);
    gl.setPos(52.41181424673948, 16.93283565006386);
    gl.locationChangedEvent.unsubscribe(pos);
    gl.setPos(0,0);
}