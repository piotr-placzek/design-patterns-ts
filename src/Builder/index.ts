/** https://refactoring.guru/pl/design-patterns/builder */

export interface Document {
    type: string;
    text(): string;
}

export class PlainTextDocument implements Document {
    type: string;
    content: string;

    constructor() {
        this.type = "text/plain"
        this.content = "";
    }

    append(text: string) {
        this.content += text;
    }

    text(): string {
        return this.content;
    }
}

export class HtmlTextDocument implements Document {
    type: string;
    content: string;

    constructor() {
        this.type = "text/plain"
        this.content = "";
    }

    append(text: string) {
        this.content += text;
    }

    text(): string {
        return this.content;
    }
}

export interface Builder {
    getResult(): Document;
    insertTitle(value: string): void;
    insertChapter(value: string): void;
    insertText(value: string): void;
}

export class PlainTextDocumentBuilder implements Builder {
    private doc = new PlainTextDocument();

    getResult(): Document {
        const result = this.doc;
        this.doc = new PlainTextDocument();
        return result;
    }

    insertTitle(value: string): void {
        this.doc.append(
            `\n\n${value.toUpperCase()}\n\n`
        );
    }
    
    insertChapter(value: string): void {
        this.doc.append(
            `\n${value}\n\n`
        );
    }
    
    insertText(value: string): void {
        this.doc.append(
            `${value}\n`
        )
    }
}

export class HtmlTextDocumentBuilder implements Builder {
    private doc = new HtmlTextDocument();

    getResult(): Document {
        const result = this.doc;
        this.doc = new HtmlTextDocument();
        return result;
    }

    insertTitle(value: string): void {
        this.doc.append(
            `<h1>${value.toUpperCase()}</h1>\n`
        );
    }
    
    insertChapter(value: string): void {
        this.doc.append(
            `<h3>${value}<h3>\n`
        );
    }
    
    insertText(value: string): void {
        this.doc.append(
            `<p>${value}</p>\n`
        )
    }
}

export class Director {
    createExampleDocument(builder: Builder): Document {
        builder.insertTitle("Sample document");
        builder.insertChapter("1. Chapter one");
        builder.insertText("Contrary to popular belief, Lorem Ipsum is not simply random text.");
        builder.insertText("It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.");
        return builder.getResult();
    }
}

/** USAGE */

const plainTextBuilder = new PlainTextDocumentBuilder();
const plainTextDocument = new Director().createExampleDocument(plainTextBuilder).text();
console.log(plainTextDocument);


const htmlTextBuilder = new HtmlTextDocumentBuilder();
const htmlTextDocument = new Director().createExampleDocument(htmlTextBuilder).text();
console.log(htmlTextDocument);
