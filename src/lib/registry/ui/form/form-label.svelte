<script lang="ts" generics="T">
    import Label from '$lib/components/ui/label/label.svelte';
    import { cn } from '$lib/utils';
    import type { BaseInputProps, FieldType } from './form-context.svelte';

    let {
        field,
        label,
        labelClass,
        required,
    }: {
        field: FieldType<T>;
        required?: boolean | null | undefined;
    } & BaseInputProps<T> = $props();
</script>

{#if label}
    <Label
        data-slot="form-label"
        aria-invalid={field.state.meta.isValid ? undefined : 'true'}
        class={cn('aria-invalid:text-destructive', labelClass)}
        for={field.name}
    >
        {label}
        {#if required}
            *
        {/if}
    </Label>
{/if}
