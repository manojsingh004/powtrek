import {useIntl} from 'react-intl';
import {useStore} from '../../../state/store';
import {ColorPickerButton} from '../../../ui/color-picker-button';
import {Slider} from '../../../common/ui/inputs/slider/slider';
import {state, tools} from '../../../state/utils';

export function OutlineTabPanel() {
  const {formatMessage} = useIntl();
  const outlineColor = useStore(s => s.objects.active.editableProps.stroke);
  const outlineWidth = useStore(
    s => s.objects.active.editableProps.strokeWidth
  );

  return (
    <>
      <ColorPickerButton
        size="xs"
        value={outlineColor}
        aria-label={formatMessage({defaultMessage: 'Outline Color'})}
        onChange={newColor => {
          tools().objects.setValues({stroke: newColor});
          state().setDirty(true);
        }}
      />
      <Slider
        aria-label="Outline Width"
        className="max-w-240"
        value={outlineWidth}
        onChange={newWidth => {
          tools().objects.setValues({strokeWidth: newWidth});
          state().setDirty(true);
        }}
      />
    </>
  );
}
