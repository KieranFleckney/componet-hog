<script lang="ts" generics="TData, TValue">
	import CirclePlusIcon from '@lucide/svelte/icons/circle-plus';
	import CheckIcon from '@lucide/svelte/icons/check';
	import type { Column } from '@tanstack/table-core';
	import { SvelteSet } from 'svelte/reactivity';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import type { Component } from 'svelte';

	type mapData = {
		value: string;
		count: number;
		label: string;
		icon?: Component;
	};

	let {
		column,
		title,
		options
	}: {
		column: Column<TData, TValue>;
		title: string;
		options?: {
			value: string;
			label?: string;
			icon?: Component;
		}[];
	} = $props();

	const facets = $derived.by(() => {
		const f = Array.from(column?.getFacetedUniqueValues());
		const newMap: mapData[] = [];
		for (let i = 0; i < f.length; i++) {
			const element = f[i];
			const d: mapData = {
				count: element[1],
				label: element[0],
				value: element[0]
			};

			if (options) {
				const found = options.find((x) => x.value === element[0]);
				if (found) {
					d.label = found.label ?? d.label;
					d.icon = found.icon;
				}
			}

			newMap.push(d);
		}

		return newMap;
	});
	const selectedValues = $derived(new SvelteSet(column?.getFilterValue() as string[]));
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline" size="sm" class="h-8 border-dashed">
				<CirclePlusIcon />
				{title}
				{#if selectedValues.size > 0}
					<Separator orientation="vertical" class="mx-2 h-4" />
					<Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
						{selectedValues.size}
					</Badge>
					<div class="hidden space-x-1 lg:flex">
						{#if selectedValues.size > 2}
							<Badge variant="secondary" class="rounded-sm px-1 font-normal">
								{selectedValues.size} selected
							</Badge>
						{:else}
							{#each facets.filter((opt) => selectedValues.has(opt.value)) as option (option)}
								<Badge variant="secondary" class="rounded-sm px-1 font-normal">
									{option.label}
								</Badge>
							{/each}
						{/if}
					</div>
				{/if}
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0" align="start">
		<Command.Root>
			<Command.Input placeholder={title} />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group>
					{#each facets as option (option)}
						{@const isSelected = selectedValues.has(option.value)}
						<Command.Item
							onSelect={() => {
								if (isSelected) {
									selectedValues.delete(option.value);
								} else {
									selectedValues.add(option.value);
								}
								const filterValues = Array.from(selectedValues);
								column?.setFilterValue(filterValues.length ? filterValues : undefined);
							}}
						>
							<div
								class={cn(
									'mr-2 flex size-4 items-center justify-center rounded-sm border border-primary',
									isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
								)}
							>
								<CheckIcon class="size-4" />
							</div>
							{#if option.icon}
								{@const Icon = option.icon}
								<Icon class="text-muted-foreground" />
							{/if}

							<span>{option.label}</span>
							<span class="ml-auto flex size-4 items-center justify-center font-mono text-xs">
								{option.count}
							</span>
						</Command.Item>
					{/each}
				</Command.Group>
				{#if selectedValues.size > 0}
					<Command.Separator />
					<Command.Group>
						<Command.Item
							onSelect={() => column?.setFilterValue(undefined)}
							class="justify-center text-center"
						>
							Clear filters
						</Command.Item>
					</Command.Group>
				{/if}
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
