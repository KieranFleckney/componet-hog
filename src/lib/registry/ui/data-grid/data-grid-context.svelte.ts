import {
    type ColumnDef,
    type ColumnFiltersState,
    type FilterFnOption,
    type GlobalFilterTableState,
    type PaginationState,
    type RowData,
    type RowSelectionState,
    type SortingState,
    type Table,
    type VisibilityState,
} from '@tanstack/table-core';
import type { Snippet } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';

export const DATA_GRID_CONTEXT = Symbol('data-grid-context');

export class DataTableContext<T extends RowData> {
    public data: T[] = $state([]);
    public columnDefMap = new SvelteMap<string, ColumnDef<T>>();
    public columnDefs: ColumnDef<T>[] = $derived(
        Array.from(this.columnDefMap, (x) => x[1])
    );
    public rowSelection = $state<RowSelectionState>({});
    public columnVisibility = $state<VisibilityState>({});
    public columnFilters = $state<ColumnFiltersState>([]);
    public globalFilters = $state<any>(undefined);
    public sorting = $state<SortingState>([]);
    public pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });

    public showSortOrder? = $state(false);
    public toolBar?: Snippet<[Table<T>]> = $state(undefined);

    public enablePaging = $state(false);
    public pager?: Snippet<[Table<T>]> = $state(undefined);

    public globalFilterFn?: FilterFnOption<T> = $state(undefined);

    public GetTable?: () => Table<T> = $state(undefined);
    public Table? = $derived(this.GetTable?.());
}

declare module '@tanstack/table-core' {
    interface TableMeta<TData extends RowData> {
        showSortOrder: boolean;
    }
}
