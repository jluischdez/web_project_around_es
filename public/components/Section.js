export class Section {
    constructor({ items, renderer }, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        this.container = document.querySelector(containerSelector);
    }
    render() {
        this.items.forEach((item) => {
            this.renderItems(item);
        });
    }
    renderItems(item) {
        const element = this.renderer(item);
        this.addItem(element);
    }
    addItem(element) {
        this.container.prepend(element);
    }
    clear() {
        this.container.innerHTML = "";
    }
    setItem(items) {
        this.items = items;
    }
}
