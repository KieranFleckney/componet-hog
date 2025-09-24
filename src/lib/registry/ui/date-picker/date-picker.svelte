<script lang="ts">
    import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
    import { Calendar } from '$lib/components/ui/calendar/index.js';
    import * as Popover from '$lib/components/ui/popover/index.js';
    import { cn } from '$lib/utils.js';
    import {
        DateFormatter,
        type DateValue,
        getLocalTimeZone,
    } from '@internationalized/date';
    import CalendarIcon from '@lucide/svelte/icons/calendar';
    import ChevronDown from '@lucide/svelte/icons/chevron-down';
    import type { DatePickerProps } from './date-picker-props';

    let {
        date = $bindable(undefined),
        locale = navigator.language,
        onValueChanged,
        buttonDateFormat = 'long',
        weekdayFormat = 'short',
        captionLayout = 'dropdown',
        buttonVariant = 'ghost',
        months: monthsProp,
        years,
        monthFormat: monthFormatProp,
        yearFormat = 'numeric',
        day,
        disableDaysOutsideMonth = false,
        isDateDisabled,
        isDateUnavailable,
        class: className,
        ...props
    }: DatePickerProps = $props();

    const df = new DateFormatter(locale, {
        dateStyle: buttonDateFormat,
    });

    let open = $state(false);

    function OnValueChanged(value?: DateValue) {
        open = false;
        onValueChanged?.(value);
    }
</script>

<Popover.Root bind:open>
    <Popover.Trigger
        {...props}
        class={cn(
            buttonVariants({
                variant: 'outline',
                class: 'justify-start text-left font-normal',
            }),
            !date && 'text-muted-foreground',
            className
        )}
    >
        {#snippet child({ props })}
            <Button {...props} variant="outline">
                <CalendarIcon />
                {date
                    ? df.format(date.toDate(getLocalTimeZone()))
                    : 'Select date'}
                <ChevronDown class={'ml-auto'} />
            </Button>
        {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-auto overflow-hidden p-0" align="start">
        <Calendar
            type="single"
            bind:value={date}
            onValueChange={OnValueChanged}
            {locale}
            {weekdayFormat}
            {captionLayout}
            {buttonVariant}
            months={monthsProp}
            {years}
            monthFormat={monthFormatProp}
            {yearFormat}
            {day}
            {disableDaysOutsideMonth}
            {isDateDisabled}
            {isDateUnavailable}
        />
    </Popover.Content>
</Popover.Root>
