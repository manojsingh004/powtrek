export declare class TransformTool {
    private get straightenAnchor();
    rotateLeft(): void;
    rotateRight(): void;
    private rotateFixed;
    rotateFree(degrees: number): void;
    /**
     * Flip canvas vertically or horizontally.
     */
    flip(direction: 'horizontal' | 'vertical'): void;
    /**
     * Get minimum scale in order for image to fill the whole canvas, based on rotation.
     */
    private getImageScale;
    private storeObjectsRelationToHelper;
    private transformObjectsBasedOnHelper;
    resetStraightenAnchor(): void;
}
