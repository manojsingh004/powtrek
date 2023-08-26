import React from 'react';
import { InteractableRect } from '../../common/ui/interactions/interactable-rect';
import { Interactable } from '../../common/ui/interactions/interactable';
import { CropzoneRefs } from './ui/cropzone/cropzone-refs';
export declare class CropTool {
    private refs;
    zone?: Interactable;
    apply(box: Omit<InteractableRect, 'angle'>): Promise<void>;
    drawZone(rect: InteractableRect): void;
    resetCropzone(aspectRatioStr: string | null): void;
    registerRefs(refs: React.MutableRefObject<CropzoneRefs>): void;
}
