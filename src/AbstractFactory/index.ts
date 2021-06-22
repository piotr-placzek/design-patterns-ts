/** https://refactoring.guru/pl/design-patterns/abstract-factory */

export interface Chair {}
export interface Sofa {}
export interface CoffeeTable {}

export class VictorianChair implements Chair {}
export class ModernChair implements Chair {}
export class ArtDecoChair implements Chair {}

export class VictorianSofa implements Sofa {}
export class ModernSofa implements Sofa {}
export class ArtDecoSofa implements Sofa {}

export class VictorianCoffeeTable implements CoffeeTable {}
export class ModernCoffeeTable implements CoffeeTable {}
export class ArtDecoCoffeeTable implements CoffeeTable {}

export default interface FurnitureFactory {
    createChair(): Chair;
    createSofa(): Sofa;
    createCoffeeTable(): CoffeeTable;
}

export class VictorianFurnitureFactory implements FurnitureFactory {
    createChair(): VictorianChair { return new VictorianChair(); }
    createSofa(): VictorianSofa { return new VictorianSofa(); }
    createCoffeeTable(): VictorianCoffeeTable { return new VictorianCoffeeTable(); }
}

export class ModernFurnitureFactory implements FurnitureFactory {
    createChair(): ModernChair { return new ModernChair(); }
    createSofa(): ModernSofa { return new ModernSofa(); }
    createCoffeeTable(): ModernCoffeeTable { return new ModernCoffeeTable(); }
}

export class ArtDecoFurnitureFactory implements FurnitureFactory {
    createChair(): ArtDecoChair { return new ArtDecoChair(); }
    createSofa(): ArtDecoSofa { return new ArtDecoSofa(); }
    createCoffeeTable(): ArtDecoCoffeeTable { return new ArtDecoCoffeeTable(); }
}

/** USAGE */
export function main(): void {
    function abstractFactoryClient(factory: FurnitureFactory): {
        chair: Chair,
        sofa: Sofa,
        coffeeTable: CoffeeTable
    } {
        const chair = factory.createChair();
        const sofa = factory.createSofa();
        const coffeeTable = factory.createCoffeeTable();
        return { chair, sofa, coffeeTable }
    }
    
    console.log(
    abstractFactoryClient(new VictorianFurnitureFactory())
    );
    
    console.log(
        abstractFactoryClient(new ModernFurnitureFactory())
    );
    
    console.log(
        abstractFactoryClient(new ArtDecoFurnitureFactory())
    );
}