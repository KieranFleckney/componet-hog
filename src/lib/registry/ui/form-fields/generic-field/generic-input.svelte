<script lang="ts" generics="T">
    import {
        type BaseInputProps,
        FieldErrors,
        FormDescription,
        FormLabel,
        type GenericInputProps,
    } from '$lib/registry/ui/form';
    import { cn } from '$lib/utils';

    let {
        property,
        context,
        control,
        custom,
        ...restProps
    }: GenericInputProps<T> & BaseInputProps<T> = $props();

    const form = context.form;
</script>

<form.Field name={property}>
    {#snippet children(field)}
        <div data-slot="form-item" class={cn('space-y-2', restProps.itemClass)}>
            {#if custom}
                {@render custom?.(field)}
            {:else}
                <FormLabel {context} {property} {field} {...restProps} />
                {@render control?.(field)}
                <FormDescription {context} {property} {field} {...restProps} />
                <FieldErrors {context} {property} {field} {...restProps} />
            {/if}
        </div>
    {/snippet}
</form.Field>
