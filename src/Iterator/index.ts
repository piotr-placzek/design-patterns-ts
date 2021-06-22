/** https://refactoring.guru/pl/design-patterns/iterator */

import { FullMatrix } from "../Decorator";

export interface MatrixInerator {
    hasNext(): boolean;
    getNext(): number;
    next(): void;
    begin(): void;
    end(): void;
}

export class FullMatrixIterator implements MatrixInerator {
    protected currentElement: { x: number, y: number };

    constructor(protected readonly src: FullMatrix) {
        this.currentElement = { x: 0, y: 0 };
    }

    hasNext(): boolean {
        const last_x: number = this.src.d1() - 1;
        const last_y: number = this.src.d2() - 1;
        return !(this.currentElement.x > last_x && this.currentElement.y > last_y);
    }

    getNext(): number {
        const currentElementValue: number = this.src.get(this.currentElement.x, this.currentElement.y);

        if(this.hasNext()) {
            this.next();
        }

        return currentElementValue;
    }

    next(): void {
        this.currentElement.x++;
        if(this.currentElement.x == this.src.d1()) {
            this.currentElement.y++;
            if(this.currentElement.y < this.src.d2()) {
                this.currentElement.x = 0;
            }
        }
    }

    begin(): void {
        this.currentElement.x = 0;
        this.currentElement.y = 0;
    }

    end(): void {
        this.currentElement.x = this.src.d1() -1;
        this.currentElement.y = this.src.d2() -1;
    }
}

export class FullMatrixColumnIterator extends FullMatrixIterator {

    constructor(src: FullMatrix, column: number, f_row: number) {
        super(src);
        this.currentElement.x = column;
        this.currentElement.y = f_row;
    }
    
    hasNext(): boolean {
        const last_y: number = this.src.d2() - 1;
        return !(this.currentElement.y > last_y);
    }
    
    next(): void {
        this.currentElement.y++;
    }
    
    begin(): void {
        this.currentElement.y = 0;
    }
    
    end(): void {
        this.currentElement.y = this.src.d2() -1;
    }

}


export function main(): void {
    const m = new FullMatrix(3,3);
    m.set(0,0,0); m.set(1,0,1); m.set(2,0,2);
    m.set(0,1,3); m.set(1,1,4); m.set(2,1,5);
    m.set(0,2,6); m.set(1,2,7); m.set(2,2,8);

    const it = new FullMatrixIterator(m);
    const vm: number[] = [];
    while (it.hasNext()) {
        vm.push(it.getNext())
    }
    console.log(vm);

    const cit = new FullMatrixColumnIterator(m,1,1);
    const cvm: number[] = [];
    while (cit.hasNext()) {
        cvm.push(cit.getNext())
    }
    console.log(cvm);
}