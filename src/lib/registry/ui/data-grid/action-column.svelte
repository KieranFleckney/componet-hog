<script lang="ts" generics="T extends object">
    import { type Snippet } from 'svelte';
    import { type DataTableContext } from './data-grid-context.svelte';
    import type { ColumnDef, Row, RowData } from '@tanstack/table-core';
    import { renderSnippet } from '$lib/components/ui/data-table';

    type Props<T extends object> = {
        c: DataTableContext<T>;
        CellTemplate: Snippet<[Row<T>]>;
    };

    let { c, CellTemplate }: Props<T> = $props();

    $effect(() => {
        const coldef: ColumnDef<T> = {
            id: 'action',
            header: undefined,
            cell: (info) => renderSnippet(CellTemplate, info.row),
            enableSorting: false,
            enableHiding: false,
            meta: 'flex justify-end',
        };

        c.columnDefMap.set(coldef.id, coldef);
    });
</script>
