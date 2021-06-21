/** https://refactoring.guru/pl/design-patterns/singleton */

export class Singleton {
    
    private static instance: Singleton;
    
    private constructor() {}

    public static getInstance(): Singleton {
        if(!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    someValue: any;
}

/** USAGE */

const singletonInstance_1 = Singleton.getInstance();
const singletonInstance_2 = Singleton.getInstance();
singletonInstance_1.someValue = "This is instance 1";
singletonInstance_2.someValue = "This is instance 2";
console.log(singletonInstance_1 === singletonInstance_2);
console.log(singletonInstance_1);
console.log(singletonInstance_2);