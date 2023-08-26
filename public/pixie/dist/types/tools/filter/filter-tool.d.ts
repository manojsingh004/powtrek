import { IBaseFilter } from 'fabric/fabric-impl';
import { FilterConfig, FilterOptions } from './filter-list';
export interface FabricFilter extends IBaseFilter {
    type: string;
    matrix?: number[];
    [key: string]: any;
}
export declare class FilterTool {
    constructor();
    apply(filterName: string): void;
    syncState(): void;
    remove(filterName: string): void;
    getAll(): FilterConfig[];
    getByName(name: string): FilterConfig;
    isApplied(name: string): boolean;
    hasOptions(name: string): boolean;
    applyValue(filterName: string, optionName: string, optionValue: number | string): void;
    create(config: FilterConfig): IBaseFilter;
    addCustom(name: string, filter: object, editableOptions?: FilterOptions, initialConfig?: object): void;
    findFilterIndex(name: string, fabricFilters?: FabricFilter[]): number;
    private getByFabricFilter;
    private configMatchesFabricFilter;
    private matrixAreEqual;
    private getImages;
}
