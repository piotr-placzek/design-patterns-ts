/** https://refactoring.guru/pl/design-patterns/composite */

export interface IProduct {
    price(): number;
}

export class Product implements IProduct {
    constructor(private readonly product_price: number) {}
    price(): number {
        return this.product_price;
    }
}

export class Package implements IProduct {
    private readonly content: IProduct[] = [];

    constructor(private readonly package_price: number) {}

    price(): number {
        let price = this.package_price;
        this.content.forEach(
            (p: IProduct) => {
                price += p.price();
            }
        )
        return price;
    }

    addProduct(product: IProduct): void {
        this.content.push(product);
    }
}

/** USAGE */
export function main(): void {
    const phone: IProduct = new Product(1200);
    const earbauds: IProduct = new Product(60);
    const charger: IProduct = new Product(30);
    const phoneBox: Package = new Package(10);
    phoneBox.addProduct(phone);
    phoneBox.addProduct(earbauds);
    phoneBox.addProduct(charger);

    const dock: IProduct = new Product(100);

    const order: Package = new Package(10);
    order.addProduct(dock);
    order.addProduct(phoneBox);
    order.addProduct(phoneBox);

    /**
     * (1200+60+30+10)*2+100+10 = 2710
     */
    console.log(order.price());
}