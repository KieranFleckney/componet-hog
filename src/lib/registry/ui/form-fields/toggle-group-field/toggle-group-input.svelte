<script lang="ts" generics="T">
    import * as ToggleGroup from '$lib/components/ui/toggle-group';
    import type { BaseInputProps } from '$lib/registry/ui/form';
    import { GenericInput } from '$lib/registry/ui/generic-field';
    import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';

    let {
        property,
        context,
        ref = $bindable(null),
        class: className,
        children,
        ...restProps
    }: BaseInputProps<T> & ToggleGroupPrimitive.RootProps = $props();
</script>

<GenericInput {property} {context} {...restProps}>
    {#snippet control(field)}
        <ToggleGroup.Root
            bind:ref
            bind:value={() => field.state.value, (e) => field.handleChange(e)}
            id={field.name}
            onblur={field.handleBlur}
            class={className}
            aria-invalid={field.state.meta.isValid ? undefined : 'true'}
            {...restProps}
        >
            {@render children?.()}
        </ToggleGroup.Root>
    {/snippet}
</GenericInput>
