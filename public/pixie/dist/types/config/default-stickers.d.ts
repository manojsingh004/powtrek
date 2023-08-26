import { MessageDescriptor } from 'react-intl';
export interface StickerCategory {
    name: string;
    items?: number;
    list?: string[];
    type: 'svg' | 'png';
    thumbnailUrl?: string;
    invertPreview?: boolean;
}
export declare const defaultStickers: StickerCategory[];
export declare const StickerCategoryMessages: Record<string, MessageDescriptor>;
