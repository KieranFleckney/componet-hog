<script lang="ts" generics="T extends object">
	import { DataTableContext } from './data-grid-context.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table';
	import {
		getCoreRowModel,
		getFacetedMinMaxValues,
		getFacetedRowModel,
		getFacetedUniqueValues,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type TableOptions,
		type Table as TanTable
	} from '@tanstack/table-core';

	interface DataGridProps {
		c: DataTableContext<T>;
	}

	let { c }: DataGridProps = $props();
	let table = $state(CreateTable());
	c.GetTable = () => table;

	$effect(() => {
		table = CreateTable();
		c.GetTable = () => table;
	});

	function CreateTable(): TanTable<T> {
		const options: TableOptions<T> = {
			get data() {
				return c.data;
			},
			state: {
				get sorting() {
					return c.sorting;
				},
				get columnVisibility() {
					return c.columnVisibility;
				},
				get rowSelection() {
					return c.rowSelection;
				},
				get columnFilters() {
					return c.columnFilters;
				},
				get pagination() {
					return c.pagination;
				},
				get globalFilter() {
					return c.globalFilters;
				}
			},
			columns: c.columnDefs,
			onRowSelectionChange: (updater) => {
				if (typeof updater === 'function') {
					c.rowSelection = updater(c.rowSelection);
				} else {
					c.rowSelection = updater;
				}
			},
			onSortingChange: (updater) => {
				if (typeof updater === 'function') {
					c.sorting = updater(c.sorting);
				} else {
					c.sorting = updater;
				}
			},
			onColumnFiltersChange: (updater) => {
				if (typeof updater === 'function') {
					c.columnFilters = updater(c.columnFilters);
				} else {
					c.columnFilters = updater;
				}
			},
			onGlobalFilterChange: (updater) => {
				console.log('dd');
				if (typeof updater === 'function') {
					c.globalFilters = updater(c.globalFilters);
				} else {
					c.globalFilters = updater;
				}
			},
			onColumnVisibilityChange: (updater) => {
				if (typeof updater === 'function') {
					c.columnVisibility = updater(c.columnVisibility);
				} else {
					c.columnVisibility = updater;
				}
			},
			onPaginationChange: (updater) => {
				if (typeof updater === 'function') {
					c.pagination = updater(c.pagination);
				} else {
					c.pagination = updater;
				}
			},
			getCoreRowModel: getCoreRowModel(),
			getFilteredRowModel: getFilteredRowModel(),
			// getPaginationRowModel: getPaginationRowModel(),
			getSortedRowModel: getSortedRowModel(),
			getFacetedRowModel: getFacetedRowModel(),
			getFacetedUniqueValues: getFacetedUniqueValues(),
			getFacetedMinMaxValues: getFacetedMinMaxValues(),
			enableColumnFilters: true,
			enableFilters: true,
			enableSorting: true,
			enableMultiSort: true
		};

		if (c.showSortOrder !== undefined) {
			options.meta = {
				showSortOrder: c.showSortOrder
			};
		}

		if (c.enablePaging) {
			options.getPaginationRowModel = getPaginationRowModel();
		}

		if (c.globalFilterFn) {
			options.enableGlobalFilter = true;
			options.globalFilterFn = c.globalFilterFn;
		}

		return createSvelteTable(options);
	}
</script>

<div class="space-y-4">
	{#if c.toolBar}
		<div class="flex items-center justify-between">
			{@render c.toolBar?.(table)}
		</div>
	{/if}
	<div class="overflow-hidden rounded-md border">
		<Table.Root>
			<Table.Header>
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#each headerGroup.headers as header (header.id)}
							<Table.Head colspan={header.colSpan}>
								{#if !header.isPlaceholder}
									<FlexRender
										content={header.column.columnDef.header}
										context={header.getContext()}
									/>
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each table.getRowModel().rows as row (row.id)}
					<Table.Row data-state={row.getIsSelected() && 'selected'}>
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell class={cell.column.columnDef.meta}>
								<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
							</Table.Cell>
						{/each}
					</Table.Row>
				{:else}
					<Table.Row>
						<Table.Cell colspan={table.options.columns.length} class="h-24 text-center"
							>No results.</Table.Cell
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	{#if c.pager}
		{@render c.pager?.(table)}
	{/if}
</div>
