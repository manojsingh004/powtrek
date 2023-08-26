import { ITextOptions } from 'fabric/fabric-impl';
export declare const TEXT_CONTROLS_PADDING = 15;
export declare class TextTool {
    private readonly minWidth;
    add(text?: string, providedConfig?: ITextOptions): void;
    private autoPositionText;
}
