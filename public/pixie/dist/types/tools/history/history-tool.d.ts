import { SerializedPixieState } from './serialized-pixie-state';
import { HistoryItem } from './history-item.interface';
import { HistoryName } from './history-display-names';
export declare class HistoryTool {
    undo(): Promise<void>;
    redo(): Promise<void>;
    canUndo(): boolean;
    canRedo(): boolean;
    /**
     * Reload current history state, getting rid of
     * any canvas changes that were not yet applied.
     */
    reload(): Promise<any>;
    /**
     * Replace current history item with current canvas state.
     */
    replaceCurrent(): void;
    addInitial(stateObj?: SerializedPixieState): void;
    addHistoryItem(params: {
        name: HistoryName;
        state?: SerializedPixieState;
    }): void;
    load(item: HistoryItem): Promise<any>;
}
