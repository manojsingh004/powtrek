import { RefObject } from 'react';
import { InteractableRect } from '../../../common/ui/interactions/interactable-rect';
export declare function rotateActiveObj(e: {
    rect: InteractableRect;
    prevRect?: InteractableRect;
}): void;
export declare function moveActiveObj(e: {
    rect: InteractableRect;
    prevRect?: InteractableRect;
}): void;
export declare function resizeActiveObj(e: {
    rect: InteractableRect;
    prevRect?: InteractableRect;
}): void;
export declare function syncBoxPositionWithActiveObj(boxRef: RefObject<HTMLElement>, floatingControlsRef: RefObject<HTMLElement>): void;
export declare function enableTextEditing(): void;
