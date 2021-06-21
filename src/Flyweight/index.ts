/** https://refactoring.guru/pl/design-patterns/flyweight */


export interface IMineSweeperFieldType {
    has_mine(): boolean;
    is_flagged(): boolean;
    is_shown(): boolean;
}

export class MineSweeperFieldType implements IMineSweeperFieldType {
    constructor(
        protected readonly mine: boolean,
        protected readonly flagged: boolean,
        protected readonly shown: boolean
    ) { }

    has_mine(): boolean {
        return this.mine;
    }

    is_flagged(): boolean {
        return this.flagged;
    }

    is_shown(): boolean {
        return this.shown;
    }
}

export class MineSweeperFieldFactory {

    static fieldTypes: Array<MineSweeperFieldType> = [];

    static getFieldType(mine: boolean, flagged: boolean, shown: boolean) {
        let tmp = MineSweeperFieldFactory.fieldTypes.find(
            (e: MineSweeperFieldType) => {
                return e.has_mine() === mine &&
                    e.is_flagged() === flagged &&
                    e.is_shown() === shown;
            }
        )

        if (!tmp) {
            tmp = new MineSweeperFieldType(mine, flagged, shown);
            MineSweeperFieldFactory.fieldTypes.push(tmp);
        }

        return tmp;
    }

}

export class MineSweeperField implements IMineSweeperFieldType {
    private f_value: number = 0;

    constructor(
        protected readonly pos_x: number,
        protected readonly pos_y: number,
        protected type: MineSweeperFieldType
    ) { }

    x(): number {
        return this.pos_x;
    }

    y(): number {
        return this.pos_y;
    }

    value(): number {
        return this.f_value;
    }

    setValue(v: number): void {
        this.f_value = v;
    }

    setType(type: MineSweeperFieldType): void {
        this.type = type;
    }

    has_mine(): boolean {
        return this.type.has_mine();
    }

    is_flagged(): boolean {
        return this.type.is_flagged();
    }

    is_shown(): boolean {
        return this.type.is_shown();
    }
}

type MineCoords = { x: number, y: number };
export class MineSweeperBoard {
    private readonly fields: MineSweeperField[];

    constructor(private readonly b_size: number, mines: MineCoords[]) {
        this.fields = new Array(0);
        this.init(mines);
        this.setHints();
    }

    print(): void {
        for (let y = 0; y < this.b_size; y++) {
            const tmp = this.fields
                .filter(
                    (f: MineSweeperField) => f.y() === y
                )
                .map(
                    (f: MineSweeperField) => {
                        if (f.has_mine()) {
                            f.setValue("X" as any);
                        }
                        else {
                            f.setValue(`${f.value()}` as any);
                        }
                        return f;
                    }
                )
                .sort(
                    (a: MineSweeperField, b: MineSweeperField) => a.x() - b.x()
                )
                .map(
                    (f: MineSweeperField) => f.value()
                );

            console.log(tmp);
        }
    }

    private init(mines: MineCoords[]): void {
        for (let x = 0; x < this.b_size; x++) {
            for (let y = 0; y < this.b_size; y++) {
                const mined: MineCoords | undefined = mines.find(
                    (e: MineCoords) => e.x === x && e.y === y
                );

                this.fields.push(
                    new MineSweeperField(x, y,
                        MineSweeperFieldFactory.getFieldType(
                            mined ? true : false,
                            false,
                            false
                        )
                    )
                );

            }
        }
    }

    private setHints(): void {

        const incrementHint =
            (x: number, y: number, src: MineSweeperField[]): void => {
                let tmp: MineSweeperField | undefined =
                    src.find(
                        (e: MineSweeperField) => {
                            return e.x() === x
                                && e.y() === y
                        }
                    );
                if (tmp) {
                    tmp.setValue(tmp.value() + 1);
                }

            }

        this.fields.forEach(
            (f: MineSweeperField, _i: number, src: MineSweeperField[]) => {
                if (f.has_mine()) {
                    incrementHint(f.x()-1,  f.y()-1,    src);
                    incrementHint(f.x()-1,  f.y(),      src);
                    incrementHint(f.x()-1,  f.y()+1,    src);
                    incrementHint(f.x(),    f.y()-1,    src);
                    incrementHint(f.x(),    f.y()+1,    src);
                    incrementHint(f.x()+1,  f.y()-1,    src);
                    incrementHint(f.x()+1,  f.y(),      src);
                    incrementHint(f.x()+1,  f.y()+1,    src);
                }
            }
        );
    }
}

/** USAGE */

const msBoard = new MineSweeperBoard(5, [
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 3, y: 3 }
]);
msBoard.print();