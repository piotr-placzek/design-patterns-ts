/** https://refactoring.guru/pl/design-patterns/decorator */

export interface Matrix {
    d1(): number;
    d2(): number;
    get(x: number, y: number): number;
    set(x: number, y: number, v: number): void;
    print(): void;
}

export function printHelper(matrix: Matrix) {
    for (let x = 0; x < matrix.d1(); x++) {
        for (let y = 0; y < matrix.d2(); y++) {
            console.log(`[${x}][${y}]: ${matrix.get(x, y)}`);
        }
    }   
}

export class Vector implements Matrix {

    private readonly array: Array<Array<number>>;

    constructor(d1: number) {
        this.array = new Array(d1);
        for (let x = 0; x < d1; x++) {
            this.array[x] = new Array(1);
        }
    }

    d1(): number {
        return this.array.length;
    }
    d2(): number {
        return 1;
    }
    get(x: number, y: number): number {
        return this.array[x][y];
    }
    set(x: number, y: number, v: number): void {
        if (y > 0 ) throw new Error("To high Y coordinate.");
        this.array[x][y] = v;
    }
    print(): void {
        printHelper(this);
    }

}

export class FullMatrix implements Matrix {

    private readonly array: Array<Array<number>>;

    constructor(d1: number, d2: number) {
        this.array = new Array(d1);
        for (let x = 0; x < d1; x++) {
            this.array[x] = new Array(d2);
        }
    }

    d1(): number {
        return this.array.length;
    }
    d2(): number {
        return this.array[0].length;
    }
    get(x: number, y: number): number {
        return this.array[x][y];
    }
    set(x: number, y: number, v: number): void {
        this.array[x][y] = v;
    }
    print(): void {
        printHelper(this);
    }
}

export class MatrixDecorator implements Matrix {
    constructor(protected readonly src: Matrix) { }

    d1(): number {
        return this.src.d1();
    }
    d2(): number {
        return this.src.d2();
    }
    get(x: number, y: number): number {
        return this.src.get(x, y);
    }
    set(x: number, y: number, v: number): void {
        this.src.set(x, y, v);
    }
    print(): void {
        printHelper(this);
    }

}

export class MutipliedValueGetterMatrixDecorator extends MatrixDecorator{

    constructor(protected readonly mult: number, src: Matrix) {
        super(src);
    }

    get(x: number, y: number): number {
        return this.src.get(x, y) * this.mult;
    }

}