import {fabric} from 'fabric';
import React from 'react';
import {IShadowOptions, Shadow} from 'fabric/fabric-impl';
import {useIntl} from 'react-intl';
import {useStore} from '../../../state/store';
import {ColorPickerButton} from '../../../ui/color-picker-button';
import {Slider} from '../../../common/ui/inputs/slider/slider';
import {state, tools} from '../../../state/utils';

const shadowDefaults = {
  color: 'rgba(0, 0, 0, 0.6)',
  blur: 3,
  offsetX: -1,
  offsetY: 0,
};

export function ShadowTabPanel() {
  const {formatMessage} = useIntl();
  const shadow =
    useStore(s => s.objects.active.editableProps.shadow) || shadowDefaults;

  return (
    <>
      <ColorPickerButton
        value={shadow.color}
        size="xs"
        aria-label={formatMessage({defaultMessage: 'Shadow Color'})}
        onChange={color => {
          tools().objects.setValues({shadow: modifiedShadow({color})});
          state().setDirty(true);
        }}
      />
      <Slider
        aria-label="Shadow Blur"
        className="max-w-240"
        defaultValue={shadow.blur}
        onChange={blur => {
          tools().objects.setValues({
            shadow: modifiedShadow({blur}),
          });
          state().setDirty(true);
        }}
      />
    </>
  );
}

function modifiedShadow(options: IShadowOptions) {
  const current = tools().objects.getActive()?.shadow as Shadow | null;
  if (current) {
    Object.entries(options).forEach(([key, val]) => {
      current[key as keyof IShadowOptions] = val;
    });
    return current;
  }
  return new fabric.Shadow({
    ...shadowDefaults,
    ...options,
  });
}
