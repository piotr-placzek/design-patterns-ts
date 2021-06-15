/** https://refactoring.guru/pl/design-patterns/factory-method */

export interface Transport {
    deliver: Function;
}

export class Truck implements Transport {
    deliver(): void { }
}

export class Ship implements Transport {
    deliver(): void { }
}

export abstract class Logistics {
    abstract createTransport(): Transport;
    planDelivery(): Transport { return this.createTransport(); }
}

export class RoadLogistics extends Logistics {
    createTransport(): Transport { return new Truck(); }
}

export class SeaLogistics extends Logistics {
    createTransport(): Transport { return new Ship(); }
}