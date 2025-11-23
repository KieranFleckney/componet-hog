<script lang="ts" generics="T">
    import Input from '$lib/components/ui/input/input.svelte';
    import type { BaseInputProps } from '$lib/registry/ui/form';
    import { GenericInput } from '$lib/registry/ui/generic-field';
    import { type WithElementRef } from '$lib/utils';
    import type {
        HTMLInputAttributes,
        HTMLInputTypeAttribute,
    } from 'svelte/elements';

    type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

    type Props = WithElementRef<
        Omit<HTMLInputAttributes, 'type'> & {
            type?: InputType;
            files?: undefined;
        }
    >;

    let {
        property,
        context,
        ref = $bindable(null),
        value = $bindable(),
        type,
        class: className,
        ...restProps
    }: BaseInputProps<T> & Props = $props();
</script>

<GenericInput {property} {context} {...restProps}>
    {#snippet control(field)}
        <Input
            bind:ref
            bind:value={() => field.state.value, (e) => field.handleChange(e)}
            name={field.name}
            id={field.name}
            onblur={field.handleBlur}
            class={className}
            aria-invalid={field.state.meta.isValid ? undefined : 'true'}
            {...restProps}
            {type}
        />
    {/snippet}
</GenericInput>
