<script lang="ts" generics="T">
    import { Textarea } from '$lib/components/ui/textarea';
    import { type BaseInputProps } from '$lib/registry/ui/form';
    import { GenericInput } from '$lib/registry/ui/generic-field';
    import { type WithElementRef, type WithoutChildren } from '$lib/utils';
    import type { HTMLTextareaAttributes } from 'svelte/elements';

    let {
        property,
        context,
        ref = $bindable(null),
        value = $bindable(),
        class: className,
        ...restProps
    }: BaseInputProps<T> &
        WithoutChildren<WithElementRef<HTMLTextareaAttributes>> = $props();
</script>

<GenericInput {property} {context} {...restProps}>
    {#snippet control(field)}
        <Textarea
            bind:ref
            bind:value={() => field.state.value, (e) => field.handleChange(e)}
            name={field.name}
            id={field.name}
            onblur={field.handleBlur}
            class={className}
            aria-invalid={field.state.meta.isValid ? undefined : 'true'}
            {...restProps}
        />
    {/snippet}
</GenericInput>
