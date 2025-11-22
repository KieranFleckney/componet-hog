<script lang="ts" generics="T">
    import { FieldLabel } from '$lib/components/ui/field';
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import type { BaseInputProps, FieldType } from './form-context.svelte';

    let {
        field,
        label,
        labelClass,
        required,
        children,
    }: {
        field: FieldType<T>;
        required?: boolean | null | undefined;
        children?: Snippet<[]>;
    } & BaseInputProps<T> = $props();
</script>

<FieldLabel
    for={field.name}
    class={cn('group-aria-[invalid=true]/field:text-destructive', labelClass)}
>
    {#if children}
        {@render children?.()}
    {:else}
        {label}
        {#if required}
            *
        {/if}
    {/if}
</FieldLabel>
