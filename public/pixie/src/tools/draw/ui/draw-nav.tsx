import React, {useEffect, useState} from 'react';
import {Item} from '@react-stately/collections';
import {FormattedMessage} from 'react-intl';
import {ColorPickerButton} from '../../../ui/color-picker-button';
import {useStore} from '../../../state/store';
import {useActiveTheme} from '../../../utils/init-themes';
import {tools} from '../../../state/utils';
import {assetUrl} from '../../../utils/asset-url';
import {
  ScrollableView,
  ScrollableViewItem,
} from '../../../ui/navbar/scrollable-view';
import {Picker} from '../../../common/ui/inputs/select/picker';

export function DrawNav() {
  useEffect(() => {
    tools().draw.enable();
    return () => {
      tools().draw.disable();
    };
  }, []);

  return (
    <ScrollableView gap="gap-16" className="justify-center">
      <ScrollableViewItem>
        <ColorPickerButton
          size="sm"
          label={<FormattedMessage defaultMessage="Brush Color" />}
          value={tools().draw.currentBrush.color}
          onChange={newColor => {
            tools().draw.setBrushColor(newColor);
          }}
        />
      </ScrollableViewItem>
      <ScrollableViewItem>
        <TypeSelect />
      </ScrollableViewItem>
      <ScrollableViewItem>
        <SizeSelect />
      </ScrollableViewItem>
    </ScrollableView>
  );
}

function SizeSelect() {
  const sizes = useStore(s => s.config.tools?.draw?.brushSizes) || [];
  const [selectedSize, setSelectedSize] = useState(
    tools().draw.currentBrush.width
  );

  const items = sizes.map(size => {
    return {key: size, value: size};
  });
  return (
    <Picker
      items={items}
      value={selectedSize}
      onChange={(newValue: number) => {
        setSelectedSize(newValue);
        tools().draw.setBrushSize(newValue);
      }}
      size="sm"
      label="Brush Size"
    >
      {item => (
        <Item textValue={`${item.key}`}>
          <div className="flex items-center">
            <div
              className="flex-shrink-0 mr-8 border-[3px] rounded-full"
              style={{width: `${item.key}px`, height: `${item.key}px`}}
            />
            {item.key}
          </div>
        </Item>
      )}
    </Picker>
  );
}

function TypeSelect() {
  const types = useStore(s => s.config.tools?.draw?.brushTypes) || [];
  const activeTheme = useActiveTheme();
  const [selectedType, setSelectedType] = useState(
    tools().draw.currentBrush.type
  );

  return (
    <Picker
      value={selectedType}
      onChange={(value: string) => {
        setSelectedType(value);
        tools().draw.setBrushType(value);
      }}
      size="sm"
      label="Brush Type"
    >
      {types.map(type => (
        <Item key={type} textValue={type}>
          <div className="flex items-center">
            <img
              className="flex-shrink-0 mr-8 w-24 h-24"
              src={getBrushPreview(type, activeTheme?.isDark)}
              alt=""
            />
            {type}
          </div>
        </Item>
      ))}
    </Picker>
  );
}

function getBrushPreview(type: string, isDarkMode = false): string {
  const name = type.replace('Brush', '').toLowerCase();
  const dir = isDarkMode ? 'white' : 'black';
  return assetUrl(`images/brushes/${dir}/${name}.png`);
}
