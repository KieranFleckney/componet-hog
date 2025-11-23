<script lang="ts" generics="T,TData">
    import * as Select from '$lib/components/ui/select';
    import type { BaseInputProps } from '$lib/registry/ui/form';
    import { GenericInput } from '$lib/registry/ui/generic-field';
    import { type WithElementRef, type WithoutChildren, cn } from '$lib/utils';
    import type { Component, Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    type Props = {
        class?: string;
        items: TData[];
        placeholder?: string;
        toStringFunc?: (value: TData) => string;
        toIdFunc?: (value: TData) => string;
        disabledFunc?: (value: TData) => boolean;
        itemTemplate?: Snippet<[TData, boolean, boolean]>;
        icon?: Component;
    };

    let {
        property,
        context,
        class: className,
        ref = $bindable(null),
        placeholder = 'Select a item',
        items,
        toStringFunc = (x) => x as string,
        toIdFunc = (x) => (x ?? '') as string,
        disabledFunc,
        itemTemplate,
        icon,
        ...rest
    }: Props &
        BaseInputProps<T> &
        WithoutChildren<WithElementRef<HTMLAttributes<HTMLElement>>> = $props();

    function GetIdMulti(value: TData[]) {
        if (!value) {
            return [];
        }

        return value.map(toIdFunc);
    }

    function OnSelectMultiple(selected: string[]): TData[] {
        if (!selected) {
            [];
        }

        return items.filter((f) => selected.includes(toIdFunc(f)));
    }

    function GetTriggerText(value: TData[]): string {
        if (!value) {
            return placeholder;
        }

        if (value.length === 0) {
            return placeholder;
        }

        return value.map(toStringFunc).join(',');
    }
</script>

<GenericInput {property} {context} {...rest}>
    {#snippet control(field)}
        <Select.Root
            type="multiple"
            name={field.name}
            bind:value={
                () => GetIdMulti(field.state.value),
                (e) => field.handleChange(OnSelectMultiple(e))
            }
        >
            <Select.Trigger
                class={cn(className, 'w-full')}
                {ref}
                aria-invalid={field.state.meta.isValid ? undefined : 'true'}
            >
                {@const Icon = icon}
                <div class="flex w-full items-center">
                    {#if icon}
                        <Icon class="mr-[9px] size-6 text-muted-foreground" />
                    {/if}
                    {GetTriggerText(field.state.value)}
                </div>
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    {#each items as item (toIdFunc(item))}
                        <Select.Item
                            value={toIdFunc(item)}
                            label="{toStringFunc(item)}}"
                            disabled={disabledFunc?.(item) ?? false}
                        >
                            {#snippet children(pop)}
                                {#if itemTemplate}
                                    {@render itemTemplate(
                                        item,
                                        pop.selected,
                                        pop.highlighted
                                    )}
                                {:else}
                                    {toStringFunc(item)}
                                {/if}
                            {/snippet}
                        </Select.Item>
                    {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    {/snippet}
</GenericInput>
