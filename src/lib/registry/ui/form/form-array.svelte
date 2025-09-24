<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';
    import type { BaseInputProps } from './form-context.svelte';
    import type { DeepKeys } from '@tanstack/svelte-form';

    let {
        property,
        context,
        template,
        ...restProps
    }: { template: Snippet<[DeepKeys<T>]> } & BaseInputProps<T> = $props();

    const form = context.form;

    function GetIndexFieldName(
        property: DeepKeys<T>,
        index: number
    ): DeepKeys<T> {
        return property + '[' + index + ']';
    }
</script>

<form.Field name={property} mode="array">
    {#snippet children(field)}
        {#each field.state.value as ArrayLike<unknown> as _, i}
            {@render template?.(GetIndexFieldName(property, i))}
        {/each}
    {/snippet}
</form.Field>
