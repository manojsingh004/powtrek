/// <reference types="react" />
import { ValueBase } from '@react-types/shared';
import { AriaFieldProps } from '@react-aria/label';
import { CommonInputFieldProps } from '../common/ui/inputs/input-field/input-field-props';
interface ColorPickerButtonProps extends AriaFieldProps, ValueBase<string>, CommonInputFieldProps {
}
export declare function ColorPickerButton(props: ColorPickerButtonProps): JSX.Element;
declare type ArrowProps = {
    isActive: boolean;
    className: string;
};
export declare function ArrowIcon({ isActive, className }: ArrowProps): JSX.Element;
export {};
