<script lang="ts" generics="T extends object">
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronsLeftIcon from '@lucide/svelte/icons/chevrons-left';
	import ChevronsRightIcon from '@lucide/svelte/icons/chevrons-right';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import { getContext, onDestroy, untrack } from 'svelte';
	import type { Table } from '@tanstack/table-core';
	import { DATA_GRID_CONTEXT, DataTableContext } from './data-grid-context.svelte';

	type Props<T extends object> = {
		table: Table<T>;
		pageSizeOptions?: number[];
		showPageNumber?: boolean;
		showSizeOptions?: boolean;
		showSelected?: boolean;
	};

	let {
		table,
		pageSizeOptions = [10, 25, 50, 100],
		showPageNumber = true,
		showSizeOptions = true,
		showSelected = true
	}: Props<T> = $props();

	const context = getContext(DATA_GRID_CONTEXT) as DataTableContext<T>;
	table.setPageSize(Number(pageSizeOptions[0] ?? 10));

	$effect(() => {
		context.enablePaging = true;
	});

	onDestroy(() => {
		context.enablePaging = false;
	});
</script>

<div class="flex items-center justify-between px-2">
	<div class="flex-1 text-sm text-muted-foreground">
		{#if showSelected}
			{table.getFilteredSelectedRowModel().rows.length} of
			{table.getFilteredRowModel().rows.length} row(s) selected.
		{/if}
	</div>
	<div class="flex items-center space-x-6 lg:space-x-8">
		{#if showSizeOptions}
			<div class="flex items-center space-x-2">
				<p class="text-sm font-medium">Rows per page</p>
				<Select.Root
					allowDeselect={false}
					type="single"
					value={`${table.getState().pagination.pageSize}`}
					onValueChange={(value) => {
						table.setPageSize(Number(value));
					}}
				>
					<Select.Trigger class="h-8 w-[70px]">
						{String(table.getState().pagination.pageSize)}
					</Select.Trigger>
					<Select.Content side="top">
						{#each pageSizeOptions as pageSize (pageSize)}
							<Select.Item value={`${pageSize}`}>
								{pageSize}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		{/if}
		{#if showPageNumber}
			<div class="flex w-[100px] items-center justify-center text-sm font-medium">
				Page {table.getState().pagination.pageIndex + 1} of
				{table.getPageCount()}
			</div>
		{/if}
		<div class="flex items-center space-x-2">
			<Button
				variant="outline"
				class="hidden size-8 p-0 lg:flex"
				onclick={() => table.setPageIndex(0)}
				disabled={!table.getCanPreviousPage()}
			>
				<span class="sr-only">Go to first page</span>
				<ChevronsLeftIcon />
			</Button>
			<Button
				variant="outline"
				class="size-8 p-0"
				onclick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				<span class="sr-only">Go to previous page</span>
				<ChevronLeftIcon />
			</Button>
			<Button
				variant="outline"
				class="size-8 p-0"
				onclick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				<span class="sr-only">Go to next page</span>
				<ChevronRightIcon />
			</Button>
			<Button
				variant="outline"
				class="hidden size-8 p-0 lg:flex"
				onclick={() => table.setPageIndex(table.getPageCount() - 1)}
				disabled={!table.getCanNextPage()}
			>
				<span class="sr-only">Go to last page</span>
				<ChevronsRightIcon />
			</Button>
		</div>
	</div>
</div>
