declare module 'page-flip' {
  export class PageFlip {
    constructor(element: HTMLElement, options: any);
    loadFromHTML(elements: NodeListOf<HTMLElement> | HTMLElement[]): void;
    flipNext(corner?: string): void;
    flipPrev(corner?: string): void;
    flip(pageIndex: number, corner?: string): void;
    getPageCount(): number;
    getCurrentPageIndex(): number;
    on(event: string, callback: (e: any) => void): void;
    destroy(): void;
  }
}
