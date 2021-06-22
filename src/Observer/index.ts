/** https://refactoring.guru/pl/design-patterns/observer */

export type Callback = () => void;
export type GeoLocationPos = {longitude: number, latitude: number};

export interface Subject {
    subscribe(fn: Callback): number;
    unsubscribe(i: number): void;
}

export class GeoLocation implements Subject {
    private subscribers: Callback[];

    constructor(private longitude: number, private latitude: number) {
        this.subscribers = [];
    }

    setPos(longitude: number, latitude: number): void {
        this.longitude = longitude;
        this.latitude = latitude;
        this.notify();
    }

    getPos(): GeoLocationPos {
        return {
            longitude: this.longitude,
            latitude: this.latitude
        };
    }

    subscribe(fn: Callback): number {
        //TODO:
        //* callbacks should be better stored
        //  to avoid undefined elements inside subscribers
        this.subscribers.push(fn);
        return this.subscribers.length -1;
    }

    unsubscribe(i: number): void {
        this.subscribers[i] = undefined;
    }

    private notify(): void {
        this.subscribers.forEach(
            (fn: Callback) => {
                if (fn != undefined) {
                    fn();
                }
            });
    }

}

/** USAGE */
export function main(): void {
    const gl = new GeoLocation(50.33965994362576, 18.88941134472092);
    const i: number = gl.subscribe(
        (): void => {
            console.log(gl.getPos());
        }
    );
    gl.setPos(50.29919417217431, 18.703455245758594);
    gl.unsubscribe(i);
    gl.setPos(50.292542613801224, 18.681031256488975);
}