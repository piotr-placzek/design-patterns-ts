/** https://refactoring.guru/pl/design-patterns/adapter */

export interface Compound {
    carbon?: number;
    oxygen?: number;
    hydrogen?: number;
}

export interface Extractor {
    getOxygen(): number | undefined;
    getCarbon(): number | undefined;
    getHydrogen(): number | undefined;
}

export class CompoundExtractor implements Extractor {
    private src: Compound = {};

    setCompound(compound: Compound): void {
        this.src = compound;
    }

    getOxygen(): number | undefined {
        return this.src.oxygen;
    }

    getCarbon(): number | undefined {
        return this.src.carbon;
    }

    getHydrogen(): number | undefined {
        return this.src.hydrogen;
    }
}

export class CompoundExtractorAdapter {
    private readonly OXYGEN: string = "O";
    private readonly CARBON: string = "C";
    private readonly HYDROGEN: string = "H";
    readonly extractor: CompoundExtractor = new CompoundExtractor();
    
    private compound: Compound = {};

    constructor(compound: string) {
        this.convStrToCmp(compound.toUpperCase().split(''));
        this.extractor.setCompound(this.compound);
    }

    private count(from: number, src: string[]): number {
        let c: number = 0;
        while (!isNaN(parseInt(src[from]))) {       
            c = c * 10 + parseInt(src[from]);
            from++;
        }
        return c ? c : 1;
    }

    private convStrToCmp(src: string[]): void {

        if (src.includes(this.OXYGEN)) {
            this.compound.oxygen = this.count(
                src.indexOf(this.OXYGEN) + 1,
                src
            );
        }

        if (src.includes(this.CARBON)) {
            this.compound.carbon = this.count(
                src.indexOf(this.CARBON) + 1,
                src
            );
        }

        if (src.includes(this.HYDROGEN)) {
            this.compound.hydrogen = this.count(
                src.indexOf(this.HYDROGEN) + 1,
                src
            );
        }
    }
}

/** USAGE */
export function main(): void {
    function print(prefix: string, adapter: CompoundExtractorAdapter): void {
        console.log("FOR", "\t\t", prefix);
        console.log('oxygen:', "\t", adapter.extractor.getOxygen());
        console.log('carbon:', "\t", adapter.extractor.getCarbon());
        console.log('hydrogen:', "\t", adapter.extractor.getHydrogen());
        console.log("\n");
    }

    const co2 = new CompoundExtractorAdapter("co2");
    print('co2', co2);
    
    const h2o = new CompoundExtractorAdapter("h2o");
    print('h2o', h2o);
}