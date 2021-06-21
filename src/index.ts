
/** Factory Method+ */
import { Logistics, RoadLogistics, SeaLogistics, Transport } from "./FactoryMethod";

function factoryMethodClient(method: Logistics): Transport {
    return method.createTransport();
}

factoryMethodClient(new RoadLogistics()).deliver();
factoryMethodClient(new SeaLogistics()).deliver();


/** Abstract Factory */
import FurnitureFactory, { ArtDecoFurnitureFactory, Chair, CoffeeTable, ModernFurnitureFactory, Sofa, VictorianFurnitureFactory } from "./AbstractFactory";

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

abstractFactoryClient(new VictorianFurnitureFactory());
abstractFactoryClient(new ModernFurnitureFactory());
abstractFactoryClient(new ArtDecoFurnitureFactory());

/** Builder+ */
import { Director, HtmlTextDocumentBuilder, PlainTextDocumentBuilder } from "./Builder";

const plainTextBuilder = new PlainTextDocumentBuilder();
const plainTextDocument = new Director().createExampleDocument(plainTextBuilder).text();

const htmlTextBuilder = new HtmlTextDocumentBuilder();
const htmlTextDocument = new Director().createExampleDocument(htmlTextBuilder).text();

/** Prototype+ */
import { Android } from "./Prototype";

const android_1 = new Android(["CPU 3.0", "MEM 32GB"], ["main.cpp"]);
const android_2 = android_1.clone();
android_2.software.push("LIB: IMPOSTOR")

/** Singleton+ */
import { Singleton } from "./Singleton";

const singletonInstance_1 = Singleton.getInstance();
const singletonInstance_2 = Singleton.getInstance();
singletonInstance_1.someValue = "This is instance 1";
singletonInstance_2.someValue = "This is instance 2";
const equal = (singletonInstance_1 === singletonInstance_2);


/** Adapter */
/** Bridge+ */
/** Composite */

/** Decorator+ */
import { Matrix, Vector, MutipliedValueGetterMatrixDecorator, UniversalMatrixDecorator } from "./Decorator";

const vs: number = 3;
let vector: Matrix = new Vector(vs);
for (let v = 0; v < vs; v++) vector.set(v, 0, v);
const mdec = new MutipliedValueGetterMatrixDecorator(3, vector);
const udec = new UniversalMatrixDecorator(vector);
udec.setGetFunc(
    (x: number, y:number): number => {
        return udec.source().get(x, y) -1;
    }
)

/** Facade */

/** Flyweight+ */
import { MineSweeperBoard } from "./Flyweight";
const msBoard = new MineSweeperBoard(5, [
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 3, y: 3 }
]);

/** Proxy+ */

/** Chain of Responsibility */
/** Command */
/** Iterator */
/** Mediator */
/** Memento */
/** Observer */
/** State */
/** Strategy */
/** Teplate Method */
/** Visitor */
