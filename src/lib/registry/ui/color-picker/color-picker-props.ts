import {
    type HsvaColor,
    type RgbaColor,
} from 'svelte-awesome-color-picker';
import { Colord } from 'colord';

export type ColorPickerProps = {
    /** input label, hidden when the ColorPicker is always shown (prop `isDialog={false}`) */
    label?: string;
    /** input name, useful in a native form */
    name?: string | undefined;
    /** if set to true, the color picker becomes nullable (rgb, hsv and hex set to undefined) */
    nullable?: boolean;
    /** rgb color */
    rgb?: RgbaColor | null;
    /** hsv color */
    hsv?: HsvaColor | null;
    /** hex color */
    hex?: string | null;
    /** Colord color */
    color?: Colord | null;
    /** indicator whether the selected color is light or dark */
    isDark?: boolean;
    /** if set to false, disables the alpha channel */
    isAlpha?: boolean;
    /** if set to false, the input and the label will not be displayed and the ColorPicker will always be visible */
    isDialog?: boolean;
    /** indicator of the popup state */
    isOpen?: boolean;
    /** if set to "responsive", the popup will adjust its x and y position depending on the available window space, "responsive-x" and "responsive-y" limit the behavior to either the x or y axis */
    position?: 'fixed' | 'responsive' | 'responsive-x' | 'responsive-y';
    /** directionality left to right, or right to left*/
    dir?: 'ltr' | 'rtl';
    /** if set to false, hide the hex, rgb and hsv text inputs */
    isTextInput?: boolean;
    /** configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value */
    textInputModes?: Array<'hex' | 'rgb' | 'hsv'>;
    /** If set to "horizontal", the hue and alpha sliders will be displayed horizontally. It is necessary to set this props to "horizontal" for the ChromeVariant */
    sliderDirection?: 'horizontal' | 'vertical';
    /** If set to true, it will not be possible to close the color picker by clicking outside */
    disableCloseClickOutside?: boolean;
    /** listener, dispatch an event when the color changes */
    onInput?:
    | ((color: {
        hsv: HsvaColor | null;
        rgb: RgbaColor | null;
        hex: string | null;
        color: Colord | null;
    }) => void)
    | undefined;
};