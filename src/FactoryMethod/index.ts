/** https://refactoring.guru/pl/design-patterns/factory-method */

export interface Transport {
    deliver(): string;
}

export class Truck implements Transport {
    deliver(): string { return "Truck"; }
}

export class Ship implements Transport {
    deliver(): string { return "Ship"; }
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

/** USAGE */

function factoryMethodClient(method: Logistics): Transport {
    return method.createTransport();
}

console.log(
    factoryMethodClient(new RoadLogistics()).deliver()
);

console.log(
    factoryMethodClient(new SeaLogistics()).deliver()
);