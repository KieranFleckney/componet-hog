<script lang="ts" generics="T">
    import { cn } from '$lib/utils';
    import type { BaseInputProps, FieldType } from './form-context.svelte';

    let {
        field,
        description,
        descriptionClass,
    }: {
        field: FieldType<T>;
    } & BaseInputProps<T> = $props();
</script>

{#if description}
    <div
        data-slot="form-description"
        class={cn('text-muted-foreground text-sm', descriptionClass)}
    >
        {description}
    </div>
{/if}
