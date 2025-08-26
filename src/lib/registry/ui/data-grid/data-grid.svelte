<script lang="ts" generics="T extends object">
    import { setContext, type Snippet } from 'svelte';
    import {
        DATA_GRID_CONTEXT,
        DataTableContext,
    } from './data-grid-context.svelte';
    import DataTableCore from './data-grid-core.svelte';
    import type { FilterFnOption, Table } from '@tanstack/table-core';

    interface DataGridProps {
        context?: DataTableContext<T>;
        items: T[];
        columns: Snippet<[DataTableContext<T>]>;
        tool?: Snippet<[Table<T>]>;
        pager?: Snippet<[Table<T>]>;
        globalFilterFn?: FilterFnOption<T>;
        showSortOrder?: boolean;
    }

    let {
        items,
        columns,
        showSortOrder,
        tool,
        pager,
        context,
        globalFilterFn,
    }: DataGridProps = $props();

    const tableContext = $state(context ?? new DataTableContext<T>());
    setContext(DATA_GRID_CONTEXT, tableContext);

    $effect(() => {
        tableContext.data = [...items];
        tableContext.showSortOrder = showSortOrder;
        tableContext.toolBar = tool;
        tableContext.pager = pager;
        tableContext.globalFilterFn = globalFilterFn;
    });

    export { tableContext as Context };
</script>

<DataTableCore c={tableContext} />
{@render columns?.(tableContext)}
