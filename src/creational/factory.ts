// NOTE: This Need to be reviewed
abstract class HtmlElement {
    innerHtml: string;
    constructor(content: string | HtmlElement[] = "") {
        this.innerHtml = Array.isArray(content)
            ? content.map((element) => element.render()).join("")
            : content;
    }

    abstract render(): string;
}

class HtmlDiv extends HtmlElement {
    constructor(content: string | HtmlElement[] = "") {
        super(content);
    }

    render() {
        return `<div>${this.innerHtml}</div>`;
    }
}

class HtmlButton extends HtmlElement {
    onClick: () => void = () => {};

    constructor(content: string | HtmlElement[] = "") {
        super(content);
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

class HtmlInput extends HtmlElement {
    private type: InputType = "text";
    private value: string = "";

    constructor() {
        super("");
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

class HtmlElementFactory {
    initialize(
        element: string,
        innerHtml?: string | HtmlElement[]
    ): HtmlElement {
        switch (element) {
            case "div":
                return new HtmlDiv(innerHtml || "");
            case "button":
                return new HtmlButton(innerHtml || "");
            case "input":
                return new HtmlInput();
            default:
                throw Error("Element not found");
        }
    }
}

class Application extends HtmlElement {
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
