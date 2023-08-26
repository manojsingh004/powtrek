import {defineMessages, MessageDescriptor} from 'react-intl';
import {ToolName} from '../tools/tool-name';
import type {NavItem} from './default-config';
import type {Pixie} from '../pixie';
import {HISTORY_DISPLAY_NAMES} from '../tools/history/history-display-names';

export const DEFAULT_NAV_ITEMS: NavItem[] = Object.values(ToolName).map(
  toolName => {
    return {
      name: toolName,
      icon: HISTORY_DISPLAY_NAMES[toolName].icon,
      action:
        toolName === ToolName.MERGE
          ? (editor: Pixie) => {
              editor.tools.merge.apply();
            }
          : toolName,
    };
  }
);

export const navItemMessages: Record<string, MessageDescriptor> =
  defineMessages({
    filter: {defaultMessage: 'Filter', description: 'Navbar item'},
    resize: {defaultMessage: 'Resize', description: 'Navbar item'},
    crop: {defaultMessage: 'Crop', description: 'Navbar item'},
    draw: {defaultMessage: 'Draw', description: 'Navbar item'},
    text: {defaultMessage: 'Text', description: 'Navbar item'},
    shapes: {defaultMessage: 'Shapes', description: 'Navbar item'},
    Stickers: {defaultMessage: 'Stickers', description: 'Navbar item'},
    frame: {defaultMessage: 'Frame', description: 'Navbar item'},
    corners: {defaultMessage: 'Corners', description: 'Navbar item'},
    merge: {defaultMessage: 'Merge', description: 'Navbar item'},
  });
