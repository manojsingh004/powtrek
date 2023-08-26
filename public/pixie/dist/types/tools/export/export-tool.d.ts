declare type ValidFormats = 'png' | 'jpeg' | 'json' | 'svg';
export declare class ExportTool {
    /**
     * Export current editor state in specified format.
     */
    save(name?: string, format?: ValidFormats, quality?: number): void;
    private getCanvasBlob;
    /**
     * Export current editor state as data url.
     */
    getDataUrl(format?: ValidFormats, quality?: number): string | null;
    private getJsonState;
    private prepareCanvas;
    private applyWaterMark;
    private getFormat;
    private getQuality;
}
export {};
