<script lang="ts" generics="T">
	import { cn } from '$lib/utils';
	import type { BaseInputProps, FieldType } from './form-context.svelte';

	let { field, errorFieldClass, errorClass }: { field: FieldType<T> } & BaseInputProps<T> =
		$props();
</script>

{#if !field.state.meta.isValid}
	<div class={cn('text-sm font-medium text-destructive', errorFieldClass)}>
		{#each field.state.meta.errors as e}
			<div class={cn(errorClass)}>{e.message}</div>
		{/each}
	</div>
{/if}
