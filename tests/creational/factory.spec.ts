import {
    HtmlElementFactory,
    HtmlElement,
    Application,
} from "../../src/creational/factory";

describe("Creational Patterns --Factory--", () => {
    describe("facotry Patterns", () => {
        it("should correctly return the instances types of HtmlElement", () => {
            const factory = new HtmlElementFactory();

            const div = factory.initialize("div");
            const input = factory.initialize("input");
            const button = factory.initialize("button");

            expect(div).toBeInstanceOf(HtmlElement);
            expect(input).toBeInstanceOf(HtmlElement);
            expect(button).toBeInstanceOf(HtmlElement);

            expect(div.tagName).toBe("DIV");
            expect(input.tagName).toBe("INPUT");
            expect(button.tagName).toBe("BUTTON");

            for (const el of [div, input, button]) {
                expect(typeof el.render()).toBe("string");
            }

            expect(() => factory.initialize("p")).toThrowError(Error);
        });

        it("should be able to create a new instance of HtmlElementFactory using specific create methods", () => {
            const factory = new HtmlElementFactory();

            const div = factory.createDiv("Text");
            const input = factory.createInput();
            const button = factory.createButton("Text");

            expect(div).toBeInstanceOf(HtmlElement);
            expect(input).toBeInstanceOf(HtmlElement);
            expect(button).toBeInstanceOf(HtmlElement);

            expect(div.tagName).toBe("DIV");
            expect(input.tagName).toBe("INPUT");
            expect(button.tagName).toBe("BUTTON");

            for (const el of [div, input, button]) {
                expect(typeof el.render()).toBe("string");
            }
        });

        it(`should be able to create a new instance of HtmlElementFactory using specific
            create methods and compare with instances created with the generic create method`, () => {
            const factory = new HtmlElementFactory();

            const div = factory.createDiv("Text");
            const input = factory.createInput();
            const button = factory.createButton("Text");

            const div2 = factory.initialize("div", "Text");
            const input2 = factory.initialize("input");
            const button2 = factory.initialize("button", "Text");

            expect(div).toBeInstanceOf(HtmlElement);
            expect(input).toBeInstanceOf(HtmlElement);
            expect(button).toBeInstanceOf(HtmlElement);

            expect(div2).toBeInstanceOf(HtmlElement);
            expect(input2).toBeInstanceOf(HtmlElement);
            expect(button2).toBeInstanceOf(HtmlElement);

            expect(div.tagName).toBe(div2.tagName);
            expect(input.tagName).toBe(input2.tagName);
            expect(button.tagName).toBe(button2.tagName);
        });

        it("the Application should be able to render a div, input and button and should not throw any errors", () => {
            const app = new Application();
            let { render } = app;
            let appHtml: ReturnType<typeof render>;

            expect(() => {
                appHtml = app.render();
                expect(typeof appHtml).toBe("string");
                expect(appHtml.includes("<div>")).toBe(true);
                expect(appHtml.includes("<input")).toBe(true);
                expect(appHtml.includes("<button>")).toBe(true);
            }).not.toThrowError(Error);
        });
    });
});
