/** https://refactoring.guru/pl/design-patterns/visitor */

export interface Visitor {
    visit(order: Order);
}

export class Order {
    constructor(private readonly _price: number) {}
    price(): number {
        return this._price;
    }

    accept(visitor: Visitor): void{
        visitor.visit(this);
    }
}

export class PlainTextExporter implements Visitor{
    visit(order: Order) {
        console.log("order exported:", order);
    }
}

/** USAGE */
export function main(): void {
    const exporter: PlainTextExporter = new PlainTextExporter();
    const order: Order = new Order(123);

    order.accept(exporter);
}