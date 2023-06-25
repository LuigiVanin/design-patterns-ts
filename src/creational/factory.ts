export abstract class HtmlElement {
    innerHtml: string;
    tagName: string = "";
    constructor(content: string | HtmlElement[] = "") {
        this.innerHtml = Array.isArray(content)
            ? content.map((element) => element.render()).join("")
            : content;
    }

    abstract render(): string;
}

export class HtmlDiv extends HtmlElement {
    constructor(content: string | HtmlElement[] = "") {
        super(content);
        this.tagName = "DIV";
    }

    render() {
        return `<div>${this.innerHtml}</div>`;
    }
}

export class HtmlButton extends HtmlElement {
    onClick: () => void = () => {};

    constructor(content: string | HtmlElement[] = "") {
        super(content);
        this.tagName = "BUTTON";
    }

    setOnClick(onClick: () => void) {
        this.onClick = onClick;
    }

    render() {
        return `<button>${this.innerHtml}</button>`;
    }
}

type InputType =
    | "button"
    | "range"
    | "number"
    | "text"
    | "checkbox"
    | "radio"
    | "email";

export class HtmlInput extends HtmlElement {
    private type: InputType = "text";
    private value: string = "";

    constructor() {
        super("");
        this.tagName = "INPUT";
    }

    setType(type: InputType) {
        this.type = type;
    }

    setValue(value: string) {
        this.value = value;
    }

    render() {
        return `<input type="${this.type}" value="${this.value}" />`;
    }
}

export class HtmlElementFactory {
    constructor() {}

    createDiv(innerHtml: string | HtmlElement[]): HtmlDiv {
        return new HtmlDiv(innerHtml);
    }

    createButton(innerHtml: string | HtmlElement[]): HtmlButton {
        return new HtmlButton(innerHtml);
    }

    createInput(): HtmlInput {
        return new HtmlInput();
    }

    initialize<T extends HtmlElement>(
        element: string,
        innerHtml?: string | HtmlElement[]
    ): T {
        switch (element) {
            case "div":
                return this.createDiv(innerHtml || "") as unknown as T;
            case "button":
                return this.createButton(innerHtml || "") as unknown as T;
            case "input":
                return this.createInput() as unknown as T;
            default:
                throw Error("Element not found");
        }
    }
}

export class Application extends HtmlElement {
    private factory: HtmlElementFactory = new HtmlElementFactory();

    constructor() {
        super("");
    }

    render() {
        const button = this.factory.initialize("button", "Enviar");
        const input = this.factory.initialize("input");
        const container = this.factory.initialize("div", [input, button]);

        return container.render();
    }
}
