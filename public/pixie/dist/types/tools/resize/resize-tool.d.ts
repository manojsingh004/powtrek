export declare class ResizeTool {
    /**
     * Resize image and other canvas objects. If "percentages" is false, width/height should be pixels, otherwise it should be percentages.
     */
    apply(payload: ResizePayload): void;
    /**
     * Resize canvas and all objects to specified scale.
     */
    private resize;
}
export interface ResizePayload {
    width: number;
    height: number;
    maintainAspect: boolean;
    usePercentages: boolean;
}
