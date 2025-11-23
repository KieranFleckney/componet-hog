<script lang="ts" generics="T">
    import {
        type BaseInputProps,
        FieldErrors,
        FormDescription,
        FormField,
        FormLabel,
        type GenericInputProps,
    } from '$lib/registry/ui/form';

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
        <FormField
            aria-invalid={field.state.meta.isValid ? undefined : 'true'}
            class={restProps.itemClass}
        >
            {#if custom}
                {@render custom?.(field)}
            {:else}
                <FormLabel {context} {property} {field} {...restProps} />
                {@render control?.(field)}
                <FormDescription class={restProps.descriptionClass}>
                    {restProps.description}
                </FormDescription>
                <FieldErrors {context} {property} {field} {...restProps} />
            {/if}
        </FormField>
    {/snippet}
</form.Field>
