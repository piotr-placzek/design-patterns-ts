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