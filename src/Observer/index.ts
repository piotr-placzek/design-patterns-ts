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

    constructor(private longitude: number, private latitude: number) { }

    setPos(longitude: number, latitude: number): void {
        this.longitude = longitude;
        this.latitude = latitude;
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
    const i: UUID = gl.locationChangedEvent.subscribe(
        (): void => {
            console.log(gl.getPos());
        }
    );
    gl.setPos(52.22040884696181, 21.01974942634759);
    gl.locationChangedEvent.unsubscribe(i);
    gl.setPos(52.41181424673948, 16.93283565006386);
}