import type { DateValue } from "@internationalized/date";
import { Calendar as CalendarPrimitive, type DateMatcher } from 'bits-ui';
import { Popover as PopoverPrimitive } from 'bits-ui';
import { type ButtonVariant } from '$lib/components/ui/button/button.svelte';
import type { Snippet } from "svelte";

export type DatePickerProps = {
    date?: DateValue;
    locale?: string;
    onValueChanged?: (value: DateValue | undefined) => void;
    buttonDateFormat?: 'full' | 'long' | 'medium' | 'short';
    weekdayFormat?: Intl.DateTimeFormatOptions['weekday'];
    buttonVariant?: ButtonVariant;
    captionLayout?:
    | 'dropdown'
    | 'dropdown-months'
    | 'dropdown-years'
    | 'label';
    months?: CalendarPrimitive.MonthSelectProps['months'];
    years?: CalendarPrimitive.YearSelectProps['years'];
    monthFormat?: CalendarPrimitive.MonthSelectProps['monthFormat'];
    yearFormat?: CalendarPrimitive.YearSelectProps['yearFormat'];
    day?: Snippet<[{ day: DateValue; outsideMonth: boolean }]>;
    disableDaysOutsideMonth?: boolean;
    isDateDisabled?: DateMatcher;
    isDateUnavailable?: DateMatcher;
} & PopoverPrimitive.TriggerProps;