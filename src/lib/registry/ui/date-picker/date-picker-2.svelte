<script lang="ts">
    import { type WithoutChild, cn } from '$lib/utils';
    import {
        DatePicker,
        type CalendarDaySnippetProps,
        type DatePickerRootPropsWithoutHTML,
        type Month,
    } from 'bits-ui';
    import Calendar from '@lucide/svelte/icons/calendar';
    import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
    import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
    import { buttonVariants } from '$lib/components/ui/button';
    import { type DateValue } from '@internationalized/date';
    import type { Snippet } from 'svelte';

    let {
        value = $bindable(undefined),
        locale = navigator.language,
        monthFormat = 'short',
        yearFormat = 'numeric',
        DayTemplate,
        ...props
    }: {
        monthFormat?: Intl.DateTimeFormatOptions['month'];
        yearFormat?: Intl.DateTimeFormatOptions['year'];
        DayTemplate?: Snippet<[CalendarDaySnippetProps]>;
    } & WithoutChild<DatePickerRootPropsWithoutHTML> = $props();

    let className = '';

    props;
</script>

<DatePicker.Root
    {...props as WithoutChild<DatePickerRootPropsWithoutHTML>}
    bind:value
    {locale}
>
    <DatePicker.Input
        class={cn(
            'border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm items-center',
            'focus:border-ring focus:ring-ring/50 focus:relative ',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ',
            className
        )}
    >
        {#snippet children({ segments })}
            {#each segments as { part, value }, i (part + i)}
                <div class="inline-block select-none">
                    {#if part === 'literal'}
                        <DatePicker.Segment
                            {part}
                            class="text-muted-foreground p-1"
                        >
                            {value}
                        </DatePicker.Segment>
                    {:else}
                        <DatePicker.Segment
                            {part}
                            class="rounded-sm hover:bg-muted focus:bg-muted focus:text-foreground aria-[valuetext=Empty]:text-muted-foreground focus-visible:ring-offset-0! px-1 py-1 focus-visible:border-ring focus-visible:ring-ring/50 outline-none focus-visible:ring-2"
                        >
                            {value}
                        </DatePicker.Segment>
                    {/if}
                </div>
            {/each}
            <DatePicker.Trigger
                class="text-foreground/60 hover:bg-muted active:bg-dark-10 ml-auto inline-flex size-7.5 items-center justify-center rounded-[5px] transition-all text-sm font-medium px-1.5  focus-visible:border-ring focus-visible:ring-ring/50 outline-none focus-visible:ring-2"
            >
                <Calendar />
            </DatePicker.Trigger>
        {/snippet}
    </DatePicker.Input>
    <DatePicker.Content
        class={cn(
            'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--bits-popover-content-transform-origin) outline-hidden z-50 rounded-md border shadow-md w-auto overflow-hidden p-0',
            className
        )}
    >
        {@render Calender()}
    </DatePicker.Content>
</DatePicker.Root>

{#snippet Calender()}
    <DatePicker.Calendar
        class={cn(
            'group/calendar p-3 [--cell-size:--spacing(8)] bg-transparent',
            className
        )}
    >
        {#snippet children({ months, weekdays })}
            {@render Header()}
            {#each months as month}
                {@render Grid(month, weekdays)}
            {/each}
        {/snippet}
    </DatePicker.Calendar>
{/snippet}

{#snippet Header()}
    <DatePicker.Header
        class={cn(
            'h-(--cell-size) flex w-full items-center justify-center gap-1.5 text-sm font-medium',
            className
        )}
    >
        <DatePicker.PrevButton
            class={cn(
                buttonVariants({ variant: 'ghost' }),
                'size-(--cell-size) select-none bg-transparent p-0 disabled:opacity-50 rtl:rotate-180',
                className
            )}
        >
            <ChevronLeftIcon class="size-4" />
        </DatePicker.PrevButton>
        <DatePicker.Heading
            class={cn(
                'h-(--cell-size) flex w-full items-center justify-center gap-1.5 text-sm font-medium',
                className
            )}
        >
            <DatePicker.MonthSelect {monthFormat} />
            <DatePicker.YearSelect {yearFormat} />
        </DatePicker.Heading>
        <DatePicker.NextButton
            class={cn(
                buttonVariants({ variant: 'ghost' }),
                'size-(--cell-size) select-none bg-transparent p-0 disabled:opacity-50 rtl:rotate-180',
                className
            )}
        >
            <ChevronRightIcon class="size-4" />
        </DatePicker.NextButton>
    </DatePicker.Header>
{/snippet}

{#snippet Grid(month: Month<DateValue>, weekdays: string[])}
    <DatePicker.Grid
        class={cn('mt-4 flex w-full border-collapse flex-col gap-1', className)}
    >
        {@render GridHead(weekdays)}
        {@render GridBody(month)}
    </DatePicker.Grid>
{/snippet}

{#snippet GridHead(weekdays: string[])}
    <DatePicker.GridHead>
        <DatePicker.GridRow class={cn('flex select-none', className)}>
            {#each weekdays as day}
                <DatePicker.HeadCell
                    class={cn(
                        'text-muted-foreground w-(--cell-size) rounded-md text-[0.8rem] font-normal',
                        className
                    )}
                >
                    {day}
                </DatePicker.HeadCell>
            {/each}
        </DatePicker.GridRow>
    </DatePicker.GridHead>
{/snippet}

{#snippet GridBody(month: Month<DateValue>)}
    <DatePicker.GridBody>
        {#each month.weeks as weekDates}
            <DatePicker.GridRow class={cn('flex mt-2 w-full', className)}>
                {#each weekDates as date}
                    <DatePicker.Cell
                        {date}
                        month={month.value}
                        class={cn(
                            'size-(--cell-size) relative p-0 text-center text-sm focus-within:z-20 [&:first-child[data-selected]_[data-bits-day]]:rounded-l-md [&:last-child[data-selected]_[data-bits-day]]:rounded-r-md',
                            className
                        )}
                    >
                        <DatePicker.Day
                            class={cn(
                                buttonVariants({ variant: 'ghost' }),
                                'size-(--cell-size) flex select-none flex-col items-center justify-center gap-1 whitespace-nowrap p-0 font-normal leading-none',
                                '[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground [&[data-today][data-disabled]]:text-muted-foreground',
                                'data-[selected]:bg-primary dark:data-[selected]:hover:bg-accent/50 data-[selected]:text-primary-foreground',
                                // Outside months
                                '[&[data-outside-month]:not([data-selected])]:text-muted-foreground [&[data-outside-month]:not([data-selected])]:hover:text-accent-foreground',
                                // Disabled
                                'data-[disabled]:text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                                // Unavailable
                                'data-[unavailable]:text-muted-foreground data-[unavailable]:line-through',
                                // hover
                                'dark:hover:text-accent-foreground',
                                // focus
                                'focus:border-ring focus:ring-ring/50 focus:relative',
                                // inner spans
                                '[&>span]:text-xs [&>span]:opacity-70',
                                className
                            )}
                        >
                            {#snippet children(prop)}
                                {#if DayTemplate}
                                    {@render DayTemplate?.(prop)}
                                {:else}
                                    {prop.day}
                                {/if}
                            {/snippet}
                        </DatePicker.Day>
                    </DatePicker.Cell>
                {/each}
            </DatePicker.GridRow>
        {/each}
    </DatePicker.GridBody>
{/snippet}
