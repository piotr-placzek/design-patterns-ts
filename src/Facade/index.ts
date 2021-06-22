/** https://refactoring.guru/pl/design-patterns/facade */

export class ParcelsSystem {
    private arr: string[] = []

    add(uuid: string): number {
        if(this.search(uuid) > -1) return -1;

        this.arr.push(uuid);
        
        return this.arr.length - 1;
    }

    search(uuid: string): number {
        return this.arr.indexOf(uuid);
    }
}

export class OrderingSystem {
    createOrder(): string {
        const time: number = new Date().getTime();
        const uuid: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        return uuid.replace(/[xy]/g, (c: string): string => {
            const r: number = (time + Math.random() * 16) % 16 | 0;
            return c == 'x' ? r.toString() : (r & 0x3 | 0x8).toString(16);
        });
    }
}

export class TrackingSystem {

    constructor(private readonly parcels: ParcelsSystem) {}

    track(uuid: string): number {
        return this.parcels.search(uuid);
    }
}

export class Facade {
    private parcels: ParcelsSystem = new ParcelsSystem();
    private orders: OrderingSystem = new OrderingSystem();
    private tracks: TrackingSystem = new TrackingSystem(this.parcels);

    crateOrder(): string {
        const uuid: string = this.orders.createOrder();
        const index: number = this.parcels.add(uuid);
        if(index < 0) {
            throw new Error(`can not create parcel whith uuid ${uuid}`);
        }
        else {
            return uuid;
        }
    }

    trackOrder(uuid: string): string {
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
    const uuid: string = system.crateOrder();
    console.log(system.trackOrder(uuid));
}