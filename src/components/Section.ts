interface SectionConfig <T>{
    items: T[];
    renderer: (item: T) => HTMLElement;
}

export class Section <T> {
    private items: T[];
    private renderer: (item: T) => HTMLElement;
    private container: HTMLElement;

constructor(
    {items, renderer }: SectionConfig<T>,containerSelector: string
){
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector) as HTMLElement;
}
    public render(): void {
  this.items.forEach((item) => {
    this.renderItems(item);
  });
}

public renderItems(item: T): void {
  const element = this.renderer(item);
  this.addItem(element);
}

public addItem(element: HTMLElement): void {
  this.container.prepend(element);
}

public clear(): void {
  this.container.innerHTML = "";
}

public setItem(items: T[]): void {
  this.items = items;
}

}