/** https://refactoring.guru/pl/design-patterns/prototype */

type Hardware = any[];
type Software = any[];

export class Android {
    
    constructor(public hardware: Hardware, public software: Software) {}
    
    clone(): Android {
        const clone = Object.create(this);
        clone.hardware = Object.assign([],this.hardware);
        clone.software = Object.assign([],this.software);
        return clone;
    }

}

/** USAGE */
export function main(): void {
    const android_1 = new Android(["CPU 3.0", "MEM 32GB"], ["main.cpp"]);
    const android_2 = android_1.clone();
    android_2.software.push("LIB: IMPOSTOR")

    console.log(android_1 != android_2);
    console.log(android_1);
    console.log(android_2);
}