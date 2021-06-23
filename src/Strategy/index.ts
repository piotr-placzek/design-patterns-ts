/** https://refactoring.guru/pl/design-patterns/strategy */

import { randomNumberFromRange } from "../.common";

const MIN = 0;
const MAX = 99;

export interface NumberStrategy {
    getNumber(): number;
}

export class RandomIntegerNumberStrategy implements NumberStrategy {
    getNumber(): number {
        return Math.floor(randomNumberFromRange(MIN,MAX));
    }
} 

export class RandomFloatingPointNumberStrategy implements NumberStrategy {
    getNumber(): number {
        return randomNumberFromRange(MIN,MAX);
    }
} 

export class RandomNumberGenerator {
    constructor(protected strategy: NumberStrategy) {}

    setStrategy(strategy: NumberStrategy) {
        this.strategy = strategy;
    }

    randmom(): number {
        return this.strategy.getNumber();
    }
}

/** USAGE */
export function main(): void {
    function int(): number {
        const strategy: NumberStrategy = new RandomIntegerNumberStrategy();
        const context: RandomNumberGenerator = new RandomNumberGenerator(strategy);
        return context.randmom();
    }

    function float(): number {
        const strategy: NumberStrategy = new RandomFloatingPointNumberStrategy();
        const context: RandomNumberGenerator = new RandomNumberGenerator(strategy);
        return context.randmom();
    }

    console.log("int:", int());
    console.log("float:", float());   
}