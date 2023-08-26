import {defineMessage} from 'react-intl';
import {HISTORY_DISPLAY_NAMES} from '../tools/history/history-display-names';

export enum ObjectName {
  Text = 'text',
  Shape = 'shape',
  Sticker = 'sticker',
  Drawing = 'drawing',
  Image = 'image',
  MainImage = 'mainImage',
  StraightenAnchor = 'straightenHelper',
}

export const OBJ_DISPLAY_NAMES = {
  [ObjectName.Text]: {
    name: defineMessage({defaultMessage: 'Text'}),
    icon: HISTORY_DISPLAY_NAMES.text.icon,
  },
  [ObjectName.Shape]: {
    name: defineMessage({defaultMessage: 'Shape'}),
    icon: HISTORY_DISPLAY_NAMES.shapes.icon,
  },
  [ObjectName.Sticker]: {
    name: defineMessage({defaultMessage: 'Sticker'}),
    icon: HISTORY_DISPLAY_NAMES.stickers.icon,
  },
  [ObjectName.Drawing]: {
    name: defineMessage({defaultMessage: 'Drawing'}),
    icon: HISTORY_DISPLAY_NAMES.draw.icon,
  },
  [ObjectName.Image]: {
    name: defineMessage({defaultMessage: 'Image'}),
    icon: HISTORY_DISPLAY_NAMES.overlayImage.icon,
  },
  [ObjectName.MainImage]: {
    name: defineMessage({defaultMessage: 'Background Image'}),
    icon: HISTORY_DISPLAY_NAMES.bgImage.icon,
  },
};
