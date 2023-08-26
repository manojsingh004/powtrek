/// <reference types="react" />
declare type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
declare type Props = {
    position: Position;
    inset?: boolean;
};
export declare function CornerHandle({ position, inset }: Props): JSX.Element;
export {};
