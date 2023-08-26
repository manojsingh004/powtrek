import { ComponentType } from 'react';
import { MessageDescriptor } from 'react-intl';
import { ToolName } from '../tool-name';
import { SvgIconProps } from '../../common/icons/svg-icon';
export declare const HISTORY_DISPLAY_NAMES: Record<HistoryName, {
    name: MessageDescriptor;
    icon: ComponentType<SvgIconProps>;
}>;
export declare type HistoryName = ToolName | 'initial' | 'loadedState' | 'bgImage' | 'overlayImage' | 'objectStyle' | 'deletedObject';
