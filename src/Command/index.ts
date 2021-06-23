/** https://refactoring.guru/pl/design-patterns/command */

export interface Command {
    execute(): void;
}

export class Button {
    constructor(private readonly cmd: Command) {}
    click(): void {
        this.cmd.execute();
    }
}

export class SaveFileCommand implements Command {
    execute(): void {
        console.log("saved");
    }
}

export class RemoveFileCommand implements Command {
    execute(): void {
        console.log("removed");
    }
}

/** USAGE */
export function main(): void {
    const saveCmd: Command = new SaveFileCommand();
    const saveBtn: Button = new Button(saveCmd);
    saveBtn.click();

    const removeCmd: Command = new RemoveFileCommand();
    const removeBtn: Button = new Button(removeCmd);
    removeBtn.click();
}