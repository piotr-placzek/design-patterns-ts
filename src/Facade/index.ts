/** https://refactoring.guru/pl/design-patterns/facade */

import { createUuid, UUID } from "../.common";

export class ParcelsSystem {
    private arr: string[] = []

    add(uuid: UUID): number {
        if(this.search(uuid) > -1) return -1;

        this.arr.push(uuid);
        
        return this.arr.length - 1;
    }

    search(uuid: UUID): number {
        return this.arr.indexOf(uuid);
    }
}

export class OrderingSystem {
    createOrder(): UUID {
        return createUuid();
    }
}

export class TrackingSystem {

    constructor(private readonly parcels: ParcelsSystem) {}

    track(uuid: UUID): number {
        return this.parcels.search(uuid);
    }
}

export class Facade {
    private parcels: ParcelsSystem = new ParcelsSystem();
    private orders: OrderingSystem = new OrderingSystem();
    private tracks: TrackingSystem = new TrackingSystem(this.parcels);

    crateOrder(): UUID {
        const uuid: string = this.orders.createOrder();
        const index: number = this.parcels.add(uuid);
        if(index < 0) {
            throw new Error(`can not create parcel whith uuid ${uuid}`);
        }
        else {
            return uuid;
        }
    }

    trackOrder(uuid: UUID): string {
        const index: number = this.tracks.track(uuid);
        if(index > -1){
            return `You are ${index+1} in the queue.`
        }
        else {
            return `Parcel with uuid ${uuid} does not exist.`
        }
    }
}

/** USAGE */
export function main(): void {
    const system: Facade = new Facade();
    const uuid: UUID = system.crateOrder();
    console.log(system.trackOrder(uuid));
}