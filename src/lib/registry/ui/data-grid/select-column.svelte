<script lang="ts" generics="T extends object">
    import { renderComponent } from '$lib/components/ui/data-table';
    import { Checkbox } from '$lib/components/ui/checkbox';
    import { type DataTableContext } from './data-grid-context.svelte';
    import type { ColumnDef } from '@tanstack/table-core';

    type Props<T extends object> = {
        c: DataTableContext<T>;
    };

    let { c }: Props<T> = $props();

    $effect(() => {
        const coldef: ColumnDef<T> = {
            id: 'select',
            header: ({ table }) =>
                renderComponent(Checkbox, {
                    checked: table.getIsAllPageRowsSelected(),
                    onCheckedChange: (value) =>
                        table.toggleAllPageRowsSelected(value),
                    indeterminate:
                        table.getIsSomePageRowsSelected() &&
                        !table.getIsAllPageRowsSelected(),
                    'aria-label': 'Select all',
                }),
            cell: ({ row }) =>
                renderComponent(Checkbox, {
                    checked: row.getIsSelected(),
                    onCheckedChange: (value) => row.toggleSelected(value),
                    'aria-label': 'Select row',
                }),
            enableSorting: false,
            enableHiding: false,
        };

        c.columnDefMap.set(coldef.id, coldef);
    });
</script>
