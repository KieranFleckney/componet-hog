<script lang="ts" generics="T extends RowData">
    import { type Snippet } from 'svelte';
    import { type HTMLAttributes } from 'svelte/elements';
    import {
        type Column,
        type ColumnDef,
        type DeepKeys,
        type FilterFnOption,
        type RowData,
        type Table,
    } from '@tanstack/table-core';
    import { renderSnippet } from '$lib/components/ui/data-table';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import { Button } from '$lib/components/ui/button';
    import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
    import ArrowDownIcon from '@lucide/svelte/icons/arrow-down';
    import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
    import EyeOffIcon from '@lucide/svelte/icons/eye-off';
    import FunncelXIcon from '@lucide/svelte/icons/funnel-x';
    import { cn } from '$lib/utils';
    import { type DataTableContext } from './data-grid-context.svelte';

    type Props = {
        c: DataTableContext<T>;
        property: DeepKeys<T>;
        label?: string;
        sortable?: 'Single' | 'Multi';
        sort?: 'acs' | 'desc';
        hideable?: boolean;
        hidden?: boolean;
        filterable?: boolean;
        resizable?: boolean;
        CellTemplate?: Snippet<[T]>;
        filterFn?: FilterFnOption<T>;
    };

    let {
        property,
        c,
        CellTemplate,
        label,
        sortable = undefined,
        sort = undefined,
        hideable = false,
        hidden = false,
        filterable = false,
        resizable = false,
        filterFn,
    }: Props = $props();

    if (sort) {
        c.sorting.push({ id: property, desc: sort === 'desc' ? true : false });
    }

    c.columnVisibility[property] = !hidden;

    $effect(() => {
        const coldef: ColumnDef<T> = {
            accessorKey: property,
            enableSorting: sortable !== undefined,
            enableMultiSort: sortable === 'Multi',
            enableColumnFilter: filterable,
            enableHiding: hideable,
            enableResizing: resizable,
            filterFn: filterFn,
            header: ({ column, table }) =>
                renderSnippet(ColumnHeader, {
                    table,
                    column,
                    title: label ?? property,
                }),
        };

        if (CellTemplate) {
            coldef.cell = (info) =>
                renderSnippet(CellTemplate, info.row.original);
        } else {
            coldef.cell = (info) => info.getValue();
        }

        c.columnDefMap.set(coldef.accessorKey.toString(), coldef);
    });
</script>

{#snippet ColumnHeader({
    table,
    column,
    title,
    class: className,
    ...restProps
}: {
    table: Table<T>;
    column: Column<T>;
    title: string;
} & HTMLAttributes<HTMLDivElement>)}
    {#if !column?.getCanSort()}
        <div class={className} {...restProps}>
            {title}
        </div>
    {:else}
        <div class={cn('flex items-center', className)} {...restProps}>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    {#snippet child({ props })}
                        <Button
                            {...props}
                            variant="ghost"
                            size="sm"
                            class="data-[state=open]:bg-accent -ml-3 h-8"
                        >
                            <span>
                                {title}
                            </span>
                            {#if column.getIsSorted() === 'desc'}
                                <ArrowDownIcon />
                            {:else if column.getIsSorted() === 'asc'}
                                <ArrowUpIcon />
                            {:else}
                                <ChevronsUpDownIcon />
                            {/if}
                            {#if column.getIsSorted() && column.getSortIndex() !== -1 && table.options.meta?.showSortOrder}
                                <span
                                    class="flex items-center justify-center text-xs font-semibold text-muted-foreground"
                                >
                                    {column.getSortIndex() + 1}
                                </span>
                            {/if}
                        </Button>
                    {/snippet}
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="start">
                    <DropdownMenu.Item
                        onclick={() =>
                            column.toggleSorting(
                                false,
                                column.getCanMultiSort()
                            )}
                    >
                        <ArrowUpIcon
                            class="text-muted-foreground/70 mr-2 size-3.5"
                        />
                        Asc
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        onclick={() =>
                            column.toggleSorting(
                                true,
                                column.getCanMultiSort()
                            )}
                    >
                        <ArrowDownIcon
                            class="text-muted-foreground/70 mr-2 size-3.5"
                        />
                        Desc
                    </DropdownMenu.Item>
                    {#if column.getIsSorted()}
                        <DropdownMenu.Item
                            onclick={() => column.clearSorting()}
                        >
                            <FunncelXIcon
                                class="text-muted-foreground/70 mr-2 size-3.5"
                            />
                            Clear
                        </DropdownMenu.Item>
                    {/if}
                    {#if column.getCanSort() && column.getCanHide()}
                        <DropdownMenu.Separator />
                    {/if}
                    {#if column.getCanHide()}
                        <DropdownMenu.Item
                            onclick={() => column.toggleVisibility(false)}
                        >
                            <EyeOffIcon
                                class="text-muted-foreground/70 mr-2 size-3.5"
                            />
                            Hide
                        </DropdownMenu.Item>
                    {/if}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    {/if}
{/snippet}
